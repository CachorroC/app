import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import button from '#@/components/Buttons/buttons.module.css';
import { fixFechas, fixMoney } from '#@/lib/project/helper';
import typography from '#@/styles/fonts/typography.module.scss';
import type { Route } from 'next';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import styles from './styles.module.css';
import { Fragment } from 'react';

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
            href={`/Carpeta/${ params.numero }/ultimasActuaciones/${ idProceso }`}
          ></Link>
        );
      }
    );
  }

  return (
    <>


      <section className={button.segmentRow}>
        <h4 className={typography.labelMedium}>Categoria:</h4>
        <p className={styles.chip}>{category}</p>
      </section>
      <p className={styles.chip}>{tipoProceso}</p>
      <p className={ styles.chip}>{ cedula }</p>
      <section className={button.segmentColumn}>  {juzgados && juzgados.map(
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
      <section className={button.segmentColumn}>
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
      <section className={ button.segmentColumn }>
        <h5 className={typography.titleMedium}>Vencimiento Pagaré:</h5>
        {carpeta.demanda.vencimientoPagare && carpeta.demanda.vencimientoPagare.map(
          (
            pagare, index
          ) => {
            return (
              <section className={button.segmentRow} key={index}>
                <h5 className={typography.titleSmall}>{`pagaré número ${ index +1 }`}</h5>
                <p
                  key={index}
                  className={`${ typography.labelSmall} ${ button.text }`}
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

      <section className={ button.segmentColumn }>
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

    </>
  );
}
