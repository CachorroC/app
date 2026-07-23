'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import prisma from '#@/lib/connection/prisma';
import { EstadoNote, PrioridadTarea, RolAsignacion, TipoBloque } from '#@/app/generated/prisma/enums';

const RUTA_LISTA = '/dashboard/bitacora';

function rutaDetalle( id: string ) {
  return `/dashboard/bitacora/${ id }`;
}

const RUTA_TAREAS = '/dashboard/tareas';

const ESTADOS_NOTE = Object.values( EstadoNote ) as [string, ...string[]];
const PRIORIDADES_TAREA = Object.values( PrioridadTarea ) as [string, ...string[]];
const TIPOS_BLOQUE = Object.values( TipoBloque ) as [string, ...string[]];
const ROLES_ASIGNACION = Object.values( RolAsignacion ) as [string, ...string[]];

/** Paleta round-robin para etiquetas nuevas — una etiqueta nunca elige su propio color. */
const ETQ_COLORS = [
  '#6A4FA8',
  '#3A5BA9',
  '#7A5900',
  '#36693E',
  '#B3261E',
  '#7D5260',
];

function esErrorConstraintUnico( error: unknown ): boolean {
  return Boolean( error && typeof error === 'object' && 'code' in error && error.code === 'P2002' );
}

const CrearNotaSchema = z.object( {
  titulo: z.string()
    .trim()
    .min(
      1, 'El título es obligatorio.' 
    )
    .max( 200 ),
  casoId: z.string()
    .optional(),
} );

export async function crearNota( input: z.infer<typeof CrearNotaSchema> ) {
  const datos = CrearNotaSchema.parse( input );

  const nota = await prisma.note.create( {
    data: {
      id       : crypto.randomUUID(),
      titulo   : datos.titulo,
      carpetaId: datos.casoId
        ? Number( datos.casoId )
        : null,
      editadaEn: new Date(),
    },
    select: {
      id: true 
    },
  } );

  revalidatePath( RUTA_LISTA );

  return {
    id: nota.id 
  };
}

const ActualizarNotaSchema = z.object( {
  titulo: z.string()
    .trim()
    .min( 1 )
    .max( 200 )
    .optional(),
  resumen: z.string()
    .trim()
    .max( 400 )
    .nullable()
    .optional(),
  estado: z.enum( ESTADOS_NOTE )
    .optional(),
  fijada: z.boolean()
    .optional(),
  casoId: z.string()
    .nullable()
    .optional(),
} );

/**
 * Actualiza los campos escalares de una nota. Se envían solo los campos que
 * cambiaron (diff calculado en el cliente) — nunca el documento completo.
 */
export async function actualizarNota(
  id: string, input: z.infer<typeof ActualizarNotaSchema>
) {
  const datos = ActualizarNotaSchema.parse( input );

  await prisma.note.update( {
    where: {
      id
    },
    data: {
      ...( datos.titulo !== undefined
        ? {
            titulo: datos.titulo
          }
        : {} ),
      ...( datos.resumen !== undefined
        ? {
            resumen: datos.resumen
          }
        : {} ),
      ...( datos.estado !== undefined
        ? {
            estado     : datos.estado as EstadoNote,
            archivadaEn: datos.estado === EstadoNote.ARCHIVADA
              ? new Date()
              : null,
          }
        : {} ),
      ...( datos.fijada !== undefined
        ? {
            fijada: datos.fijada
          }
        : {} ),
      ...( datos.casoId !== undefined
        ? {
            carpetaId: datos.casoId
              ? Number( datos.casoId )
              : null
          }
        : {} ),
      editadaEn: new Date(),
    },
  } );

  revalidatePath( RUTA_LISTA );
  revalidatePath( rutaDetalle( id ) );
}

/**
 * Reordena los bloques de una nota. La restricción @@unique([noteId, orden])
 * impide escribir posiciones definitivas de una sola pasada — primero se
 * escriben desplazamientos negativos y luego los valores finales.
 */
export async function reordenarBloques(
  notaId: string, ordenIds: string[] 
) {
  await prisma.$transaction( async ( tx ) => {
    await Promise.all( ordenIds.map( (
      id, indice 
    ) => {
      return tx.noteBloque.update( {
        where: {
          id 
        },
        data: {
          orden: -( indice + 1 ) 
        } 
      } );
    } ) );
    await Promise.all( ordenIds.map( (
      id, indice 
    ) => {
      return tx.noteBloque.update( {
        where: {
          id 
        },
        data: {
          orden: indice 
        } 
      } );
    } ) );
  } );

  revalidatePath( rutaDetalle( notaId ) );
}

export async function alternarItem( itemId: string ) {
  const item = await prisma.bloqueItem.findUniqueOrThrow( {
    where: {
      id: itemId 
    },
    select: {
      completado: true,
      bloque    : {
        select: {
          noteId: true
        }
      }
    },
  } );

  const completado = !item.completado;

  await prisma.bloqueItem.update( {
    where: {
      id: itemId
    },
    data: {
      completado,
      completadoEn: completado
        ? new Date()
        : null
    },
  } );

  revalidatePath( rutaDetalle( item.bloque.noteId ) );
}

export async function fijarNota(
  id: string, fijada: boolean 
) {
  await prisma.note.update( {
    where: {
      id 
    },
    data: {
      fijada,
      editadaEn: new Date() 
    } 
  } );
  revalidatePath( RUTA_LISTA );
}

/** Nunca borra: marca ARCHIVADA + archivadaEn. */
export async function archivarNota( id: string ) {
  await prisma.note.update( {
    where: {
      id 
    },
    data: {
      estado     : EstadoNote.ARCHIVADA,
      archivadaEn: new Date(),
      editadaEn  : new Date() 
    },
  } );
  revalidatePath( RUTA_LISTA );
  revalidatePath( rutaDetalle( id ) );
}

const PromoverItemSchema = z.object( {
  responsable: z.string()
    .trim()
    .max( 120 )
    .optional(),
  fechaLimite: z.string()
    .optional(),
  prioridad: z.enum( PRIORIDADES_TAREA )
    .optional(),
  esTermino: z.boolean()
    .optional(),
} );

/**
 * Crea una tarea real a partir de un ítem de checklist, en una sola
 * transacción. Si el ítem ya tiene tareaId, falla con un mensaje en
 * español en vez de dejar que la excepción de Prisma llegue al usuario.
 */
export async function promoverItemATarea(
  itemId: string, input: z.infer<typeof PromoverItemSchema> 
) {
  const datos = PromoverItemSchema.parse( input );

  const item = await prisma.bloqueItem.findUniqueOrThrow( {
    where: {
      id: itemId 
    },
    select: {
      texto  : true,
      tareaId: true,
      bloque : {
        select: {
          noteId: true,
          note  : {
            select: {
              carpetaId: true
            }
          }
        }
      },
    },
  } );

  if ( item.tareaId ) {
    return {
      ok   : false,
      error: 'Este ítem ya fue convertido en una tarea.' 
    } as const;
  }

  try {
    const tarea = await prisma.$transaction( async ( tx ) => {
      const creada = await tx.tarea.create( {
        data: {
          id    : crypto.randomUUID(),
          titulo: item.texto.slice(
            0, 200 
          ),
          responsable: datos.responsable || null,
          fechaLimite: datos.fechaLimite
            ? new Date( datos.fechaLimite )
            : null,
          prioridad   : ( datos.prioridad as PrioridadTarea ) ?? PrioridadTarea.MEDIA,
          esTermino   : datos.esTermino ?? false,
          carpetaId   : item.bloque.note.carpetaId,
          noteOrigenId: item.bloque.noteId,
          editadaEn   : new Date(),
        },
        select: {
          id: true 
        },
      } );

      await tx.bloqueItem.update( {
        where: {
          id: itemId 
        },
        data: {
          tareaId: creada.id 
        } 
      } );

      return creada;
    } );

    revalidatePath( RUTA_TAREAS );
    revalidatePath( rutaDetalle( item.bloque.noteId ) );

    return {
      ok: true,
      id: tarea.id 
    } as const;
  } catch ( error ) {
    if ( esErrorConstraintUnico( error ) ) {
      return {
        ok   : false,
        error: 'Este ítem ya fue convertido en una tarea.'
      } as const;
    }

    throw error;
  }
}

/** Agrega un bloque vacío al final de la nota. El id lo decide el cliente (UI optimista sin reconciliar ids). */
export async function agregarBloque(
  notaId: string, id: string, tipo: string
) {
  const tipoValido = z.enum( TIPOS_BLOQUE )
    .parse( tipo ) as TipoBloque;

  const ultimo = await prisma.noteBloque.aggregate( {
    where: {
      noteId: notaId
    },
    _max: {
      orden: true
    },
  } );

  const bloque = await prisma.noteBloque.create( {
    data: {
      id,
      noteId: notaId,
      tipo  : tipoValido,
      orden : ( ultimo._max.orden ?? -1 ) + 1,
      texto : tipoValido === TipoBloque.PARRAFO
        ? ''
        : null,
    },
    select: {
      id: true
    },
  } );

  revalidatePath( rutaDetalle( notaId ) );

  return bloque;
}

/** Actualiza el texto de un bloque PARRAFO, o el título de un bloque LISTA/VERIFICACION. */
export async function actualizarTextoBloque(
  bloqueId: string, texto: string
) {
  const bloque = await prisma.noteBloque.update( {
    where: {
      id: bloqueId
    },
    data: {
      texto
    },
    select: {
      noteId: true
    },
  } );

  revalidatePath( rutaDetalle( bloque.noteId ) );
}

/** Elimina un bloque y, en cascada, sus ítems (schema: onDelete: Cascade). */
export async function eliminarBloque( bloqueId: string ) {
  const bloque = await prisma.noteBloque.delete( {
    where: {
      id: bloqueId
    },
    select: {
      noteId: true
    },
  } );

  revalidatePath( rutaDetalle( bloque.noteId ) );
}

/** Agrega un ítem vacío al final de un bloque LISTA/VERIFICACION. El id lo decide el cliente. */
export async function agregarItem(
  bloqueId: string, id: string, texto: string
) {
  const ultimo = await prisma.bloqueItem.aggregate( {
    where: {
      bloqueId
    },
    _max: {
      orden: true
    },
  } );

  const item = await prisma.bloqueItem.create( {
    data: {
      id,
      bloqueId,
      texto,
      orden: ( ultimo._max.orden ?? -1 ) + 1,
    },
    select: {
      id          : true,
      bloque: {
        select: {
          noteId: true
        }
      }
    },
  } );

  revalidatePath( rutaDetalle( item.bloque.noteId ) );

  return {
    id: item.id
  };
}

/** Actualiza el texto de un ítem de lista/verificación. */
export async function actualizarTextoItem(
  itemId: string, texto: string
) {
  const item = await prisma.bloqueItem.update( {
    where: {
      id: itemId
    },
    data: {
      texto
    },
    select: {
      bloque: {
        select: {
          noteId: true
        }
      }
    },
  } );

  revalidatePath( rutaDetalle( item.bloque.noteId ) );
}

/** Elimina un ítem de lista/verificación. */
export async function eliminarItem( itemId: string ) {
  const item = await prisma.bloqueItem.delete( {
    where: {
      id: itemId
    },
    select: {
      bloque: {
        select: {
          noteId: true
        }
      }
    },
  } );

  revalidatePath( rutaDetalle( item.bloque.noteId ) );
}

/**
 * Asocia una etiqueta a la nota por nombre — la crea si no existe (color
 * asignado round-robin desde una paleta fija). Nunca falla si la etiqueta
 * ya estaba asociada: ese caso es un no-op silencioso.
 */
export async function crearOAsociarEtiqueta(
  notaId: string, nombre: string
) {
  const nombreValido = z.string()
    .trim()
    .min( 1 )
    .max( 60 )
    .parse( nombre );

  const etiqueta = await prisma.$transaction( async ( tx ) => {
    const existente = await tx.etiqueta.findUnique( {
      where: {
        nombre: nombreValido
      },
      select: {
        id    : true,
        nombre: true,
        color : true
      },
    } );

    if ( existente ) {
      return existente;
    }

    const total = await tx.etiqueta.count();

    return tx.etiqueta.create( {
      data: {
        id    : crypto.randomUUID(),
        nombre: nombreValido,
        color : ETQ_COLORS[ total % ETQ_COLORS.length ],
      },
      select: {
        id    : true,
        nombre: true,
        color : true
      },
    } );
  } );

  try {
    await prisma.etiquetaEnNote.create( {
      data: {
        noteId    : notaId,
        etiquetaId: etiqueta.id
      },
    } );
  } catch ( error ) {
    if ( !esErrorConstraintUnico( error ) ) {
      throw error;
    }
    // Ya estaba asociada a esta nota — no-op.
  }

  revalidatePath( rutaDetalle( notaId ) );

  return etiqueta;
}

/** Quita una etiqueta de la nota (la etiqueta en sí no se borra). */
export async function desasociarEtiqueta(
  notaId: string, etiquetaId: string
) {
  await prisma.etiquetaEnNote.delete( {
    where: {
      noteId_etiquetaId: {
        noteId: notaId,
        etiquetaId
      },
    },
  } );

  revalidatePath( rutaDetalle( notaId ) );
}

/** Asigna un usuario a la nota con un rol de asignación. */
export async function asignarUsuario(
  notaId: string, userId: string, rol: string
) {
  const rolValido = z.enum( ROLES_ASIGNACION )
    .parse( rol ) as RolAsignacion;

  try {
    await prisma.usuarioEnNote.create( {
      data: {
        noteId: notaId,
        userId,
        rol   : rolValido,
      },
    } );
  } catch ( error ) {
    if ( esErrorConstraintUnico( error ) ) {
      return {
        ok   : false,
        error: 'Este usuario ya está asignado a la nota.'
      } as const;
    }

    throw error;
  }

  revalidatePath( rutaDetalle( notaId ) );

  return {
    ok: true
  } as const;
}

/** Cambia el rol de asignación de un usuario ya asignado a la nota. */
export async function actualizarRolAsignacion(
  notaId: string, userId: string, rol: string
) {
  const rolValido = z.enum( ROLES_ASIGNACION )
    .parse( rol ) as RolAsignacion;

  await prisma.usuarioEnNote.update( {
    where: {
      userId_noteId: {
        userId,
        noteId: notaId
      },
    },
    data: {
      rol: rolValido
    },
  } );

  revalidatePath( rutaDetalle( notaId ) );
}

/** Quita un usuario asignado de la nota. */
export async function quitarUsuario(
  notaId: string, userId: string
) {
  await prisma.usuarioEnNote.delete( {
    where: {
      userId_noteId: {
        userId,
        noteId: notaId
      },
    },
  } );

  revalidatePath( rutaDetalle( notaId ) );
}
