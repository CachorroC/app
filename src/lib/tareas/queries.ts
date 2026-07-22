import 'server-only';
import prisma from '#@/lib/connection/prisma';
import { EstadoTarea } from '#@/app/generated/prisma/enums';
import { estadoVisible } from './estado';
import { grupoDeVencimiento, GRUPOS_VENCIMIENTO } from './grupos';
import { FiltrosTareas, GrupoTareasResultado, TareaResumen } from './tipos';

const SELECT_RESUMEN = {
  id          : true,
  titulo      : true,
  descripcion : true,
  estado      : true,
  prioridad   : true,
  fechaLimite : true,
  esTermino   : true,
  responsable : true,
  creadaEn    : true,
  editadaEn   : true,
  completadaEn: true,
  carpeta     : {
    select: {
      numero: true,
      nombre: true
    }
  },
  noteOrigen: {
    select: {
      id    : true,
      titulo: true
    }
  },
  etiquetas: {
    select: {
      etiqueta: {
        select: {
          id    : true,
          nombre: true,
          color : true
        }
      }
    },
  },
} as const;

type FilaResumen = Awaited<ReturnType<typeof prisma.tarea.findFirstOrThrow<{ select: typeof SELECT_RESUMEN }>>>;

function aTareaResumen( fila: FilaResumen ): TareaResumen {
  return {
    id         : fila.id,
    titulo     : fila.titulo,
    descripcion: fila.descripcion,
    estado     : estadoVisible( {
      estado     : fila.estado,
      fechaLimite: fila.fechaLimite 
    } ),
    prioridad  : fila.prioridad,
    fechaLimite: fila.fechaLimite?.toISOString() ?? null,
    esTermino  : fila.esTermino,
    responsable: fila.responsable,
    caso       : fila.carpeta
      ? {
          id        : String( fila.carpeta.numero ),
          referencia: `Carpeta ${ fila.carpeta.numero }`,
          nombre    : fila.carpeta.nombre
        }
      : null,
    etiquetas: fila.etiquetas.map( ( e ) => {
      return e.etiqueta;
    } ),
    origenNota  : fila.noteOrigen,
    creadaEn    : fila.creadaEn.toISOString(),
    editadaEn   : fila.editadaEn.toISOString(),
    completadaEn: fila.completadaEn?.toISOString() ?? null,
  };
}

// Compone con AND (no con spread) a propósito: tanto la condición de
// estado como la búsqueda de texto pueden necesitar su propia cláusula OR,
// y dos OR al mismo nivel de un `where` de Prisma se pisan entre sí.
function construirWhere(
  filtros: FiltrosTareas, userId: string | null 
) {
  const estadosSolicitados = filtros.estado?.filter( ( e ) => {
    return e !== 'VENCIDA';
  } ) as EstadoTarea[] | undefined;
  const pideVencidas = filtros.estado?.includes( 'VENCIDA' ) ?? false;

  const condiciones: object[] = [];

  if ( pideVencidas && estadosSolicitados?.length ) {
    condiciones.push( {
      OR: [
        {
          estado: {
            in: estadosSolicitados 
          } 
        },
        {
          estado     : EstadoTarea.PENDIENTE,
          fechaLimite: {
            lt: new Date() 
          } 
        },
      ],
    } );
  } else if ( pideVencidas ) {
    condiciones.push( {
      estado     : EstadoTarea.PENDIENTE,
      fechaLimite: {
        lt: new Date() 
      } 
    } );
  } else if ( estadosSolicitados?.length ) {
    condiciones.push( {
      estado: {
        in: estadosSolicitados 
      } 
    } );
  } else {
    // Sin filtro explícito, ARCHIVADA queda fuera por defecto.
    condiciones.push( {
      estado: {
        not: EstadoTarea.ARCHIVADA 
      } 
    } );
  }

  if ( filtros.q ) {
    condiciones.push( {
      OR: [
        {
          titulo: {
            contains: filtros.q,
            mode    : 'insensitive' as const 
          } 
        },
        {
          descripcion: {
            contains: filtros.q,
            mode    : 'insensitive' as const 
          } 
        },
      ],
    } );
  }

  if ( filtros.caso === 'sin-caso' ) {
    condiciones.push( {
      carpetaId: null 
    } );
  } else if ( filtros.caso && filtros.caso !== 'todos' ) {
    condiciones.push( {
      carpetaId: Number( filtros.caso ) 
    } );
  }

  if ( filtros.termino ) {
    condiciones.push( {
      esTermino: true 
    } );
  }

  if ( filtros.asignadasAMi && userId ) {
    condiciones.push( {
      OR: [
        {
          userId
        },
        {
          creadoPorId: userId
        },
        {
          asignados: {
            some: {
              userId
            }
          }
        },
      ],
    } );
  }

  if ( filtros.desde || filtros.hasta ) {
    condiciones.push( {
      fechaLimite: {
        ...( filtros.desde
          ? {
              gte: new Date( filtros.desde ) 
            }
          : {} ),
        ...( filtros.hasta
          ? {
              lte: new Date( filtros.hasta ) 
            }
          : {} ),
      },
    } );
  }

  return {
    AND: condiciones 
  };
}

/**
 * Lista tareas para /tareas, agrupadas por vencimiento. La agrupación se
 * calcula aquí (servidor, hora de Bogotá) — nunca en el componente.
 */
export async function listarTareas(
  filtros: FiltrosTareas, userId: string | null = null 
): Promise<GrupoTareasResultado[]> {
  const filas = await prisma.tarea.findMany( {
    where: construirWhere(
      filtros, userId 
    ),
    select : SELECT_RESUMEN,
    orderBy: [
      {
        fechaLimite: 'asc' 
      },
      {
        editadaEn: 'desc' 
      } 
    ],
    take: 200,
  } );

  const resumenes = filas.map( aTareaResumen );
  const ahora = new Date();

  return GRUPOS_VENCIMIENTO
    .map( ( grupo ) => {
      return {
        grupo,
        tareas: resumenes.filter( ( t ) => {
          const fecha = t.fechaLimite
            ? new Date( t.fechaLimite )
            : null;

          return grupoDeVencimiento(
            fecha, ahora 
          ) === grupo;
        } ),
      };
    } )
    .filter( ( g ) => {
      return g.tareas.length > 0;
    } );
}

export async function listarCasosParaFiltroTareas() {
  const carpetas = await prisma.carpeta.findMany( {
    select: {
      numero: true,
      nombre: true 
    },
    orderBy: {
      numero: 'desc' 
    },
    take: 200,
  } );

  return carpetas.map( ( c ) => {
    return {
      id    : String( c.numero ),
      nombre: `Carpeta ${ c.numero } · ${ c.nombre }` 
    };
  } );
}
