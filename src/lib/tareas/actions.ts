'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import prisma from '#@/lib/connection/prisma';
import { EstadoTarea, PrioridadTarea } from '#@/app/generated/prisma/enums';

const RUTA_LISTA = '/dashboard/tareas';
const PRIORIDADES = Object.values( PrioridadTarea ) as [string, ...string[]];
const ESTADOS_TAREA = Object.values( EstadoTarea ) as [string, ...string[]];

const CrearTareaSchema = z.object( {
  titulo: z.string()
    .trim()
    .min(
      1, 'El título es obligatorio.' 
    )
    .max( 200 ),
  descripcion: z.string()
    .trim()
    .max( 2000 )
    .optional(),
  casoId: z.string()
    .optional(),
  fechaLimite: z.string()
    .optional(),
  prioridad: z.enum( PRIORIDADES )
    .optional(),
  esTermino: z.boolean()
    .optional(),
  responsable: z.string()
    .trim()
    .max( 120 )
    .optional(),
} );

export async function crearTarea( input: z.infer<typeof CrearTareaSchema> ) {
  const datos = CrearTareaSchema.parse( input );

  const tarea = await prisma.tarea.create( {
    data: {
      id         : crypto.randomUUID(),
      titulo     : datos.titulo,
      descripcion: datos.descripcion || null,
      carpetaId  : datos.casoId
        ? Number( datos.casoId )
        : null,
      fechaLimite: datos.fechaLimite
        ? new Date( datos.fechaLimite )
        : null,
      prioridad  : ( datos.prioridad as PrioridadTarea ) ?? PrioridadTarea.MEDIA,
      esTermino  : datos.esTermino ?? false,
      responsable: datos.responsable || null,
      editadaEn  : new Date(),
    },
    select: {
      id: true 
    },
  } );

  revalidatePath( RUTA_LISTA );

  return {
    id: tarea.id 
  };
}

const ActualizarTareaSchema = z.object( {
  titulo: z.string()
    .trim()
    .min( 1 )
    .max( 200 )
    .optional(),
  descripcion: z.string()
    .trim()
    .max( 2000 )
    .nullable()
    .optional(),
  estado: z.enum( ESTADOS_TAREA )
    .optional(),
  casoId: z.string()
    .nullable()
    .optional(),
  fechaLimite: z.string()
    .nullable()
    .optional(),
  prioridad: z.enum( PRIORIDADES )
    .optional(),
  esTermino: z.boolean()
    .optional(),
  responsable: z.string()
    .trim()
    .max( 120 )
    .nullable()
    .optional(),
} );

export async function actualizarTarea(
  id: string, input: z.infer<typeof ActualizarTareaSchema> 
) {
  const datos = ActualizarTareaSchema.parse( input );

  await prisma.tarea.update( {
    where: {
      id 
    },
    data: {
      ...( datos.titulo !== undefined
        ? {
            titulo: datos.titulo 
          }
        : {} ),
      ...( datos.descripcion !== undefined
        ? {
            descripcion: datos.descripcion 
          }
        : {} ),
      ...( datos.estado !== undefined
        ? {
            estado: datos.estado as EstadoTarea 
          }
        : {} ),
      ...( datos.casoId !== undefined
        ? {
            carpetaId: datos.casoId
              ? Number( datos.casoId )
              : null 
          }
        : {} ),
      ...( datos.fechaLimite !== undefined
        ? {
            fechaLimite: datos.fechaLimite
              ? new Date( datos.fechaLimite )
              : null 
          }
        : {} ),
      ...( datos.prioridad !== undefined
        ? {
            prioridad: datos.prioridad as PrioridadTarea 
          }
        : {} ),
      ...( datos.esTermino !== undefined
        ? {
            esTermino: datos.esTermino 
          }
        : {} ),
      ...( datos.responsable !== undefined
        ? {
            responsable: datos.responsable 
          }
        : {} ),
      editadaEn: new Date(),
    },
  } );

  revalidatePath( RUTA_LISTA );
}

/**
 * Marca la tarea como atendida. Si nació de un ítem de checklist promovido,
 * refleja la conclusión en ese ítem dentro de la misma transacción — sin
 * trigger ni cron.
 */
export async function completarTarea( id: string ) {
  const noteOrigenId = await prisma.$transaction( async ( tx ) => {
    const tarea = await tx.tarea.update( {
      where: {
        id 
      },
      data: {
        estado      : EstadoTarea.ATENDIDA,
        completadaEn: new Date(),
        editadaEn   : new Date() 
      },
      select: {
        noteOrigenId: true,
        itemOrigen: {
          select: {
            id: true
          }
        }
      },
    } );

    if ( tarea.itemOrigen ) {
      await tx.bloqueItem.update( {
        where: {
          id: tarea.itemOrigen.id
        },
        data: {
          completado  : true,
          completadoEn: new Date() 
        },
      } );
    }

    return tarea.noteOrigenId;
  } );

  revalidatePath( RUTA_LISTA );

  if ( noteOrigenId ) {
    revalidatePath( `/dashboard/bitacora/${ noteOrigenId }` );
  }
}

/** Nunca borra: marca ARCHIVADA + archivadaEn. */
export async function archivarTarea( id: string ) {
  await prisma.tarea.update( {
    where: {
      id 
    },
    data: {
      estado     : EstadoTarea.ARCHIVADA,
      archivadaEn: new Date(),
      editadaEn  : new Date() 
    },
  } );
  revalidatePath( RUTA_LISTA );
}
