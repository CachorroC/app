'use client';

import { useRef, useState, useTransition } from 'react';
import { IconButton } from '#@/components/ds/icon-button';
import { Switch } from '#@/components/ds/switch';
import { actualizarNota,
  actualizarRolAsignacion,
  actualizarTextoBloque,
  actualizarTextoItem,
  agregarBloque,
  agregarItem,
  alternarItem,
  asignarUsuario,
  crearOAsociarEtiqueta,
  desasociarEtiqueta,
  eliminarBloque,
  eliminarItem,
  quitarUsuario,
  reordenarBloques, } from '#@/lib/bitacora/actions';
import { BloqueDTO, NotaDetalle, RolAsignacionVisible, TareaVinculadaDTO, UsuarioDisponibleDTO } from '#@/lib/bitacora/tipos';
import { AsignarUsuarioMenu } from '../asignar-usuario-menu';
import { BloqueContenido } from '../bloque-contenido';
import { CarpetaCombobox, CarpetaOpcion } from '../carpeta-combobox';
import { EditorFooter } from '../editor-footer';
import { EtiquetaInput } from '../etiqueta-input';
import { PanelConvertirTarea } from '../panel-convertir-tarea';
import { TareaVinculadaRow } from '../tarea-vinculada-row';
import { UsuarioAsignadoRow } from '../usuario-asignado-row';
import styles from './editor-nota.module.css';

type EstadoNotaValor = NotaDetalle['estado'];
type TipoBloqueNuevo = 'PARRAFO' | 'LISTA' | 'VERIFICACION';

const ESTADOS: { valor: EstadoNotaValor; label: string }[] = [
  {
    valor: 'PENDIENTE',
    label: 'Pendiente'
  },
  {
    valor: 'EN_REVISION',
    label: 'En revisión'
  },
  {
    valor: 'ATENDIDA',
    label: 'Atendida'
  },
  {
    valor: 'ARCHIVADA',
    label: 'Archivada'
  },
];

const TIPOS_BLOQUE: { valor: TipoBloqueNuevo; label: string; icono: string }[] = [
  {
    valor: 'PARRAFO',
    label: 'Párrafo',
    icono: 'subject'
  },
  {
    valor: 'LISTA',
    label: 'Lista',
    icono: 'format_list_bulleted'
  },
  {
    valor: 'VERIFICACION',
    label: 'Lista de verificación',
    icono: 'checklist'
  },
];

function formatoFecha( iso: string ): string {
  const d = new Date( iso );

  return `${ String( d.getDate() )
    .padStart(
      2, '0'
    ) }/${ String( d.getMonth() + 1 )
    .padStart(
      2, '0'
    ) }/${ d.getFullYear() }`;
}

export type EditorNotaProps = {
  nota    : NotaDetalle;
  casos   : CarpetaOpcion[];
  personal: UsuarioDisponibleDTO[];
};

export const EditorNota = ( {
  nota, casos, personal
}: EditorNotaProps ) => {
  const [
    snapshot,
    setSnapshot
  ] = useState( {
    titulo : nota.titulo,
    resumen: nota.resumen ?? '',
    estado : nota.estado,
    fijada : nota.fijada,
    caso   : nota.caso,
  } );
  const [
    draft,
    setDraft
  ] = useState( snapshot );
  const [
    bloques,
    setBloques
  ] = useState<BloqueDTO[]>( nota.bloques );
  const [
    etiquetas,
    setEtiquetas
  ] = useState( nota.etiquetas );
  const [
    usuarios,
    setUsuarios
  ] = useState( nota.usuarios );
  const [
    tareas
  ] = useState<TareaVinculadaDTO[]>( nota.tareas );
  const [
    ultimaEdicion,
    setUltimaEdicion
  ] = useState( nota.editadaEn );
  const [
    itemEnConversion,
    setItemEnConversion
  ] = useState<string | null>( null );
  const [
    recienGuardado,
    setRecienGuardado
  ] = useState( false );

  const [
    guardando,
    iniciarGuardado
  ] = useTransition();
  const [
    ,
    iniciarTransicion
  ] = useTransition();

  const dragIndexRef = useRef<number | null>( null );
  const handleRefs = useRef<Record<string, HTMLButtonElement | null>>( {} );

  const soloLectura = snapshot.estado === 'ARCHIVADA';

  const sucio = draft.titulo !== snapshot.titulo
    || draft.resumen !== snapshot.resumen
    || draft.estado !== snapshot.estado
    || draft.fijada !== snapshot.fijada
    || ( draft.caso?.id ?? null ) !== ( snapshot.caso?.id ?? null );

  const errorTitulo = !draft.titulo.trim()
    ? 'El título es obligatorio.'
    : draft.titulo.length > 200
      ? `Máximo 200 caracteres (${ draft.titulo.length }).`
      : undefined;
  const errorResumen = draft.resumen.length > 400
    ? `Máximo 400 caracteres (${ draft.resumen.length }).`
    : undefined;

  const guardar = () => {
    if ( soloLectura || errorTitulo || errorResumen ) {
      return;
    }

    iniciarGuardado( async () => {
      await actualizarNota(
        nota.id, {
          titulo : draft.titulo.trim(),
          resumen: draft.resumen.trim() || null,
          estado : draft.estado,
          fijada : draft.fijada,
          casoId : draft.caso?.id ?? null,
        }
      );
      setSnapshot( draft );
      setUltimaEdicion( new Date()
        .toISOString() );
      setRecienGuardado( true );
      setTimeout(
        () => {
          setRecienGuardado( false );
        }, 2500
      );
    } );
  };

  const descartar = () => {
    setDraft( snapshot );
  };

  const alternar = ( itemId: string ) => {
    setBloques( ( prev ) => {
      return prev.map( ( b ) => {
        return b.tipo === 'PARRAFO'
          ? b
          : {
              ...b,
              items: b.items.map( ( it ) => {
                return it.id === itemId
                  ? {
                      ...it,
                      completado: !it.completado
                    }
                  : it;
              } ),
            };
      } );
    } );
    iniciarTransicion( async () => {
      await alternarItem( itemId );
    } );
  };

  const agregarBloqueLocal = ( tipo: TipoBloqueNuevo ) => {
    const id = crypto.randomUUID();
    const nuevo: BloqueDTO = tipo === 'PARRAFO'
      ? {
          id,
          tipo : 'PARRAFO',
          orden: bloques.length,
          texto: ''
        }
      : {
          id,
          tipo,
          orden : bloques.length,
          titulo: null,
          items : []
        };

    setBloques( ( prev ) => {
      return [
        ...prev,
        nuevo
      ];
    } );
    iniciarTransicion( async () => {
      await agregarBloque(
        nota.id, id, tipo
      );
    } );
  };

  const eliminarBloqueLocal = ( bloqueId: string ) => {
    setBloques( ( prev ) => {
      return prev.filter( ( b ) => {
        return b.id !== bloqueId;
      } );
    } );
    iniciarTransicion( async () => {
      await eliminarBloque( bloqueId );
    } );
  };

  const moverBloque = (
    indice: number, dir: -1 | 1
  ) => {
    const destino = indice + dir;

    if ( destino < 0 || destino >= bloques.length ) {
      return;
    }

    const copia = [
      ...bloques 
    ];
    const [
      item 
    ] = copia.splice(
      indice, 1
    );

    copia.splice(
      destino, 0, item
    );
    setBloques( copia );
    iniciarTransicion( async () => {
      await reordenarBloques(
        nota.id, copia.map( ( b ) => {
          return b.id;
        } )
      );
    } );
    requestAnimationFrame( () => {
      handleRefs.current[ item.id ]?.focus();
    } );
  };

  const soltarBloque = ( destino: number ) => {
    const origen = dragIndexRef.current;

    dragIndexRef.current = null;

    if ( origen === null || origen === destino ) {
      return;
    }

    const copia = [
      ...bloques 
    ];
    const [
      item 
    ] = copia.splice(
      origen, 1
    );

    copia.splice(
      destino, 0, item
    );
    setBloques( copia );
    iniciarTransicion( async () => {
      await reordenarBloques(
        nota.id, copia.map( ( b ) => {
          return b.id;
        } )
      );
    } );
  };

  const agregarItemEn = ( bloqueId: string ) => {
    const id = crypto.randomUUID();

    setBloques( ( prev ) => {
      return prev.map( ( b ) => {
        return b.id === bloqueId && b.tipo !== 'PARRAFO'
          ? {
              ...b,
              items: [
                ...b.items,
                {
                  id,
                  texto       : '',
                  orden       : b.items.length,
                  completado  : false,
                  completadoEn: null,
                  tareaId     : null,
                },
              ],
            }
          : b;
      } );
    } );
    iniciarTransicion( async () => {
      await agregarItem(
        bloqueId, id, ''
      );
    } );
  };

  const eliminarItemDe = ( itemId: string ) => {
    setBloques( ( prev ) => {
      return prev.map( ( b ) => {
        return b.tipo === 'PARRAFO'
          ? b
          : {
              ...b,
              items: b.items.filter( ( it ) => {
                return it.id !== itemId;
              } ),
            };
      } );
    } );
    iniciarTransicion( async () => {
      await eliminarItem( itemId );
    } );
  };

  const crearEtiqueta = ( nombre: string ) => {
    iniciarTransicion( async () => {
      const etiqueta = await crearOAsociarEtiqueta(
        nota.id, nombre
      );

      setEtiquetas( ( prev ) => {
        return prev.some( ( e ) => {
          return e.id === etiqueta.id;
        } )
          ? prev
          : [
              ...prev,
              etiqueta
            ];
      } );
    } );
  };

  const quitarEtiqueta = ( etiquetaId: string ) => {
    setEtiquetas( ( prev ) => {
      return prev.filter( ( e ) => {
        return e.id !== etiquetaId;
      } );
    } );
    iniciarTransicion( async () => {
      await desasociarEtiqueta(
        nota.id, etiquetaId
      );
    } );
  };

  const disponibles = personal.filter( ( p ) => {
    return !usuarios.some( ( u ) => {
      return u.id === p.id;
    } );
  } );

  const asignar = ( userId: string ) => {
    const encontrado = disponibles.find( ( p ) => {
      return p.id === userId;
    } );

    if ( !encontrado ) {
      return;
    }

    setUsuarios( ( prev ) => {
      return [
        ...prev,
        {
          id    : encontrado.id,
          nombre: encontrado.nombre,
          rol   : 'COLABORADOR' as RolAsignacionVisible,
        },
      ];
    } );
    iniciarTransicion( async () => {
      await asignarUsuario(
        nota.id, userId, 'COLABORADOR'
      );
    } );
  };

  const cambiarRol = (
    userId: string, rol: RolAsignacionVisible
  ) => {
    setUsuarios( ( prev ) => {
      return prev.map( ( u ) => {
        return u.id === userId
          ? {
              ...u,
              rol
            }
          : u;
      } );
    } );
    iniciarTransicion( async () => {
      await actualizarRolAsignacion(
        nota.id, userId, rol
      );
    } );
  };

  const quitar = ( userId: string ) => {
    setUsuarios( ( prev ) => {
      return prev.filter( ( u ) => {
        return u.id !== userId;
      } );
    } );
    iniciarTransicion( async () => {
      await quitarUsuario(
        nota.id, userId
      );
    } );
  };

  const mostrarPanelPara = ( bloque: BloqueDTO ) => {
    return bloque.tipo !== 'PARRAFO'
      && itemEnConversion !== null
      && bloque.items.some( ( it ) => {
        return it.id === itemEnConversion;
      } );
  };

  return (
    <div className={styles.editor}>
      {soloLectura && (
        <div className={styles.bannerLectura} role="status">
          <span className="material-symbols-rounded" aria-hidden="true">lock</span>
          {nota.archivadaEn
            ? 'Esta nota está archivada. Restáurela para editarla.'
            : 'Solo lectura — no tiene permisos de edición sobre esta nota.'}
        </div>
      )}

      <header className={styles.encabezado}>
        <div className={styles.tituloFila}>
          <IconButton
            ariaLabel={draft.fijada
              ? 'Desfijar nota'
              : 'Fijar nota'}
            selected={draft.fijada}
            variant={draft.fijada
              ? 'tonal'
              : 'standard'}
            disabled={soloLectura}
            onClick={() => {
              setDraft( ( d ) => {
                return {
                  ...d,
                  fijada: !d.fijada
                };
              } );
            }}
          >
            <span className="material-symbols-rounded" aria-hidden="true">push_pin</span>
          </IconButton>
          <div className={styles.tituloCampo}>
            <input
              className={`${ styles.tituloInput } ${ errorTitulo
                ? styles.inputError
                : '' }`}
              value={draft.titulo}
              disabled={soloLectura}
              required
              aria-required="true"
              aria-describedby={errorTitulo
                ? 'titulo-error'
                : undefined}
              placeholder="Título de la nota…"
              aria-label="Título de la nota"
              onChange={( e ) => {
                setDraft( ( d ) => {
                  return {
                    ...d,
                    titulo: e.target.value
                  };
                } );
              }}
            />
            <span className={styles.contador}>{draft.titulo.length}/200</span>
          </div>
        </div>
        {errorTitulo && <p id="titulo-error" className={styles.errorTexto}>{errorTitulo}</p>}
        <div className={styles.resumenCampo}>
          <textarea
            className={`${ styles.resumenInput } ${ errorResumen
              ? styles.inputError
              : '' }`}
            value={draft.resumen}
            disabled={soloLectura}
            placeholder="Resumen breve de la nota (opcional)…"
            aria-label="Resumen"
            aria-describedby={errorResumen
              ? 'resumen-error'
              : undefined}
            rows={2}
            onChange={( e ) => {
              setDraft( ( d ) => {
                return {
                  ...d,
                  resumen: e.target.value
                };
              } );
            }}
          />
          <span className={styles.contador}>{draft.resumen.length}/400</span>
        </div>
        {errorResumen && <p id="resumen-error" className={styles.errorTexto}>{errorResumen}</p>}
      </header>

      <div className={styles.cuerpo}>
        <main className={styles.main}>
          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>
              <span className="material-symbols-rounded" aria-hidden="true">subject</span>
              Cuerpo de la nota
            </h2>
            <div className={styles.bloques}>
              {bloques.map( (
                bloque, indice
              ) => {
                return (
                  <div
                    key={bloque.id}
                    className={styles.bloqueFila}
                    onDragOver={( e ) => {
                      if ( dragIndexRef.current !== null ) {
                        e.preventDefault();
                      }
                    }}
                    onDrop={() => {
                      soltarBloque( indice );
                    }}
                  >
                    {!soloLectura && (
                      <button
                        ref={( el ) => {
                          handleRefs.current[ bloque.id ] = el;
                        }}
                        type="button"
                        className={styles.manija}
                        draggable
                        aria-label="Reordenar bloque (flechas ↑ ↓)"
                        onDragStart={() => {
                          dragIndexRef.current = indice;
                        }}
                        onDragEnd={() => {
                          dragIndexRef.current = null;
                        }}
                        onKeyDown={( e ) => {
                          if ( e.key === 'ArrowUp' ) {
                            e.preventDefault();
                            moverBloque(
                              indice, -1
                            );
                          }

                          if ( e.key === 'ArrowDown' ) {
                            e.preventDefault();
                            moverBloque(
                              indice, 1
                            );
                          }
                        }}
                      >
                        <span className="material-symbols-rounded" aria-hidden="true">drag_indicator</span>
                      </button>
                    )}
                    <div className={styles.bloqueContenido}>
                      <BloqueContenido
                        bloque={bloque}
                        disabled={soloLectura}
                        onAlternar={alternar}
                        onConvertir={( itemId ) => {
                          setItemEnConversion( itemId );
                        }}
                        onTextoBloqueLocal={( texto ) => {
                          setBloques( ( prev ) => {
                            return prev.map( ( b ) => {
                              return b.id === bloque.id && b.tipo === 'PARRAFO'
                                ? {
                                    ...b,
                                    texto
                                  }
                                : b;
                            } );
                          } );
                        }}
                        onTextoBloqueCommit={( texto ) => {
                          iniciarTransicion( async () => {
                            await actualizarTextoBloque(
                              bloque.id, texto
                            );
                          } );
                        }}
                        onTextoItemLocal={(
                          itemId, texto
                        ) => {
                          setBloques( ( prev ) => {
                            return prev.map( ( b ) => {
                              return b.tipo === 'PARRAFO'
                                ? b
                                : {
                                    ...b,
                                    items: b.items.map( ( it ) => {
                                      return it.id === itemId
                                        ? {
                                            ...it,
                                            texto
                                          }
                                        : it;
                                    } ),
                                  };
                            } );
                          } );
                        }}
                        onTextoItemCommit={(
                          itemId, texto 
                        ) => {
                          iniciarTransicion( async () => {
                            await actualizarTextoItem(
                              itemId, texto
                            );
                          } );
                        }}
                        onAgregarItem={() => {
                          agregarItemEn( bloque.id );
                        }}
                        onEliminarItem={eliminarItemDe}
                      />
                      {mostrarPanelPara( bloque ) && itemEnConversion && (
                        <PanelConvertirTarea
                          itemId={itemEnConversion}
                          onCancelar={() => {
                            setItemEnConversion( null );
                          }}
                          onCreada={() => {
                            const idConvertido = itemEnConversion;

                            setBloques( ( prev ) => {
                              return prev.map( ( b ) => {
                                return b.tipo === 'PARRAFO'
                                  ? b
                                  : {
                                      ...b,
                                      items: b.items.map( ( it ) => {
                                        return it.id === idConvertido
                                          ? {
                                              ...it,
                                              tareaId: idConvertido
                                            }
                                          : it;
                                      } ),
                                    };
                              } );
                            } );
                            setItemEnConversion( null );
                          }}
                        />
                      )}
                    </div>
                    {!soloLectura && (
                      <IconButton
                        ariaLabel="Eliminar bloque"
                        variant="standard"
                        onClick={() => {
                          eliminarBloqueLocal( bloque.id );
                        }}
                      >
                        <span className="material-symbols-rounded" aria-hidden="true">delete</span>
                      </IconButton>
                    )}
                  </div>
                );
              } )}
            </div>
            {!soloLectura && (
              <details className={styles.agregarBloque}>
                <summary className={styles.agregarBloqueDisparador}>
                  <span className="material-symbols-rounded" aria-hidden="true">add</span>
                  Agregar bloque
                </summary>
                <ul className={styles.agregarBloqueMenu}>
                  {TIPOS_BLOQUE.map( ( t ) => {
                    return (
                      <li key={t.valor}>
                        <button
                          type="button"
                          className={styles.agregarBloqueOpcion}
                          onClick={() => {
                            agregarBloqueLocal( t.valor );
                          }}
                        >
                          <span className="material-symbols-rounded" aria-hidden="true">{t.icono}</span>
                          {t.label}
                        </button>
                      </li>
                    );
                  } )}
                </ul>
              </details>
            )}
          </section>

          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>
              <span className="material-symbols-rounded" aria-hidden="true">flag</span>
              Tareas vinculadas
            </h2>
            {tareas.length === 0
              ? (
                  <p className={styles.vacioTareas}>
                    Sin tareas vinculadas. Convierta un ítem de verificación en tarea para hacer seguimiento.
                  </p>
                )
              : (
                  <div className={styles.tareas}>
                    {tareas.map( ( t ) => {
                      return <TareaVinculadaRow key={t.id} tarea={t} />;
                    } )}
                  </div>
                )}
          </section>
        </main>

        <aside className={styles.aside}>
          <div className={styles.campo}>
            <span className={styles.campoLabel}>
              <span className="material-symbols-rounded" aria-hidden="true">flag</span>
              Estado
            </span>
            <select
              className={styles.estadoSelect}
              value={draft.estado}
              disabled={soloLectura}
              aria-label="Estado de la nota"
              onChange={( e ) => {
                setDraft( ( d ) => {
                  return {
                    ...d,
                    estado: e.target.value as EstadoNotaValor
                  };
                } );
              }}
            >
              {ESTADOS.map( ( e ) => {
                return <option key={e.valor} value={e.valor}>{e.label}</option>;
              } )}
            </select>
            {nota.estado === 'ARCHIVADA' && nota.archivadaEn && (
              <p className={styles.archivadaNota}>Archivada el {formatoFecha( nota.archivadaEn )}</p>
            )}
          </div>

          <div className={styles.campo}>
            <label className={styles.fijarFila}>
              <span className={styles.campoLabel}>
                <span className="material-symbols-rounded" aria-hidden="true">push_pin</span>
                Fijar nota
              </span>
              <Switch
                checked={draft.fijada}
                disabled={soloLectura}
                ariaLabel="Fijar nota"
                onChange={( v ) => {
                  setDraft( ( d ) => {
                    return {
                      ...d,
                      fijada: v
                    };
                  } );
                }}
              />
            </label>
          </div>

          <div className={styles.campo}>
            <span className={styles.campoLabel}>
              <span className="material-symbols-rounded" aria-hidden="true">folder</span>
              Carpeta
            </span>
            <CarpetaCombobox
              caso={draft.caso}
              opciones={casos}
              disabled={soloLectura}
              onSeleccionar={( caso ) => {
                setDraft( ( d ) => {
                  return {
                    ...d,
                    caso
                  };
                } );
              }}
            />
          </div>

          <div className={styles.campo}>
            <span className={styles.campoLabel}>
              <span className="material-symbols-rounded" aria-hidden="true">sell</span>
              Etiquetas
            </span>
            <EtiquetaInput
              etiquetas={etiquetas}
              disabled={soloLectura}
              onCrear={crearEtiqueta}
              onQuitar={quitarEtiqueta}
            />
          </div>

          <div className={styles.campo}>
            <span className={styles.campoLabel}>
              <span className="material-symbols-rounded" aria-hidden="true">group</span>
              Personas asignadas
            </span>
            <div className={styles.usuarios}>
              {usuarios.map( ( u ) => {
                return (
                  <UsuarioAsignadoRow
                    key={u.id}
                    usuario={u}
                    disabled={soloLectura}
                    onCambiarRol={( rol ) => {
                      cambiarRol(
                        u.id, rol
                      );
                    }}
                    onQuitar={() => {
                      quitar( u.id );
                    }}
                  />
                );
              } )}
            </div>
            {!soloLectura && <AsignarUsuarioMenu disponibles={disponibles} onAsignar={asignar} />}
          </div>
        </aside>
      </div>

      <EditorFooter
        creadaEn={nota.creadaEn}
        editadaEn={ultimaEdicion}
        soloLectura={soloLectura}
        guardando={guardando}
        sucio={sucio}
        recienGuardado={recienGuardado}
        onDescartar={descartar}
        onGuardar={guardar}
      />
    </div>
  );
};
