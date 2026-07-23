import Link from 'next/link';
import Image from 'next/image';
import { Route } from 'next';
import { Suspense } from 'react';
import { getCurrentLawyer } from '#@/lib/auth/session';
import styles from './page.module.css';

const SERVICES = [
  {
    icon       : 'account_balance',
    title      : 'Litigio bancario',
    description: 'Representación de entidades financieras en procesos ejecutivos singulares y con garantía.',
  },
  {
    icon       : 'home_work',
    title      : 'Procesos hipotecarios',
    description: 'Ejecución de garantías reales, avalúos y remates con trazabilidad completa.',
  },
  {
    icon       : 'handshake',
    title      : 'Insolvencia y reorganización',
    description: 'Defensa de acreedores en procesos de insolvencia empresarial y de persona natural.',
  },
  {
    icon       : 'gavel',
    title      : 'Cobro de cartera',
    description: 'Gestión integral de cartera vencida, desde la liquidación del crédito hasta el pago total.',
  },
];

const STATS: [string, string][] = [
  [
    '+800',
    'Procesos gestionados'
  ],
  [
    '$ 312 MM',
    'Cartera recuperada'
  ],
  [
    '18 años',
    'De ejercicio'
  ],
];

const NAV_LINKS = [
  {
    label: 'Ser',
    href : '#servicios'
  },
  {
    label: 'Firma',
    href : '#'
  },
  {
    label: 'Contacto',
    href : '#contacto'
  },
  {
    label: 'Panel de control',
    href : '/dashboard'
  },
];

const DASHBOARD_HREF: Route = '/dashboard';

async function IdentityArea() {
  const lawyer = await getCurrentLawyer();

  if ( !lawyer ) {
    return (
      <Link
        href="/auth"
        className={styles.signInLink}
      >
        {'Iniciar sesión'}
      </Link>
    );
  }

  return (
    <Link
      href={DASHBOARD_HREF}
      className={styles.identity}
    >
      {lawyer.avatarUrl
        ? (
            <img
              src={lawyer.avatarUrl}
              alt=""
              width={28}
              height={28}
              className={styles.avatar}
            />
          )
        : <span className={styles.avatar} aria-hidden="true" />}
      <span className={styles.identityName}>{lawyer.nombre}</span>
    </Link>
  );
}

function IdentityAreaFallback() {
  return <span className={styles.identityPlaceholder} aria-hidden="true" />;
}

export default function Page() {
  return (
    <>
      <header className={styles.siteHeader}>
        <img
          src="/icon.png"
          alt="R&S"
          className={styles.brandMark}
        />
        <span className={styles.brandName}>{'R&S Asesoría Jurídica'}</span>
        <nav
          className={styles.nav}
          aria-label="Secciones"
        >
          {NAV_LINKS.map( ( {
            label, href
          } ) => {
            return (
              <a
                key={label}
                href={href}
                className={styles.navLink}
              >
                {label}
              </a>
            );
          } )}
        </nav>
        <Suspense fallback={<IdentityAreaFallback />}>
          <IdentityArea />
        </Suspense>
        <a
          href="#contacto"
          className={styles.ctaButton}
        >
          {'Agendar consulta'}
        </a>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>
                {'Litigio bancario · Cobro de cartera'}
              </span>
              <h1 className={styles.heroTitle}>
                {'Recuperamos su cartera con rigor y calma.'}
              </h1>
              <p className={styles.heroBody}>
                {
                  'Acompañamos a entidades financieras en procesos ejecutivos, hipotecarios y de insolvencia. Estrategia clara, expedientes al día y comunicación transparente en cada etapa.'
                }
              </p>
              <div className={styles.heroActions}>
                <a
                  href="#contacto"
                  className={styles.ctaButton}
                >
                  {'Solicitar evaluación'}
                  <span className="material-symbols-rounded">{'arrow_forward'}</span>
                </a>
                <a
                  href="#servicios"
                  className={styles.outlinedButton}
                >
                  {'Conocer la firma'}
                </a>
              </div>
              <div className={styles.statsRow}>
                {STATS.map( ( [
                  value,
                  label
                ] ) => {
                  return (
                    <div key={label}>
                      <div className={styles.statValue}>{value}</div>
                      <div className={styles.statLabel}>{label}</div>
                    </div>
                  );
                } )}
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroCard}>
                <Image
                  src="/icon.png"
                  alt="R&S"
                  width={140}
                  height={140}
                  className={styles.heroCardLogo}
                />
                <div className={styles.heroCardBanner}>
                  <div className={styles.heroCardOverline}>
                    {'Última actuación'}
                  </div>
                  <div className={styles.heroCardTitle}>
                    {'Mandamiento de pago librado'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="servicios"
          className={styles.services}
        >
          <div className={styles.sectionInner}>
            <div className={styles.eyebrow}>{'Servicios'}</div>
            <h2 className={styles.servicesTitle}>
              {'Una práctica enfocada en recuperar lo que se le adeuda.'}
            </h2>
            <div className={styles.servicesGrid}>
              {SERVICES.map( ( service ) => {
                return (
                  <div
                    key={service.title}
                    className={styles.serviceCard}
                  >
                    <span className={styles.serviceIcon}>
                      <span className="material-symbols-rounded">{service.icon}</span>
                    </span>
                    <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                    <p className={styles.serviceCardDescription}>
                      {service.description}
                    </p>
                  </div>
                );
              } )}
            </div>
          </div>
        </section>

        <section
          id="contacto"
          className={styles.ctaSection}
        >
          <div className={styles.ctaBanner}>
            <h2 className={styles.ctaTitle}>{'¿Tiene cartera por recuperar?'}</h2>
            <p className={styles.ctaBody}>
              {
                'Cuéntenos su caso. Evaluamos la viabilidad del proceso sin costo y le proponemos una estrategia en 48 horas.'
              }
            </p>
            <a
              href="mailto:contacto@rsasesorjuridico.com"
              className={styles.ctaBannerButton}
            >
              {'Agendar una consulta'}
              <span className="material-symbols-rounded">{'arrow_forward'}</span>
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.siteFooter}>
        <img
          src="/icon.png"
          alt="R&S"
          className={styles.footerMark}
        />
        <span className={styles.footerText}>
          {'R&S Asesoría Jurídica S.A.S · NIT 900.848.824-7 · Bogotá, Colombia'}
        </span>
        <span className={styles.footerCopyright}>
          {'© 2026 — Todos los derechos reservados'}
        </span>
      </footer>
    </>
  );
}
