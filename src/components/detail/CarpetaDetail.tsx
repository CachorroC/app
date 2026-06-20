'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '#@/styles/CarpetaDetail.module.css';
import { CATEGORY_META, deudorNombre, fmtCOP, fmtDate, TIPO_PROCESO_LABEL } from '#@/lib/format';
import { Carpeta, DetailView, Nota, Task } from '#@/lib/types/dashboard_types';
import { Icon } from '../ui';

type TabKey = 'resumen' | 'demanda' | 'deudor' | 'procesos' | 'actuaciones' | 'facturas' | 'notas' | 'tareas';

interface KV { k: string; v: string; mono?: boolean; }

export default function CarpetaDetail( {
  carpeta
}: { carpeta: Carpeta } ) {
  const router = useRouter();
  const [
    view,
    setView
  ] = useState<DetailView>( 'tabs' );
  const [
    tab,
    setTab
  ] = useState<TabKey>( 'resumen' );
  const [
    tareas,
    setTareas
  ] = useState<Task[]>( carpeta.tareas );
  const [
    notas,
    setNotas
  ] = useState<Nota[]>( carpeta.notas );
  const [
    newTarea,
    setNewTarea
  ] = useState( '' );
  const [
    newNota,
    setNewNota
  ] = useState( '' );

  const meta = CATEGORY_META[ carpeta.category ];
  const d = carpeta.deudor;
  const dem = carpeta.demanda;

  function toggleTarea( id: number ) {
    setTareas( ( p ) => {
      return p.map( ( t ) => {
        return ( t.id === id
          ? {
              ...t,
              done: !t.done
            }
          : t );
      } );
    } );
  }

  function addTarea() {
    const text = newTarea.trim();

    if ( !text ) {
      return;
    }

    setTareas( ( p ) => {
      return [
        ...p,
        {
          id     : Date.now(),
          text,
          dueDate: null,
          done   : false
        }
      ];
    } );
    setNewTarea( '' );
  }

  function addNota() {
    const text = newNota.trim();

    if ( !text ) {
      return;
    }

    setNotas( ( p ) => {
      return [
        {
          id       : `n${ Date.now() }`,
          text,
          content  : [],
          createdAt: new Date()
            .toISOString()
            .slice(
              0, 10
            ),
          completed: false
        },
        ...p
      ];
    } );
    setNewNota( '' );
  }

  const kpis = [
    {
      label : 'Capital adeudado',
      value : fmtCOP( carpeta.capital ),
      icon  : 'payments',
      accent: true,
      mono  : true
    },
    {
      label: 'Avalúo',
      value: carpeta.avaluo
        ? fmtCOP( carpeta.avaluo )
        : '—',
      icon: 'real_estate_agent',
      mono: true
    },
    {
      label    : 'Etapa procesal',
      value    : carpeta.etapa,
      icon     : 'flag',
      secondary: true
    },
    {
      label: 'Liquidación',
      value: carpeta.liquidacion
        ? fmtCOP( carpeta.liquidacion )
        : '—',
      icon: 'calculate',
      mono: true
    },
  ];

  const kvResumen: KV[] = [
    {
      k   : 'Número de carpeta',
      v   : String( carpeta.numero ),
      mono: true
    },
    {
      k   : 'Fecha de apertura',
      v   : fmtDate( carpeta.fecha ),
      mono: true
    },
    {
      k   : 'Llave de proceso',
      v   : carpeta.llaveProceso,
      mono: true
    },
    {
      k   : 'Radicado',
      v   : carpeta.radicado,
      mono: true
    },
    {
      k: 'Tipo de proceso',
      v: TIPO_PROCESO_LABEL[ carpeta.tipoProceso ]
    },
    {
      k: 'Ciudad',
      v: carpeta.ciudad
    },
    {
      k: 'Etapa procesal',
      v: carpeta.etapa
    },
    {
      k   : 'Capital adeudado',
      v   : fmtCOP( carpeta.capital ),
      mono: true
    },
    {
      k: 'Revisado',
      v: carpeta.revisado
        ? 'Sí'
        : 'No'
    },
  ];
  const kvDemanda: KV[] = [
    {
      k   : 'Radicado',
      v   : dem.radicado,
      mono: true
    },
    {
      k: 'Tipo de proceso',
      v: dem.tipoProceso
    },
    {
      k: 'Etapa procesal',
      v: dem.etapaProcesal
    },
    {
      k: 'Despacho',
      v: dem.despacho
    },
    {
      k: 'Departamento',
      v: dem.departamento
    },
    {
      k: 'Municipio',
      v: dem.municipio
    },
    {
      k   : 'Capital adeudado',
      v   : fmtCOP( dem.capitalAdeudado ),
      mono: true
    },
    {
      k: 'Avalúo',
      v: dem.avaluo
        ? fmtCOP( dem.avaluo )
        : '—',
      mono: true
    },
    {
      k: 'Liquidación',
      v: dem.liquidacion
        ? fmtCOP( dem.liquidacion )
        : '—',
      mono: true
    },
    {
      k   : 'Fecha de presentación',
      v   : fmtDate( dem.fechaPresentacion ),
      mono: true
    },
    {
      k   : 'Mandamiento de pago',
      v   : fmtDate( dem.mandamientoPago ),
      mono: true
    },
    {
      k   : 'Vencimiento pagaré',
      v   : fmtDate( dem.vencimientoPagare ),
      mono: true
    },
    {
      k   : 'Entrega de garantías',
      v   : fmtDate( dem.entregaGarantias ),
      mono: true
    },
    {
      k: 'Medida cautelar',
      v: dem.medidas.medidaSolicitada
    },
    {
      k   : 'Fecha ordena medida',
      v   : fmtDate( dem.medidas.fechaOrdena ),
      mono: true
    },
  ];
  const kvDeudor: KV[] = [
    {
      k: 'Nombre completo',
      v: deudorNombre( d )
    },
    {
      k   : 'Cédula / NIT',
      v   : d.cedula,
      mono: true
    },
    {
      k   : 'Teléfono celular',
      v   : d.telCelular ?? '—',
      mono: true
    },
    {
      k   : 'Teléfono fijo',
      v   : d.telFijo ?? '—',
      mono: true
    },
    {
      k: 'Correo electrónico',
      v: d.email ?? '—'
    },
    {
      k: 'Dirección',
      v: d.direccion ?? '—'
    },
  ];

  if ( carpeta.codeudor ) {
    kvDeudor.push(
      {
        k: 'Codeudor',
        v: carpeta.codeudor.nombre
      },
      {
        k   : 'Cédula codeudor',
        v   : carpeta.codeudor.cedula ?? '—',
        mono: true
      },
      {
        k   : 'Tel. codeudor',
        v   : carpeta.codeudor.telefono ?? '—',
        mono: true
      },
    );
  }

  const juzgadoKv: KV[] = [
    {
      k: 'Despacho',
      v: carpeta.juzgado.nombre
    },
    {
      k: 'Tipo',
      v: carpeta.juzgado.tipo
    },
    {
      k: 'Ciudad',
      v: carpeta.juzgado.ciudad
    },
    {
      k   : 'Portal',
      v   : carpeta.juzgado.url ?? '—',
      mono: true
    },
  ];
  const notifKv: KV[] = [
    {
      k: 'Certimail',
      v: dem.notif.certimail
        ? 'Enviado'
        : 'Pendiente'
    },
    {
      k: 'Físico',
      v: dem.notif.fisico
        ? 'Realizado'
        : 'Pendiente'
    },
    {
      k   : 'Auto notificado',
      v   : fmtDate( dem.notif.autoNotificado ),
      mono: true
    },
    {
      k: 'Medida',
      v: dem.medidas.medidaSolicitada
    },
  ];

  const TABS: { key: TabKey; label: string; icon: string; count?: number }[] = [
    {
      key  : 'resumen',
      label: 'Resumen',
      icon : 'description'
    },
    {
      key  : 'demanda',
      label: 'Demanda',
      icon : 'gavel'
    },
    {
      key  : 'deudor',
      label: 'Deudor',
      icon : 'person'
    },
    {
      key  : 'procesos',
      label: 'Procesos',
      icon : 'lan',
      count: carpeta.procesos.length
    },
    {
      key  : 'actuaciones',
      label: 'Actuaciones',
      icon : 'history',
      count: carpeta.actuaciones.length
    },
    {
      key  : 'facturas',
      label: 'Facturas',
      icon : 'receipt_long',
      count: carpeta.facturas.length
    },
    {
      key  : 'notas',
      label: 'Notas',
      icon : 'sticky_note_2',
      count: notas.length
    },
    {
      key  : 'tareas',
      label: 'Tareas',
      icon : 'checklist',
      count: tareas.filter( ( t ) => {
        return !t.done;
      } ).length
    },
  ];

  const isTabs = view === 'tabs';

  // -------- section renderers --------
  const KvGrid = ( {
    rows
  }: { rows: KV[] } ) => {
    return (
      <div className={styles.kvGrid}>
        {rows.map( ( i ) => {
          return (
            <div key={i.k} className={styles.kvItem}>
              <span className={styles.kvKey}>{i.k}</span>
              <span className={`${ styles.kvVal } ${ i.mono
                ? 'aj-mono'
                : '' }`}
              >{i.v}</span>
            </div>
          );
        } )}
      </div>
    );
  };

  const SecResumen = () => {
    return (
      <>
        <KvGrid rows={kvResumen} />
        <div className={styles.courtGrid}>
          <div>
            <div className={ styles.subhead }>
              <Icon name="account_balance" size={ 18 } />Juzgado</div>
            <div className={styles.factList}>
              {juzgadoKv.map( ( i ) => {
                return (
                  <div key={i.k} className={styles.factRow}><span>{i.k}</span><span className={i.mono
                    ? 'aj-mono'
                    : ''}
                  >{i.v}</span></div>
                );
              } )}
            </div>
          </div>
          <div>
            <div className={ styles.subhead }>
              <Icon name="mark_email_read" size={ 18 } />Notificación &amp; medidas</div>
            <div className={styles.factList}>
              {notifKv.map( ( i ) => {
                return (
                  <div key={i.k} className={styles.factRow}><span>{i.k}</span><span className={i.mono
                    ? 'aj-mono'
                    : ''}
                  >{i.v}</span></div>
                );
              } )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const SecDemanda = () => {
    return (
      <>
        <KvGrid rows={kvDemanda} />
        <div className={styles.obligaciones}>
          {dem.obligacion.map( ( o ) => {
            return <span key={o} className={`${ styles.obligacion } aj-mono`}>{o}</span>;
          } )}
        </div>
      </>
    );
  };

  const SecProcesos = () => {
    return (
      <div className={styles.stack}>
        {carpeta.procesos.map( ( p ) => {
          return (
            <div key={p.idProceso} className={styles.procCard}>
              <div className={styles.procHead}>
                <span className="aj-mono" style={{
                  color     : 'var(--primary)',
                  fontWeight: 600
                }}
                >{p.idProceso}</span>
                <span className={styles.priv}><Icon name={p.esPrivado
                  ? 'lock'
                  : 'public'} size={15}
                />{p.esPrivado
                  ? 'Privado'
                  : 'Público'}</span>
              </div>
              <div className={styles.procKv}>
                {[
                  {
                    k: 'Despacho',
                    v: p.despacho
                  },
                  {
                    k: 'Departamento',
                    v: p.departamento
                  },
                  {
                    k   : 'Fecha proceso',
                    v   : fmtDate( p.fechaProceso ),
                    mono: true
                  },
                  {
                    k   : 'Última actuación',
                    v   : fmtDate( p.fechaUltimaActuacion ),
                    mono: true
                  },
                  {
                    k   : 'Actuaciones',
                    v   : String( p.cantFilas ),
                    mono: true
                  },
                  {
                    k: 'Sujetos procesales',
                    v: p.sujetosProcesales
                  },
                ].map( ( i ) => {
                  return (
                    <div key={i.k} className={styles.kvItem}>
                      <span className={styles.kvKey}>{i.k}</span>
                      <span className={`${ styles.kvValSm } ${ i.mono
                        ? 'aj-mono'
                        : '' }`}
                      >{i.v}</span>
                    </div>
                  );
                } )}
              </div>
            </div>
          );
        } )}
      </div>
    );
  };

  const SecActuaciones = () => {
    return (
      <div className={styles.timeline}>
        {carpeta.actuaciones.map( ( a ) => {
          return (
            <div key={a.id} className={styles.tlRow}>
              <div className={styles.tlRail}>
                <span className={styles.tlDot} style={{
                  background: a.isUltima
                    ? 'var(--primary)'
                    : 'var(--outline)'
                }}
                />
                <span className={styles.tlLine} />
              </div>
              <div className={styles.tlBody}>
                <div className={styles.tlMeta}>
                  <span className="aj-mono">{fmtDate( a.fecha )}</span>
                  {a.conDocumentos && <span className={styles.tlDocs}><Icon name="attach_file" size={13} />documentos</span>}
                  {a.isUltima && <span className={styles.tlLast}>Última</span>}
                </div>
                <div className={styles.tlTitle}>{a.actuacion}</div>
                <div className={styles.tlNote}>{a.anotacion}</div>
              </div>
            </div>
          );
        } )}
      </div>
    );
  };

  const SecFacturas = () => {
    return (
      <div className={styles.stackSm}>
        {carpeta.facturas.map( ( f ) => {
          const pagada = f.estado === 'Pagada';

          return (
            <div key={f.id} className={styles.factura}>
              <Icon name="receipt_long" size={22} className={styles.facturaIcon} />
              <div className={styles.facturaInfo}>
                <span className={`aj-mono ${ styles.facturaId }`}>{f.id}</span>
                <span className={styles.facturaConcepto}>{f.concepto}</span>
                <span className={styles.facturaSub}>{f.razonSocial} · {fmtDate( f.fecha )}</span>
              </div>
              <span className={`${ styles.estado } ${ pagada
                ? styles.estadoPagada
                : styles.estadoPendiente }`}
              >{f.estado}</span>
              <span className={`aj-mono ${ styles.facturaTotal }`}>{fmtCOP( f.valorTotal )}</span>
            </div>
          );
        } )}
      </div>
    );
  };

  const SecNotas = () => {
    return (
      <div className={styles.stackSm}>
        {notas.map( ( n ) => {
          return (
            <div key={n.id} className={styles.nota}>
              <div className={styles.notaHead}><span>{n.text}</span><span className="aj-mono">{fmtDate( n.createdAt )}</span></div>
              {n.content.map( (
                line, i
              ) => {
                return <div key={i} className={styles.notaLine}>{line}</div>;
              } )}
              {n.dueDate && <div className={styles.notaDue}><Icon name="event" size={14} />{fmtDate( n.dueDate )}</div>}
            </div>
          );
        } )}
        <div className={styles.addRow}>
          <input value={newNota} onChange={( e ) => {
            return setNewNota( e.target.value );

          }} onKeyDown={( e ) => {
            return e.key === 'Enter' && addNota();
          }} placeholder="Agregar nota…" className={styles.addInput}
          />
          <button onClick={addNota} className={styles.addBtnSecondary}><Icon name="add" size={17} />Nota</button>
        </div>
      </div>
    );
  };

  const SecTareas = () => {
    return (
      <div className={styles.stackSm}>
        {tareas.map( ( t ) => {
          const over = !t.done && isOverdue( t.dueDate );

          return (
            <div key={t.id} className={styles.tarea}>
              <button className={`${ styles.checkbox } ${ t.done
                ? styles.checked
                : '' }`} onClick={() => {
                return toggleTarea( t.id );
              }} aria-label="Completar tarea"
              >
                {t.done && <Icon name="check" size={15} />}
              </button>
              <span className={`${ styles.tareaText } ${ t.done
                ? styles.tareaDone
                : '' }`}
              >{t.text}</span>
              <span className={`${ styles.tareaDue } ${ over
                ? styles.tareaOver
                : '' }`}
              ><Icon name="event" size={15} />{t.dueDate
                  ? fmtDate( t.dueDate )
                  : 'Sin fecha'}</span>
            </div>
          );
        } )}
        <div className={styles.addRow}>
          <input value={newTarea} onChange={( e ) => {
            return setNewTarea( e.target.value );
          }} onKeyDown={( e ) => {
            return e.key === 'Enter' && addTarea();
          }} placeholder="Agregar tarea…" className={styles.addInput}
          />
          <button onClick={addTarea} className={styles.addBtnPrimary}><Icon name="add" size={17} />Tarea</button>
        </div>
      </div>
    );
  };

  interface Section { key: string; icon: string; title: string; badge?: number; render: () => React.ReactNode; }
  const SECTIONS: Record<string, Section> = {
    resumen: {
      key   : 'resumen',
      icon  : 'description',
      title : 'Resumen del caso',
      render: SecResumen
    },
    demanda: {
      key   : 'demanda',
      icon  : 'gavel',
      title : 'Demanda',
      render: SecDemanda
    },
    deudor: {
      key  : 'deudor',
      icon : 'person',
      title: carpeta.codeudor
        ? 'Deudor y codeudor'
        : 'Deudor',
      render: () => {
        return <KvGrid rows={kvDeudor} />;
      }
    },
    procesos: {
      key   : 'procesos',
      icon  : 'lan',
      title : 'Procesos',
      badge : carpeta.procesos.length,
      render: SecProcesos
    },
    actuaciones: {
      key   : 'actuaciones',
      icon  : 'history',
      title : 'Actuaciones procesales',
      badge : carpeta.actuaciones.length,
      render: SecActuaciones
    },
    facturas: {
      key   : 'facturas',
      icon  : 'receipt_long',
      title : 'Facturación',
      badge : carpeta.facturas.length,
      render: SecFacturas
    },
    notas: {
      key   : 'notas',
      icon  : 'sticky_note_2',
      title : 'Notas',
      badge : notas.length,
      render: SecNotas
    },
    tareas: {
      key  : 'tareas',
      icon : 'checklist',
      title: 'Tareas',
      badge: tareas.filter( ( t ) => {
        return !t.done;
      } ).length,
      render: SecTareas
    },
  };

  const visibleSections = isTabs
    ? [
        SECTIONS[ tab ]
      ]
    : [
        SECTIONS.demanda,
        SECTIONS.deudor,
        SECTIONS.procesos,
        SECTIONS.actuaciones,
        SECTIONS.facturas,
        SECTIONS.notas,
        SECTIONS.tareas
      ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => {
          return router.push( '/carpetas' );
        }} title="Volver" aria-label="Volver"
        ><Icon name="arrow_back" /></button>
        <div className={styles.headerMain}>
          <div className={styles.headerCrumb}><span className="aj-mono">Carpeta N.º {carpeta.numero}</span> · <span className="aj-mono">{carpeta.radicado}</span></div>
          <h1 className={styles.headerTitle}>{carpeta.nombre}</h1>
          <div className={styles.headerTags}>
            <StatusChip status={carpeta.status} />
            <span className={styles.outlineTag} style={{
              color: meta.colorVar
            }}
            ><span className={styles.tagDot} style={{
                background: meta.colorVar
              }}
            />{meta.label}</span>
            <span className={styles.outlineTag}><Icon name="gavel" size={15} />{TIPO_PROCESO_LABEL[ carpeta.tipoProceso ]}</span>
            {carpeta.vencido && <span className={styles.vencido}><Icon name="warning" size={15} />Vencido</span>}
          </div>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.segmented}>
            {( [
              'tabs',
              'doc'
            ] as DetailView[] ).map( ( v ) => {
              return (
                <button key={v} className={`${ styles.segBtn } ${ view === v
                  ? styles.segActive
                  : '' }`} onClick={() => {
                  return setView( v );
                }} title={v === 'tabs'
                  ? 'Pestañas'
                  : 'Documento'}
                >
                  <Icon name={v === 'tabs'
                    ? 'tab'
                    : 'article'} size={19}
                  />
                </button>
              );
            } )}
          </div>
          <button className={styles.editBtn}><Icon name="edit" size={18} />Editar</button>
        </div>
      </div>

      {/* KPI mini */}
      <div className={styles.kpiRow}>
        {kpis.map( ( k ) => {
          return (
            <div key={k.label} className={styles.kpi} style={{
              background: k.accent
                ? 'color-mix(in srgb, var(--primary) 9%, var(--surface-container-lowest))'
                : k.secondary
                  ? 'color-mix(in srgb, var(--secondary) 9%, var(--surface-container-lowest))'
                  : 'var(--surface-container-lowest)'
            }}
            >
              <span className={styles.kpiLabel}><Icon name={k.icon} size={16} />{k.label}</span>
              <span className={`${ styles.kpiValue } ${ k.mono
                ? 'aj-mono'
                : '' }`}
              >{k.value}</span>
            </div>
          );
        } )}
      </div>

      {/* Tabs bar */}
      {isTabs && (
        <div className={styles.tabsBar}>
          {TABS.map( ( t ) => {
            return (
              <button key={t.key} className={`${ styles.tab } ${ tab === t.key
                ? styles.tabActive
                : '' }`} onClick={() => {
                return setTab( t.key );
              }}
              >
                <Icon name={t.icon} size={18} />{t.label}
                {t.count != null && <span className={`${ styles.tabCount } ${ tab === t.key
                  ? styles.tabCountActive
                  : '' }`}
                                    >{t.count}</span>}
              </button>
            );
          } )}
        </div>
      )}

      {/* Body */}
      <div className={isTabs
        ? styles.bodyTabs
        : styles.bodyDoc}
      >
        {/* Summary rail (doc view only) */}
        {!isTabs && (
          <aside className={styles.rail}>
            <div className={styles.railCard}>
              <div className={styles.railDeudor}>
                <span className={styles.railAvatar}>{deudorInitials( d )}</span>
                <div><div className={styles.railName}>{deudorNombre( d )}</div><div className="aj-mono" style={{
                  font : 'var(--type-body-sm)',
                  color: 'var(--on-surface-variant)'
                }}
                                                                               >C.C. {d.cedula}</div></div>
              </div>
              <hr className={styles.hr} />
              {[
                {
                  icon: 'call',
                  v   : d.telCelular ?? '—',
                  mono: true
                },
                {
                  icon: 'mail',
                  v   : d.email ?? '—'
                },
                {
                  icon: 'location_on',
                  v   : d.direccion ?? '—'
                }
              ].map( (
                c, i
              ) => {
                return (
                  <div key={i} className={styles.railContact}><Icon name={c.icon} size={18} /><span className={c.mono
                    ? 'aj-mono'
                    : ''}
                                                                                              >{c.v}</span></div>
                );
              } )}
            </div>
            <div className={styles.railFacts}>
              <span className={styles.overline}>Datos clave</span>
              {[
                {
                  k   : 'Capital',
                  v   : fmtCOP( carpeta.capital ),
                  mono: true
                },
                {
                  k: 'Avalúo',
                  v: carpeta.avaluo
                    ? fmtCOP( carpeta.avaluo )
                    : '—',
                  mono: true
                },
                {
                  k: 'Etapa',
                  v: carpeta.etapa
                },
                {
                  k: 'Tipo',
                  v: TIPO_PROCESO_LABEL[ carpeta.tipoProceso ]
                },
                {
                  k: 'Ciudad',
                  v: carpeta.ciudad
                },
                {
                  k   : 'Llave',
                  v   : carpeta.llaveProceso,
                  mono: true
                },
              ].map( ( f ) => {
                return (
                  <div key={f.k} className={styles.factRow}><span>{f.k}</span><span className={f.mono
                    ? 'aj-mono'
                    : ''}
                                                                              >{f.v}</span></div>
                );
              } )}
            </div>
          </aside>
        )}

        {/* Sections */}
        <div className={styles.sections}>
          {visibleSections.map( ( sec ) => {
            return (
              <section key={sec.key} className={styles.section}>
                <div className={styles.sectionHead}>
                  <Icon name={sec.icon} size={20} className={styles.sectionIcon} />
                  <h2 className={styles.sectionTitle}>{sec.title}</h2>
                  {sec.badge != null && <span className={styles.sectionBadge}>{sec.badge}</span>}
                </div>
                <div className={styles.sectionBody}>{sec.render()}</div>
              </section>
            );
          } )}
        </div>
      </div>
    </div>
  );
}
