import 'server-only';
import prisma from '#@/lib/connection/prisma';
import { EstadoNote, TipoBloque } from '#@/app/generated/prisma/enums';
import { BloqueDTO, FiltrosNotas, ListaNotasResultado, NotaDetalle, NotaResumen, } from './tipos';

const SELECT_RESUMEN = {
  id       : true,
  titulo   : true,
  resumen  : true,
  estado   : true,
  fijada   : true,
  creadaEn : true,
  editadaEn: true,
  carpeta  : {
    select: {
      numero: true,
      nombre: true
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
  bloques: {
    where: {
      tipo: TipoBloque.VERIFICACION
    },
    select: {
      items: {
        select: {
          completado: true
        }
      }
    },
  },
} as const;

type FilaResumen = Awaited<ReturnType<typeof prisma.note.findFirstOrThrow<{ select: typeof SELECT_RESUMEN }>>>;

function aNotaResumen( fila: FilaResumen ): NotaResumen {
  const items = fila.bloques.flatMap( ( b ) => {
    return b.items;
  } );

  return {
    id     : fila.id,
    titulo : fila.titulo,
    resumen: fila.resumen,
    estado : fila.estado as NotaResumen['estado'],
    fijada : fila.fijada,
    caso   : fila.carpeta
      ? {
          id        : String( fila.carpeta.numero ),
          referencia: `Carpeta ${ fila.carpeta.numero }`,
          nombre    : fila.carpeta.nombre
        }
      : null,
    etiquetas: fila.etiquetas.map( ( e ) => {
      return e.etiqueta;
    } ),
    creadaEn              : fila.creadaEn.toISOString(),
    editadaEn             : fila.editadaEn.toISOString(),
    totalItemsVerificacion: items.length,
    itemsCompletados      : items.filter( ( i ) => {
      return i.completado;
    } ).length,
  };
}

const ORDEN_CAMPO = {
  editada: {
    editadaEn: 'desc' as const 
  },
  creada: {
    creadaEn: 'desc' as const 
  },
  titulo: {
    titulo: 'asc' as const 
  },
};

/**
 * Lista notas para /bitacora. Selección explícita — nada de `include` que
 * traiga bloques completos. Las fijadas se separan aquí, no en el
 * componente, para que la sección "Fijadas" no dependa de un segundo
 * round-trip.
 */
export async function listarNotas( filtros: FiltrosNotas ): Promise<ListaNotasResultado> {
  const estadosSolicitados = filtros.estado?.filter( ( e ): e is EstadoNote => {
    return Object.values( EstadoNote )
      .includes( e as EstadoNote );
  } );

  const where = {
    ...( filtros.q
      ? {
          OR: [
            {
              titulo: {
                contains: filtros.q,
                mode    : 'insensitive' as const 
              } 
            },
            {
              resumen: {
                contains: filtros.q,
                mode    : 'insensitive' as const 
              } 
            },
          ],
        }
      : {} ),
    // Sin filtro explícito de estado, ARCHIVADA queda fuera por defecto —
    // solo aparece si el usuario la pide.
    ...( estadosSolicitados?.length
      ? {
          estado: {
            in: estadosSolicitados 
          } 
        }
      : {
          estado: {
            not: EstadoNote.ARCHIVADA 
          } 
        } ),
    ...( filtros.caso === 'sin-caso'
      ? {
          carpetaId: null 
        }
      : filtros.caso && filtros.caso !== 'todos'
        ? {
            carpetaId: Number( filtros.caso ) 
          }
        : {} ),
  };

  const take = 51;

  const filas = await prisma.note.findMany( {
    where,
    select : SELECT_RESUMEN,
    orderBy: ORDEN_CAMPO[ filtros.orden ?? 'editada' ],
    take,
    ...( filtros.cursor
      ? {
          cursor: {
            id: filtros.cursor 
          },
          skip: 1 
        }
      : {} ),
  } );

  const hasMore = filas.length > 50;
  const pagina = hasMore
    ? filas.slice(
        0, 50 
      )
    : filas;
  const resumenes = pagina.map( aNotaResumen );

  return {
    fijadas: resumenes.filter( ( n ) => {
      return n.fijada;
    } ),
    notas: resumenes.filter( ( n ) => {
      return !n.fijada;
    } ),
    hasMore,
    cursor: hasMore
      ? pagina[ pagina.length - 1 ].id
      : null,
  };
}

/**
 * Detalle completo de una nota para el editor. Bloques ordenados por
 * `orden`, ítems ordenados por `orden` — todo en la consulta, nunca en el
 * componente.
 */
export async function obtenerNota( id: string ): Promise<NotaDetalle | null> {
  const fila = await prisma.note.findUnique( {
    where: {
      id
    },
    select: {
      id         : true,
      titulo     : true,
      resumen    : true,
      estado     : true,
      fijada     : true,
      creadaEn   : true,
      editadaEn  : true,
      archivadaEn: true,
      carpeta    : {
        select: {
          numero: true,
          nombre: true
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
      asignados: {
        select: {
          rol : true,
          user: {
            select: {
              id    : true,
              nombre: true
            }
          }
        },
      },
      tareas: {
        orderBy: {
          creadaEn: 'asc'
        },
        select: {
          id         : true,
          titulo     : true,
          estado     : true,
          prioridad  : true,
          fechaLimite: true,
          esTermino  : true,
        },
      },
      bloques: {
        orderBy: {
          orden: 'asc'
        },
        select: {
          id   : true,
          tipo : true,
          orden: true,
          texto: true,
          items: {
            orderBy: {
              orden: 'asc'
            },
            select: {
              id          : true,
              texto       : true,
              orden       : true,
              completado  : true,
              completadoEn: true,
              tareaId     : true,
            },
          },
        },
      },
    },
  } );

  if ( !fila ) {
    return null;
  }

  const bloques: BloqueDTO[] = fila.bloques.map( ( b ) => {
    if ( b.tipo === TipoBloque.PARRAFO ) {
      return {
        id   : b.id,
        tipo : 'PARRAFO' as const,
        orden: b.orden,
        texto: b.texto ?? '',
      };
    }

    return {
      id  : b.id,
      tipo: b.tipo === TipoBloque.LISTA
        ? 'LISTA' as const
        : 'VERIFICACION' as const,
      orden : b.orden,
      titulo: b.texto,
      items : b.items.map( ( i ) => {
        return {
          id          : i.id,
          texto       : i.texto,
          orden       : i.orden,
          completado  : i.completado,
          completadoEn: i.completadoEn?.toISOString() ?? null,
          tareaId     : i.tareaId,
        };
      } ),
    };
  } );

  return {
    id     : fila.id,
    titulo : fila.titulo,
    resumen: fila.resumen,
    estado : fila.estado as NotaDetalle['estado'],
    fijada : fila.fijada,
    caso   : fila.carpeta
      ? {
          id        : String( fila.carpeta.numero ),
          referencia: `Carpeta ${ fila.carpeta.numero }`,
          nombre    : fila.carpeta.nombre
        }
      : null,
    etiquetas: fila.etiquetas.map( ( e ) => {
      return e.etiqueta;
    } ),
    creadaEn   : fila.creadaEn.toISOString(),
    editadaEn  : fila.editadaEn.toISOString(),
    archivadaEn: fila.archivadaEn?.toISOString() ?? null,
    usuarios   : fila.asignados.map( ( u ) => {
      return {
        id    : u.user.id,
        nombre: u.user.nombre,
        rol   : u.rol as NotaDetalle['usuarios'][number]['rol'],
      };
    } ),
    tareas: fila.tareas.map( ( t ) => {
      return {
        id         : t.id,
        titulo     : t.titulo,
        estado     : t.estado as NotaDetalle['tareas'][number]['estado'],
        prioridad  : t.prioridad as NotaDetalle['tareas'][number]['prioridad'],
        fechaLimite: t.fechaLimite?.toISOString() ?? null,
        esTermino  : t.esTermino,
      };
    } ),
    bloques,
  };
}

/** Carpetas para el combobox de asociación (numero/nombre por separado, no el rótulo combinado del filtro). */
export async function listarCarpetasParaCombobox() {
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
      numero: c.numero,
      nombre: c.nombre,
    };
  } );
}

/** Personal activo aún no asignado a la nota, para el menú "Asignar usuario". */
export async function listarUsuariosDisponibles( idsAsignados: string[] ) {
  const usuarios = await prisma.user.findMany( {
    where: {
      activo: true,
      id    : {
        notIn: idsAsignados
      },
    },
    select: {
      id    : true,
      nombre: true
    },
    orderBy: {
      nombre: 'asc'
    },
  } );

  return usuarios;
}

/** Casos disponibles para el selector del filtro. TODO: paginar si crece mucho. */
export async function listarCasosParaFiltro() {
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

// TODO: la búsqueda de texto (`q`) no cubre el contenido de los bloques,
// solo título/resumen — full-text sobre note_bloques queda pendiente.
