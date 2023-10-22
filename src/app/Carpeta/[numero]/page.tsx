
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import button from '#@/components/Buttons/buttons.module.css';
import { fixFechas, fixMoney } from '#@/lib/project/helper';
import typography from '#@/styles/fonts/typography.module.css';
import type { Route } from 'next';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import styles from './styles.module.css';
import { Fragment, Suspense } from 'react';
import layout from '#@/styles/layout.module.css';
import { Loader } from '#@/components/Loader';
import { ProcesosComponent } from '#@/components/Proceso/server-components';
import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';

export default async function Page(
  {
    params
  }: { params: { numero: string } }
) {
  const carpeta = await getCarpetabyNumero(
    Number(
      params.numero
    )
  );

  if ( !carpeta ) {
    return notFound();
  }

  const {
    deudor, demanda,  category, tipoProceso, idProcesos
  } = carpeta;

  const {
    tel, email, cedula
  } = deudor;

  const {
    juzgados
  } = demanda;

  let idProcesoContent;

  if ( idProcesos && idProcesos.length > 0 ) {

    idProcesoContent = idProcesos.map(
      (
        idProceso
      ) => {
        return (
          <Link
            key={idProceso}
            href={`/Carpeta/${ params.numero }/ultimasActuaciones/${ idProceso }` as Route}
          >

          </Link>
        );
      }
    );
  }

  return (
    <>{/*
      <Snackbar text={ 'Una pruebita del snackbar' } /> */}
    <section className={layout.sectionRow}>
      <section className={ layout.segmentColumn }>
        <h4 className={typography.titleSmall}>Categoria:</h4>
        <p className={styles.chip}>{category}</p>
      </section>
      <section className={ layout.segmentColumn }>
        <h4 className={typography.titleSmall}>Tipo Proceso:</h4>
        <p className={ styles.chip }>{ tipoProceso }</p>
      </section>
      <section className={ layout.segmentColumn }>
        <h4 className={typography.titleSmall}>Cédula de ciudadania:</h4>
        <p className={ styles.chip }>{ cedula }</p>
      </section>
    </section>
    <section className={layout.segmentRow}>  {juzgados && juzgados.map(
      (
        despacho
      ) => {
        return (
          <Link
            key={despacho.url}
            target={'_blank'}
            className={button.buttonActiveCategory}
            href={despacho.url as Route}
          >
            <span className={`material-symbols-outlined ${ button.icon }`}>
                  enable
            </span>
            <sub className={typography.displaySmall}>
              {`${ despacho.id }`}
            </sub>
            <p className={`${ typography.labelSmall } ${ button.text }`}>
              {`Juzgado de origen: ${ despacho.tipo }`}
            </p>
          </Link>
        );
      }
    )}
    </section>
    <section className={ layout.segmentRow}>
      { tel.celular && (
        <Link
          key={tel.celular}
          target={'_blank'}
          className={button.buttonActiveCategory}
          href={`tel:${ tel.celular }`}
        >
          <span className={`material-symbols-outlined ${ button.icon }`}>
              phone_iphone
          </span>
          <span className={`${ typography.labelSmall } ${ button.text }`}>{tel.celular.toString()}</span>
        </Link>
      )}
      {tel.fijo && (
        <Link
          key={tel.fijo}
          target={'_blank'}
          className={button.buttonActiveCategory}
          href={`tel:${ tel.fijo }`}
        >
          <span className={`material-symbols-outlined ${ button.icon }`}>
              call
          </span>
          <span className={`${ typography.labelSmall } ${ button.text }`}>{tel.fijo.toString()}</span>
        </Link>
      )}

      {email && (
        <Link
          className={button.buttonActiveCategory}
          target={'_blank'}
          href={`mailto:${ email }`}
        >
          <span className={`material-symbols-outlined ${ button.icon }`}>
              forward_to_inbox
          </span>
          <span className={`${ typography.labelSmall } ${ button.text }`}>Email</span>
        </Link>
      )}
    </section>
    <section className={ layout.segmentRow }>
      <h5 className={typography.titleMedium}>Vencimiento Pagaré:</h5>
      {carpeta.demanda.vencimientoPagare && carpeta.demanda.vencimientoPagare.map(
        (
          pagare, index
        ) => {
          return (
            <section className={layout.segmentRow} key={index}>
              <h5 className={typography.titleSmall}>{`pagaré número ${ index +1 }`}</h5>
              <p
                key={index}
                className={`${ typography.labelSmall } ${ button.text }`}
              >
                {fixFechas(
                  pagare
                )}
              </p>
            </section>
          );
        }
      )}
    </section>
    {carpeta.demanda.entregaGarantiasAbogado && (
      <p className={`${ typography.labelSmall } ${ button.text }`}>
        {OutputDateHelper(
          carpeta.demanda.entregaGarantiasAbogado
        )}
      </p>
    )}

    <section className={ layout.segmentColumn }>
      <h5 className={typography.titleMedium}>Capital Adeudado:</h5>
      <p className={typography.bodyMedium}>   {carpeta.demanda.capitalAdeudado
            && fixMoney(
              {
                valor: Number(
                  carpeta.demanda.capitalAdeudado
                ),
              }
            )}</p>
    </section>

    { idProcesoContent }
    <Suspense fallback={<Loader />}>
      { carpeta.llaveProceso && ( <ProcesosComponent llaveProceso={carpeta.llaveProceso} index={0} /> )}
    </Suspense>
    <Suspense fallback={<Loader />}>
      { carpeta.idProcesos && (
        carpeta.idProcesos.map(
          (
            idProceso
          ) => {
            return (
              <section className={layout.segmentColumn} key={ idProceso }>

                <FechaActuacionComponent
                  initialOpenState={ true }
                  key={ idProceso }
                  idProceso={ idProceso }
                  index={ carpeta.numero } />

                <Link key={ idProceso } className={ button.buttonPassiveCategory} href={ `/Carpeta/${ carpeta.numero }/ultimasActuaciones/${ idProceso }` as Route }>
                  <span className={ `material-symbols-outlined ${ button.icon }` }>description
                  </span>
                </Link>

              </section>
            );
          }
        )
      ) }
    </Suspense>
    </>
  );
}
