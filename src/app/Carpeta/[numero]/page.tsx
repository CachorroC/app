import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { getCarpetabyNumero } from '#@/lib/project/carpetas';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { button } from '#@/components/Buttons/buttons.module.css';
import { icon, link } from '#@/components/Card/card.module.css';
import { fixFechas, fixMoney } from '#@/lib/project/helper';
import typography from '#@/styles/fonts/typography.module.scss';
import type { Route } from 'next';

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

  const { deudor, demanda,  category, tipoProceso, idProcesos
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
      {carpeta.idProcesos
        && carpeta.idProcesos.map(
          (
            idProceso
          ) => {
            return (
              <FechaActuacionComponent
                key={idProceso}
                idProceso={idProceso}
                index={1}
              />
            );
          }
        ) }

      <p className={typography.bodySmall}>{category}</p>
      <p className={typography.labelSmall}>{tipoProceso}</p>
      <p className={ typography.titleSmall }>{ cedula }</p>
      {juzgados
          && juzgados.map(
            (
              despacho
            ) => {
              return (
                <Link
                  key={despacho.url}
                  target={'_blank'}
                  className={link}
                  href={despacho.url as Route}
                >
                  <span className={`material-symbols-outlined ${ icon }`}>
                  enable
                  </span>
                  <sub className={typography.displaySmall}>
                    {`${ despacho.id }`}
                  </sub>
                  <p className={typography.labelSmall}>
                    {`Juzgado de origen: ${ despacho.tipo }`}
                  </p>
                </Link>
              );
            }
          )}
      {tel.celular && (
        <Link
          key={tel.celular}
          target={'_blank'}
          className={link}
          href={`tel:${ tel.celular }`}
        >
          <span className={`material-symbols-outlined ${ icon }`}>
              phone_iphone
          </span>
          <span className={typography.labelSmall}>{tel.celular.toString()}</span>
        </Link>
      )}
      {tel.fijo && (
        <Link
          key={tel.fijo}
          target={'_blank'}
          className={link}
          href={`tel:${ tel.fijo }`}
        >
          <span className={`material-symbols-outlined ${ icon }`}>
              call
          </span>
          <span className={typography.labelSmall}>{tel.fijo.toString()}</span>
        </Link>
      )}
      {carpeta.demanda.vencimientoPagare
          && carpeta.demanda.vencimientoPagare.map(
            (
              pagare, index
            ) => {
              return (
                <p
                  key={index}
                  className={typography.labelMedium}
                >
                  {fixFechas(
                    pagare
                  )}
                </p>
              );
            }
          )}
      {email && (
        <Link
          className={button}
          target={'_blank'}
          href={`mailto:${ email }`}
        >
          <span className={`material-symbols-outlined ${ icon }`}>
              forward_to_inbox
          </span>
          <span className={typography.labelSmall}>Email</span>
        </Link>
      )}

      {carpeta.demanda.entregaGarantiasAbogado && (
        <p className={typography.labelSmall}>
          {fixFechas(
            carpeta.demanda.entregaGarantiasAbogado
          )}
        </p>
      )}

      {carpeta.demanda.capitalAdeudado
            && fixMoney(
              {
                valor: Number(
                  carpeta.demanda.capitalAdeudado
                ),
              }
            )}

      {email && (
        <Link
          className={link}
          href={email as Route}
          target={'_blank'}
        >
          <span className={`material-symbols-outlined ${ icon }`}>mail</span>
          <span className={typography.labelMedium}>{'Correo Electrónico'}</span>
        </Link>
      )}
      {tel.celular && (
        <Link
          key={tel.celular}
          className={link}
          target={'_blank'}
          href={`tel:${ tel.celular }`}
        >
          <span className={`material-symbols-outlined ${ icon }`}>
            phone_iphone
          </span>
          <span className={typography.labelMedium}>{tel.celular.toString()}</span>
        </Link>
      )}
      {tel.fijo && (
        <Link
          key={tel.fijo}
          className={link}
          href={`tel:${ tel.fijo }`}
        >
          <span className={`material-symbols-outlined ${ icon }`}>call</span>
          <span className={typography.labelMedium}>{tel.fijo.toString()}</span>
        </Link>
      )}
      { idProcesoContent }
      <
    </>
  );
}
