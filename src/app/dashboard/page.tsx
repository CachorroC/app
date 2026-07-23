import layout from '#@/styles/layout.module.css';
import styles from './page.module.css';
import Link from 'next/link';
import { Route } from 'next';
import { Suspense } from 'react';
import { connection } from 'next/server';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { Calendar } from '#@/components/Calendar/main';
import { PushNotificationManager,
  InstallPrompt, } from '#@/components/pushNotificationManager';
import { Loader } from '#@/components/Loader/main-loader';
import { IntCarpeta } from '#@/lib/types/carpetas';

const BOGOTA_TZ = 'America/Bogota';

const CARPETAS_HREF: Route = '/dashboard/Carpetas';
const MEMORIALES_HREF: Route = '/dashboard/memoriales';
const AMORTIZACION_HREF: Route = '/dashboard/amortizacion';

const CATEGORY_CHIP: Record<string, { label: string; className: string }> = {
  Bancolombia: {
    label    : 'Bancolombia',
    className: styles.chipBancolombia,
  },
  Reintegra: {
    label    : 'Reintegra',
    className: styles.chipReintegra,
  },
  Insolvencia: {
    label    : 'Insolvencia',
    className: styles.chipInsolvencia,
  },
  LiosJuridicos: {
    label    : 'Líos Jurídicos',
    className: styles.chipLiosJuridicos,
  },
  Terminados: {
    label    : 'Terminados',
    className: styles.chipTerminados,
  },
};

function categoryChip( category: string ) {
  return (
    CATEGORY_CHIP[ category ] ?? {
      label    : 'Sin categoría',
      className: styles.chipNeutral,
    }
  );
}

function greetingFor( hour: number ) {
  if ( hour < 12 ) {
    return 'Buenos días';
  }

  if ( hour < 19 ) {
    return 'Buenas tardes';
  }

  return 'Buenas noches';
}

export default async function Page() {
  await connection();

  const carpetas = await getCarpetas();

  const now = new Date();
  const hour = Number( new Intl.DateTimeFormat(
    'es-CO', {
      timeZone: BOGOTA_TZ,
      hour    : 'numeric',
      hour12  : false,
    }
  )
    .format( now ), );
  const todayLabel = new Intl.DateTimeFormat(
    'es-CO', {
      timeZone: BOGOTA_TZ,
      weekday : 'long',
      day     : 'numeric',
      month   : 'long',
    }
  )
    .format( now );

  const total = carpetas.length;
  const pendientes = carpetas.filter( ( c ) => {
    return !c.revisado && !c.terminado;
  } ).length;
  const terminados = carpetas.filter( ( c ) => {
    return c.terminado;
  } ).length;
  const notas = carpetas.reduce(
    (
      acc, c
    ) => {
      return acc + c.notas.length;
    }, 0
  );

  const activity = carpetas
    .filter( ( c, ): c is IntCarpeta & {
      ultimaActuacion: NonNullable<IntCarpeta['ultimaActuacion']>;
    } => {
      return Boolean( c.ultimaActuacion?.fechaActuacion );
    }, )
    .sort( (
      a, b
    ) => {
      return (
        b.ultimaActuacion.fechaActuacion.getTime()
        - a.ultimaActuacion.fechaActuacion.getTime()
      );
    } )
    .slice(
      0, 6
    );

  const stats = [
    {
      icon : 'folder_managed',
      label: 'Total carpetas',
      value: total,
    },
    {
      icon : 'pending_actions',
      label: 'Pendientes',
      value: pendientes,
    },
    {
      icon : 'task_alt',
      label: 'Terminados',
      value: terminados,
    },
    {
      icon : 'sticky_note_2',
      label: 'Notas registradas',
      value: notas,
    },
  ];

  return ( <>
    <div className={layout.leftGrid}>
      <div className={styles.page}>
        <header className={styles.header}>
          <img
            src="/icon.png"
            alt="R&S"
            className={styles.brandIcon}
          />
          <div className={styles.brandText}>
            <p className={styles.brandTitle}>{'R&S Asesoría Jurídica'}</p>
            <p className={styles.brandSubtitle}>{'Panel principal'}</p>
          </div>
          <span className={styles.today}>{todayLabel}</span>
        </header>

        <div className={styles.greeting}>
          <h1
            className={styles.greetingTitle}
          >{`${ greetingFor( hour ) }, equipo`}</h1>
          <p className={styles.greetingSummary}>
            {`${ total } carpetas en gestión · ${ pendientes } pendientes de revisión`}
          </p>
        </div>

        <div className={styles.statsGrid}>
          {stats.map( ( stat ) => {
            return (
              <div
                key={stat.label}
                className={styles.statCard}
              >
                <div className={styles.statLabelRow}>
                  <span className="material-symbols-rounded">{stat.icon}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
                <div className={styles.statValue}>{stat.value}</div>
              </div>
            );
          } )}
        </div>

        <div className={styles.navCards}>
          <Link
            href={CARPETAS_HREF}
            className={`${ styles.navCard } ${ styles.navCardPrimary }`}
          >
            <div className={styles.navCardIcon}>
              <span className="material-symbols-rounded">folder_managed</span>
            </div>
            <h2 className={styles.navCardTitle}>{'Carpetas'}</h2>
            <p className={styles.navCardDescription}>
              {
                'Consulte, filtre y actualice el estado de todos los expedientes en gestión.'
              }
            </p>
            <span className={styles.navCardCta}>
              {'Ir a Carpetas'}
              <span className="material-symbols-rounded">arrow_forward</span>
            </span>
          </Link>
          <Link
            href={MEMORIALES_HREF}
            className={`${ styles.navCard } ${ styles.navCardTertiary }`}
          >
            <div className={styles.navCardIcon}>
              <span className="material-symbols-rounded">description</span>
            </div>
            <h2 className={styles.navCardTitle}>{'Memoriales'}</h2>
            <p className={styles.navCardDescription}>
              {
                'Genere memoriales a partir de las plantillas del despacho y descargue el .docx.'
              }
            </p>
            <span className={styles.navCardCta}>
              {'Ir a Memoriales'}
              <span className="material-symbols-rounded">arrow_forward</span>
            </span>
          </Link>
          <Link
            href={AMORTIZACION_HREF}
            className={`${ styles.navCard } ${ styles.navCardTertiary }`}
          >
            <div className={styles.navCardIcon}>
              <span className="material-symbols-rounded">description</span>
            </div>
            <h2 className={styles.navCardTitle}>{'Amortización'}</h2>
            <p className={styles.navCardDescription}>
              {
                'Calculadora para planes de amortizacion de deudas y créditos, con exportación a Excel.'
              }
            </p>
            <span className={styles.navCardCta}>
              {'Ir a Amortización'}
              <span className="material-symbols-rounded">arrow_forward</span>
            </span>
          </Link>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {'Actividad reciente de los juzgados'}
            </h2>
            <Link
              href={CARPETAS_HREF}
              className={styles.sectionLink}
            >
              {'Ver todas'}
              <span className="material-symbols-rounded">arrow_forward</span>
            </Link>
          </div>

          {activity.length === 0
            ? (
                <div className={styles.emptyState}>
                  {'Aún no hay actuaciones registradas.'}
                </div>
              )
            : (
                <div className={styles.activityList}>
                  {activity.map( ( carpeta ) => {
                    const chip = categoryChip( carpeta.category );
                    const fecha = new Intl.DateTimeFormat(
                      'es-CO', {
                        timeZone: BOGOTA_TZ,
                        day     : '2-digit',
                        month   : 'short',
                        year    : 'numeric',
                      }
                    )
                      .format( carpeta.ultimaActuacion.fechaActuacion );

                    const carpetaHref: Route<`/dashboard/Carpeta/${number}`> = `/dashboard/Carpeta/${ carpeta.numero }`;

                    return (
                      <Link
                        key={carpeta.numero}
                        href={carpetaHref}
                        className={styles.activityRow}
                      >
                        <span className={`${ styles.chip } ${ chip.className }`}>
                          {chip.label}
                        </span>
                        <div className={styles.activityBody}>
                          <div className={styles.activityNombre}>
                            {carpeta.nombre.trim() || `Carpeta ${ carpeta.numero }`}
                          </div>
                          <div className={styles.activityActuacion}>
                            {carpeta.ultimaActuacion.actuacion
                          || 'Sin actuación registrada'}
                          </div>
                        </div>
                        <span className={styles.activityDate}>{fecha}</span>
                      </Link>
                    );
                  } )}
                </div>
              )}
        </div>


        <InstallPrompt />

        <footer className={styles.footer}>
          <span className={styles.footerText}>
            {'R&S Asesoría Jurídica S.A.S · Uso interno'}
          </span>
        </footer>
      </div>
    </div>
    <div className={ layout.right}>
      <div className={styles.toolsPanel}>
        <div className={styles.toolCard}>
          <h3 className={styles.toolCardTitle}>{'Notificaciones'}</h3>
          <Suspense fallback={<Loader />}>
            <PushNotificationManager />
          </Suspense>
        </div>
        <div className={styles.toolCard}>
          <h3 className={styles.toolCardTitle}>{'Calendario'}</h3>
          <Suspense fallback={<Loader />}>
            <Calendar />
          </Suspense>
        </div>
      </div>
    </div>
  </>
  );
}
