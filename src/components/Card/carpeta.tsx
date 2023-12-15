import { fixFechas, fixMoney } from '#@/lib/project/helper';
import { Route } from 'next';
import Link from 'next/link';
import { NombreComponent } from '../nombre';
import styles from './card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import card from 'components/Card/card.module.css';
import { button } from '../Buttons/buttons.module.css';
import layout from '#@/styles/layout.module.css';
import { PrismaCarpeta } from '#@/lib/types/prisma/carpetas';

export const CarpetaCard = (
  {
    carpeta
  }: { carpeta: PrismaCarpeta}
) => {
          const {
            idProcesos, deudor, demandas, numero
          } = carpeta;

          const {
            telCelular, telFijo, email
          } = deudor;

          const [
            demanda
          ] = demandas;

          const {
            juzgado
          } = demanda;

          return (
            <div
              className={styles.container}
              key={numero}
            >
              <div className={styles.card}>
                {deudor && ( <NombreComponent
                  key={numero}
                  deudor={deudor}
                /> )}
                <sub className={card.sub}>{carpeta.numero}</sub>
                <p className={typography.bodySmall}>{carpeta.category}</p>
                <p className={typography.labelSmall}>{carpeta.tipoProceso}</p>
                <p className={typography.titleSmall}>{deudor?.cedula}</p>
                <section className={layout.segmentRow}>

                  {idProcesos
          && idProcesos.map(
            (
              idProceso
            ) => {
                      return (
                        <Link
                          className={button}
                          key={idProceso}
                          href={
                            `/Carpeta/${ numero }/ultimasActuaciones/${ idProceso }` as Route
                          }
                        >
                          <span className={`material-symbols-outlined ${ styles.icon }`}>
                  update
                          </span>
                          <span className={styles.tooltiptext}>Ultimas Actiaciones</span>
                        </Link>
                      );
            }
          )}
                </section>
                {juzgado
          && (
            <Link
              key={juzgado.url}
              target={'_blank'}
              className={card.link}
              href={new URL(
                juzgado.url
              )}
            >
              <span className={`material-symbols-outlined ${ card.icon }`}>
                  enable
              </span>
              <sub className={typography.displaySmall}>
                {`${ juzgado.id }`}
              </sub>
              <p className={typography.labelSmall}>
                {`Juzgado de origen: ${ juzgado.tipo }`}
              </p>
            </Link>
          )
                }
                {telCelular && (
                  <Link
                    key={telCelular}
                    target={'_blank'}
                    className={card.link}
                    href={`tel:${ telCelular }`}
                  >
                    <span className={`material-symbols-outlined ${ styles.icon }`}>
              phone_iphone
                    </span>
                    <span className={styles.tooltiptext}>{telCelular}</span>
                  </Link>
                )}
                {telFijo && (
                  <Link
                    key={telFijo}
                    target={'_blank'}
                    className={card.link}
                    href={`tel:${ telFijo }`}
                  >
                    <span className={`material-symbols-outlined ${ styles.icon }`}>
              call
                    </span>
                    <span className={styles.tooltiptext}>{telFijo.toString()}</span>
                  </Link>
                )}
                {demanda.vencimientoPagare
          && demanda.vencimientoPagare.map(
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
                    <span className={`material-symbols-outlined ${ styles.icon }`}>
              forward_to_inbox
                    </span>
                    <span className={styles.tooltiptext}>Email</span>
                  </Link>
                )}

                {demanda.entregaGarantiasAbogado && (
                  <p className={typography.labelSmall}>
                    {fixFechas(
                      demanda.entregaGarantiasAbogado
                    )}
                  </p>
                )}
                <div>
                  {demanda.capitalAdeudado
            && fixMoney(
              {
                valor: Number(
                  demanda.capitalAdeudado
                ),
              }
            )}
                </div>
              </div>
              {email && (
                <Link
                  className={card.link}
                  href={email as Route}
                  target={'_blank'}
                >
                  <span className={`material-symbols-outlined ${ card.icon }`}>mail</span>
                  <span className={card.tooltiptext}>{'Correo Electrónico'}</span>
                </Link>
              )}
              {telCelular && (
                <Link
                  key={telCelular}
                  className={card.link}
                  target={'_blank'}
                  href={`tel:${ telCelular }`}
                >
                  <span className={`material-symbols-outlined ${ card.icon }`}>
            phone_iphone
                  </span>
                  <span className={card.tooltiptext}>{telCelular}</span>
                </Link>
              )}
              {telFijo && (
                <Link
                  key={telFijo}
                  className={card.link}
                  href={`tel:${ telFijo }`}
                >
                  <span className={`material-symbols-outlined ${ card.icon }`}>call</span>
                  <span className={card.tooltiptext}>{telFijo.toString()}</span>
                </Link>
              )}
            </div>
          );
};
