'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import prisma from '#@/lib/connection/prisma';
import { EstadoNote, PrioridadTarea, TipoBloque } from '#@/app/generated/prisma/enums';

const RUTA_LISTA = '/bitacora';

function rutaDetalle( id: string ) {
  return `/bitacora/${ id }`;
}

const RUTA_TAREAS = '/tareas';

const ESTADOS_NOTE = Object.values( EstadoNote ) as [string, ...string[]];
const PRIORIDADES_TAREA = Object.values( PrioridadTarea ) as [string, ...string[]];

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

  const nota = await prisma.notes.create( {
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
  estado: z.enum( ESTADOS_NOTE )
    .optional(),
  casoId: z.string()
    .nullable()
    .optional(),
} );

/**
 * Actualiza una nota. `resumen` se regenera siempre a partir del primer
 * bloque PARRAFO (truncado a 400 caracteres) — nunca se edita a mano.
 */
export async function actualizarNota(
  id: string, input: z.infer<typeof ActualizarNotaSchema> 
) {
  const datos = ActualizarNotaSchema.parse( input );

  const primerParrafo = await prisma.note_bloques.findFirst( {
    where: {
      noteId: id,
      tipo  : TipoBloque.PARRAFO 
    },
    orderBy: {
      orden: 'asc' 
    },
    select: {
      texto: true 
    },
  } );

  await prisma.notes.update( {
    where: {
      id 
    },
    data: {
      ...( datos.titulo !== undefined
        ? {
            titulo: datos.titulo 
          }
        : {} ),
      ...( datos.estado !== undefined
        ? {
            estado: datos.estado as EstadoNote 
          }
        : {} ),
      ...( datos.casoId !== undefined
        ? {
            carpetaId: datos.casoId
              ? Number( datos.casoId )
              : null 
          }
        : {} ),
      resumen: primerParrafo?.texto
        ? primerParrafo.texto.slice(
            0, 400 
          )
        : null,
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
      return tx.note_bloques.update( {
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
      return tx.note_bloques.update( {
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
  const item = await prisma.bloque_items.findUniqueOrThrow( {
    where: {
      id: itemId 
    },
    select: {
      completado  : true,
      note_bloques: {
        select: {
          noteId: true 
        } 
      } 
    },
  } );

  const completado = !item.completado;

  await prisma.bloque_items.update( {
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

  revalidatePath( rutaDetalle( item.note_bloques.noteId ) );
}

export async function fijarNota(
  id: string, fijada: boolean 
) {
  await prisma.notes.update( {
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
  await prisma.notes.update( {
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

  const item = await prisma.bloque_items.findUniqueOrThrow( {
    where: {
      id: itemId 
    },
    select: {
      texto       : true,
      tareaId     : true,
      note_bloques: {
        select: {
          noteId: true,
          notes : {
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
      const creada = await tx.tareas.create( {
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
          carpetaId   : item.note_bloques.notes.carpetaId,
          noteOrigenId: item.note_bloques.noteId,
          editadaEn   : new Date(),
        },
        select: {
          id: true 
        },
      } );

      await tx.bloque_items.update( {
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
    revalidatePath( rutaDetalle( item.note_bloques.noteId ) );

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
