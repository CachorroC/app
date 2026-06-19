'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CarpetasDashboard.module.css';
import Sidebar from '#@/components/Sidebar/Sidebar';
import { Icon, StatusChip } from '#@/components/ui';
import { fmtCOP, fmtMoneyShort, fmtDate, CATEGORY_META, TIPO_PROCESO_LABEL, STATUS_META, } from '@/lib/format';
import { Category, type Carpeta, type DashboardView } from '#@/lib/types';
import { useCarpetaSort } from '#@/app/Context/carpetas-sort-context';

type SortKey = 'numero' | 'fecha' | 'nombre' | 'category' | 'etapa' | 'capital';
type SortDir = 'asc' | 'desc';

interface Column { key: string; label: string; align: 'left' | 'right' | 'center'; sortable?: SortKey; }

const COLUMNS: Column[] = [
  {
    key     : 'numero',
    label   : 'N.º',
    align   : 'left',
    sortable: 'numero'
  },
  {
    key     : 'fecha',
    label   : 'Fecha',
    align   : 'left',
    sortable: 'fecha'
  },
  {
    key     : 'nombre',
    label   : 'Carpeta',
    align   : 'left',
    sortable: 'nombre'
  },
  {
    key     : 'category',
    label   : 'Categoría',
    align   : 'left',
    sortable: 'category'
  },
  {
    key  : 'llave',
    label: 'Llave proceso',
    align: 'left'
  },
  {
    key     : 'etapa',
    label   : 'Etapa procesal',
    align   : 'left',
    sortable: 'etapa'
  },
  {
    key  : 'ult',
    label: 'Última actuación / anotación',
    align: 'left'
  },
  {
    key     : 'capital',
    label   : 'Capital',
    align   : 'right',
    sortable: 'capital'
  },
  {
    key  : 'estado',
    label: 'Estado',
    align: 'left'
  },
  {
    key  : 'rev',
    label: 'Rev.',
    align: 'center'
  },
];

export default function CarpetasDashboard() {
  const {
    carpetas: initialCarpetas
  } = useCarpetaSort();


  const router = useRouter();

  const [
    carpetas,
    setCarpetas
  ] = useState( initialCarpetas );

  const [
    theme,
    setTheme
  ] = useState<'light' | 'dark'>( 'light' );

  const [
    view,
    setView
  ] = useState<DashboardView>( 'tabla' );

  const [
    category,
    setCategory
  ] = useState<Category | 'todos'>( 'todos' );

  const [
    search,
    setSearch
  ] = useState( '' );

  const [
    sortKey,
    setSortKey
  ] = useState<SortKey>( 'fecha' );

  const [
    sortDir,
    setSortDir
  ] = useState<SortDir>( 'desc' );

  const [
    isMobile,
    setIsMobile
  ] = useState( false );

  const [
    navOpen,
    setNavOpen
  ] = useState( false );

  useEffect(
    () => {
      const mq = window.matchMedia( '(max-width: 768px)' );

      const onChange = () => {
        setIsMobile( mq.matches );
        setNavOpen( false );
      };

      onChange();
      mq.addEventListener(
        'change', onChange
      );

      return () => {
        return mq.removeEventListener(
          'change', onChange
        );
      };
    }, []
  );

  // On phones the dense table is unusable — always show cards.
  const effectiveView: DashboardView = isMobile
    ? 'tarjetas'
    : view;

  function toggleTheme() {
    const next = theme === 'dark'
      ? 'light'
      : 'dark';

    setTheme( next );
    document.documentElement.dataset.theme = next;
  }

  function openDetail( numero: number ) {
    setNavOpen( false );
    router.push( `/carpetas/${ numero }` );
  }

  function toggleRevisado(
    numero: number, e: MouseEvent
  ) {
    e.stopPropagation();
    setCarpetas( ( prev ) => {
      return prev.map( ( c ) => {
        return ( c.numero === numero
          ? {
              ...c,
              revisado: !c.revisado
            }
          : c );
      } );
    } );
  }

  function setSort( key: SortKey ) {
    if ( sortKey === key ) {
      setSortDir( ( d ) => {
        return ( d === 'asc'
          ? 'desc'
          : 'asc' );
      } );
    } else {
      setSortKey( key );
      setSortDir( 'asc' );
    }
  }

  const stats = useMemo(
    () => {
      const activas = carpetas.filter( ( c ) => {
        return !c.terminado;
      } ).length;

      const totalCap = carpetas.reduce(
        (
          s, c
        ) => {
          return s + ( c.category === 'Terminado'
            ? 0
            : c.demanda.capitalAdeudado ?? 1 );
        }, 0
      );

      const porRevisar = carpetas.filter( ( c ) => {
        return !c.revisado && !c.terminado;
      } ).length;

      const vencidos = carpetas.filter( ( c ) => {
        return c.vencido;
      } ).length;

      const bancol = carpetas.filter( ( c ) => {
        return c.category === Category.Bancolombia;
      } ).length;

      return [
        {
          label: 'Carpetas activas',
          value: String( activas ),
          sub  : `${ carpetas.length } en total`,
          icon : 'folder_open',
          bg   : 'var(--primary-container)',
          fg   : 'var(--on-primary-container)',
          mono : false
        },
        {
          label: 'Capital en gestión',
          value: fmtMoneyShort( totalCap ),
          sub  : 'Procesos activos',
          icon : 'payments',
          bg   : 'var(--tertiary-container)',
          fg   : 'var(--on-tertiary-container)',
          mono : true
        },
        {
          label: 'Bancolombia',
          value: String( bancol ),
          sub  : 'Cliente prioritario',
          icon : 'account_balance',
          bg   : 'color-mix(in srgb, var(--cat-bancolombia) 22%, var(--surface))',
          fg   : 'var(--cat-bancolombia)',
          mono : false
        },
        {
          label: 'Por revisar · vencidos',
          value: `${ porRevisar } · ${ vencidos }`,
          sub  : 'Requieren atención',
          icon : 'warning',
          bg   : 'var(--status-overdue-container)',
          fg   : 'var(--on-error-container)',
          mono : false
        },
      ];
    }, [
      carpetas
    ]
  );

  const counts = useMemo(
    () => {
      const c: Record<string, number> = {
        todos: carpetas.length
      };

      carpetas.forEach( ( k ) => {
        c[ k.category ] = ( c[ k.category ] ?? 0 ) + 1;
      } );

      return c;
    }, [
      carpetas
    ]
  );

  const rows = useMemo(
    () => {
      const q = search.toLowerCase();

      const filtered = carpetas.filter( ( c ) => {
        const mc = category === 'todos' || c.category === category;

        const mq = !q || c.nombre.toLowerCase()
          .includes( q ) || String( c.numero )
          .includes( q )
        || c.llaveProceso.toLowerCase()
          .includes( q ) || c.radicado.toLowerCase()
          .includes( q );

        return mc && mq;
      } );

      const dir = sortDir === 'asc'
        ? 1
        : -1;

      return [
        ...filtered
      ].sort( (
        a, b
      ) => {
        const av = a[ sortKey ];

        const bv = b[ sortKey ];

        const x = typeof av === 'string'
          ? av.toLowerCase()
          : av;

        const y = typeof bv === 'string'
          ? bv.toLowerCase()
          : bv;

        return x < y
          ? -dir
          : x > y
            ? dir
            : 0;
      } );
    }, [
      carpetas,
      category,
      search,
      sortKey,
      sortDir
    ]
  );

  const categoryChips: ( Category | 'todos' )[] = [
    'todos',
    ...( Object.keys( CATEGORY_META ) as Category[] ).filter( ( k ) => {
      return counts[ k ];
    } )
  ];

  return (
    <div className={styles.app}>
      <Sidebar carpetas={carpetas} activeCategory={category} onSelectCategory={setCategory} theme={theme} onToggleTheme={toggleTheme} open={navOpen} onClose={() => {
        return setNavOpen( false );
      }} />

      <main className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.hamburger} onClick={() => {
            return setNavOpen( true );
          }} aria-label="Abrir menú">
            <Icon name="menu" size={24} />
          </button>
          <div className={styles.titleBlock}>
            <span className={styles.crumb}>Inicio · Asesor Jurídico</span>
            <h1 className={styles.title}>Carpetas</h1>
          </div>

          <label className={styles.search}>
            <Icon name="search" size={20} />
            <input
              value={search}
              onChange={( e ) => {
                return setSearch( e.target.value );
              }}
              placeholder="Buscar por nombre, número o llave de proceso…"
            />
          </label>

          <div className={styles.topActions}>
            <div className={`${ styles.segmented } ${ styles.dashSwitch }`}>
              {( [
                'tabla',
                'tarjetas'
              ] as DashboardView[] ).map( ( v ) => {
                return (
                  <button
                    key={v}
                    className={`${ styles.segBtn } ${ view === v
                      ? styles.segActive
                      : '' }`}
                    onClick={() => {
                      return setView( v );
                    }}
                    title={v === 'tabla'
                      ? 'Tabla'
                      : 'Tarjetas'}
                  >
                    <Icon name={v === 'tabla'
                      ? 'table_rows'
                      : 'grid_view'} size={19} />
                  </button>
                );
              } )}
            </div>
            <button className={styles.primaryBtn}><Icon name="add" size={19} />Nueva carpeta</button>
          </div>
        </header>

        <div className={styles.scroll}>
          {/* KPI strip */}
          <section className={styles.kpiGrid}>
            {stats.map( ( s ) => {
              return (
                <div key={s.label} className={styles.kpiCard}>
                  <div className={styles.kpiHead}>
                    <span className={styles.kpiLabel}>{s.label}</span>
                    <span className={styles.kpiIcon} style={{
                      background: s.bg,
                      color     : s.fg
                    }}><Icon name={s.icon} size={20} /></span>
                  </div>
                  <span className={`${ styles.kpiValue } ${ s.mono
                    ? 'aj-mono'
                    : '' }`}>{s.value}</span>
                  <span className={styles.kpiSub}>{s.sub}</span>
                </div>
              );
            } )}
          </section>

          {/* Filter chips */}
          <div className={styles.chipRow}>
            {categoryChips.map( ( key ) => {
              const meta = key === 'todos'
                ? null
                : CATEGORY_META[ key ];

              const selected = category === key;

              return (
                <button
                  key={key}
                  className={`${ styles.chip } ${ selected
                    ? styles.chipActive
                    : '' }`}
                  onClick={() => {
                    return setCategory( key );
                  }}
                >
                  <span className={styles.chipDot} style={{
                    background: meta?.colorVar ?? 'var(--outline)'
                  }} />
                  {key === 'todos'
                    ? 'Todos'
                    : meta!.label}
                  <span className={styles.chipCount}>{counts[ key ]}</span>
                </button>
              );
            } )}
            <span className={styles.resultCount}>{rows.length} de {carpetas.length} carpetas</span>
          </div>

          {/* Table (desktop / tablet) */}
          {effectiveView === 'tabla' && (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {COLUMNS.map( ( col ) => {
                      return (
                        <th
                          key={col.key}
                          className={`${ styles.th } ${ col.align === 'right'
                            ? styles.right
                            : col.align === 'center'
                              ? styles.center
                              : '' } ${ col.key === 'ult'
                            ? styles.thDivider
                            : '' } ${ col.sortable
                            ? styles.sortable
                            : '' }`}
                          onClick={col.sortable
                            ? () => {
                                return setSort( col.sortable! );
                              }
                            : undefined}
                        >
                          <span className={styles.thInner}>
                            {col.label}
                            {sortKey === col.sortable && <Icon name={sortDir === 'asc'
                              ? 'arrow_upward'
                              : 'arrow_downward'} size={16} />}
                          </span>
                        </th>
                      );
                    } )}
                  </tr>
                </thead>
                <tbody>
                  {rows.map( ( c ) => {
                    const meta = CATEGORY_META[ c.category ];

                    const last = c.actuaciones[ 0 ];

                    return (
                      <tr key={c.numero} className={c.terminado
                        ? styles.rowDone
                        : ''} onClick={() => {
                        return openDetail( c.numero );
                      }}>
                        <td className={`${ styles.td } aj-mono ${ styles.dim }`}>{c.numero}</td>
                        <td className={`${ styles.td } aj-mono ${ styles.dim } ${ styles.nowrap }`}>{fmtDate( c.fecha )}</td>
                        <td className={styles.td}>
                          <div className={styles.nameCell}>
                            <span className={styles.name}>{c.nombre}</span>
                            <span className={styles.sub}>{TIPO_PROCESO_LABEL[ c.tipoProceso ]}</span>
                          </div>
                        </td>
                        <td className={styles.td}>
                          <span className={styles.catTag} style={{
                            color: meta.colorVar
                          }}>
                            <span className={styles.catDot} style={{
                              background: meta.colorVar
                            }} />{meta.label}
                          </span>
                        </td>
                        <td className={`${ styles.td } aj-mono ${ styles.dim } ${ styles.tiny } ${ styles.nowrap }`}>{c.llaveProceso}</td>
                        <td className={styles.td}><span className={styles.etapaTag}>{c.etapa}</span></td>
                        <td className={`${ styles.td } ${ styles.tdDivider }`}>
                          <div className={styles.actCell}>
                            <span className={styles.actTitle}>
                              {last.actuacion}
                              {last.conDocumentos && <Icon name="attach_file" size={14} className={styles.attach} />}
                            </span>
                            <span className={styles.actNote}>{last.anotacion}</span>
                          </div>
                        </td>
                        <td className={`${ styles.td } aj-mono ${ styles.right } ${ styles.capital }`}>{c.capital
                          ? fmtCOP( c.capital )
                          : '—'}</td>
                        <td className={styles.td}><StatusChip status={c.status} /></td>
                        <td className={`${ styles.td } ${ styles.center }`}>
                          <button
                            className={styles.revBtn}
                            style={{
                              color: c.revisado
                                ? 'var(--status-done)'
                                : 'var(--outline)'
                            }}
                            onClick={( e ) => {
                              return toggleRevisado(
                                c.numero, e
                              );
                            }}
                            title="Marcar revisado"
                            aria-label="Marcar revisado"
                          >
                            <Icon name={c.revisado
                              ? 'task_alt'
                              : 'radio_button_unchecked'} fill={c.revisado} size={19} />
                          </button>
                        </td>
                      </tr>
                    );
                  } )}
                </tbody>
              </table>
            </div>
          )}

          {/* Card grid (also the forced view on phones) */}
          {effectiveView === 'tarjetas' && (
            <div className={styles.cardGrid}>
              {rows.map( ( c ) => {
                const meta = CATEGORY_META[ c.category ];

                const last = c.actuaciones[ 0 ];

                return (
                  <article key={c.numero} className={styles.card} onClick={() => {
                    return openDetail( c.numero );
                  }}>
                    <span className={styles.cardAccent} style={{
                      background: meta.colorVar
                    }} />
                    <div className={styles.cardBody}>
                      <div className={styles.cardHead}>
                        <div className={styles.cardTitleBlock}>
                          <span className={styles.cardMeta}>
                            <span className="aj-mono">N.º {c.numero}</span> · <span className="aj-mono">{fmtDate( c.fecha )}</span>
                          </span>
                          <span className={styles.cardTitle}>{c.nombre}</span>
                        </div>
                        <StatusChip status={c.status} />
                      </div>
                      <div className={styles.cardCat}>
                        <span className={styles.catTag} style={{
                          color: meta.colorVar
                        }}>
                          <span className={styles.catDot} style={{
                            background: meta.colorVar
                          }} />{meta.label}
                        </span>
                        <span className={styles.sub}>· {TIPO_PROCESO_LABEL[ c.tipoProceso ]}</span>
                      </div>
                      <div className={styles.cardKey}><Icon name="vpn_key" size={15} /><span className="aj-mono">{c.llaveProceso}</span></div>
                      <div className={styles.cardAct}>
                        <span className={styles.overline}>Última actuación</span>
                        <span className={styles.actTitle}>{last.actuacion}</span>
                        <span className={styles.actNote}>{last.anotacion}</span>
                      </div>
                      <div className={styles.cardFoot}>
                        <div className={styles.cardCapital}>
                          <span className={styles.overline}>Capital</span>
                          <span className="aj-mono">{c.capital
                            ? fmtCOP( c.capital )
                            : '—'}</span>
                        </div>
                        <span className={styles.etapaTag}><Icon name="flag" size={15} />{c.etapa}</span>
                      </div>
                    </div>
                  </article>
                );
              } )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
