import { fixFechas, fixMoney } from '#@/lib/project/helper';
import { MonCarpeta } from '#@/lib/types/carpetas';
import { Route } from 'next';
import Link from 'next/link';
import { NombreComponent } from '../nombre';
import styles from './card.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import card from 'components/Card/card.module.css';
import { button } from '../Buttons/buttons.module.css';

export const CarpetaCard = (
  {
    carpeta 
  }: { carpeta: MonCarpeta } 
) => {
  const {
    llaveProceso, idProceso, _id 
  } = carpeta;

  const {
    tel, direccion, email 
  } = carpeta.deudor;

  const {
    departamento, municipio, radicado, juzgados 
  } = carpeta.demanda;

  const path = '/Procesos';

  const href = llaveProceso
    ? idProceso
      ? `${ path }/${ llaveProceso }/${ idProceso }`
      : `${ path }/${ llaveProceso }`
    : `${ path }`;

  return (
    <div className={styles.container} key={_id}>
      <div className={styles.card}>
        <NombreComponent key={_id} deudor={carpeta.deudor} />
        <sub className={card.sub}>{carpeta.numero}</sub>
        <p className={typography.bodySmall}>{carpeta.category}</p>
        <p className={typography.labelSmall}>{carpeta.tipoProceso}</p>
        <p className={typography.titleSmall}>{carpeta.deudor.cedula}</p>
        <div className={styles.links}>
          <Link className={button} key={_id} href={href as Route}>
            <span className={`material-symbols-outlined ${ styles.icon }`}>
              folder_open
            </span>
            <span className={styles.tooltiptext}>Abrir</span>
          </Link>
          {juzgados
            && juzgados.map(
              (
                despacho, index 
              ) => {
                return (
                  <Link
                    key={despacho.url}
                    target={'_blank'}
                    className={card.link}
                    href={despacho.url as Route}
                  >
                    <span className={`material-symbols-outlined ${ card.icon }`}>
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
              className={card.link}
              href={`tel:${ tel.celular }`}
            >
              <span className={`material-symbols-outlined ${ styles.icon }`}>
                phone_iphone
              </span>
              <span className={styles.tooltiptext}>
                {tel.celular.toString()}
              </span>
            </Link>
          )}
          {tel.fijo && (
            <Link
              key={tel.fijo}
              target={'_blank'}
              className={card.link}
              href={`tel:${ tel.fijo }`}
            >
              <span className={`material-symbols-outlined ${ styles.icon }`}>
                call
              </span>
              <span className={styles.tooltiptext}>{tel.fijo.toString()}</span>
            </Link>
          )}
          {carpeta.demanda.vencimientoPagare && (
            <p className={typography.labelMedium}>
              {fixFechas(
                carpeta.demanda.vencimientoPagare 
              )}
            </p>
          )}
          {email && (
            <Link className={button} target={'_blank'} href={`mailto:${ email }`}>
              <span className={`material-symbols-outlined ${ styles.icon }`}>
                forward_to_inbox
              </span>
              <span className={styles.tooltiptext}>Email</span>
            </Link>
          )}

          {carpeta.demanda.entregagarantiasAbogado && (
            <p className={typography.labelSmall}>
              {fixFechas(
                carpeta.demanda.entregagarantiasAbogado 
              )}
            </p>
          )}
          <div>
            {carpeta.demanda.capitalAdeudado
              && fixMoney(
                {
                  valor: Number(
                    carpeta.demanda.capitalAdeudado 
                  ),
                } 
              )}
          </div>
        </div>
        {email && (
          <Link className={card.link} href={email as Route} target={'_blank'}>
            <span className={`material-symbols-outlined ${ card.icon }`}>
              mail
            </span>
            <span className={card.tooltiptext}>{'Correo Electrónico'}</span>
          </Link>
        )}
        {tel.celular && (
          <Link
            key={tel.celular}
            className={card.link}
            target={'_blank'}
            href={`tel:${ tel.celular }`}
          >
            <span className={`material-symbols-outlined ${ card.icon }`}>
              phone_iphone
            </span>
            <span className={card.tooltiptext}>{tel.celular.toString()}</span>
          </Link>
        )}
        {tel.fijo && (
          <Link key={tel.fijo} className={card.link} href={`tel:${ tel.fijo }`}>
            <span className={`material-symbols-outlined ${ card.icon }`}>
              call
            </span>
            <span className={card.tooltiptext}>{tel.fijo.toString()}</span>
          </Link>
        )}
      </div>
    </div>
  );
};
