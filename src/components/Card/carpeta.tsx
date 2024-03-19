import { fixFechas, fixMoney } from '#@/lib/project/helper';
import { Route } from 'next';
import Link from 'next/link';
import { NombreComponent } from '../nombre';
import styles from './card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import card from 'components/Card/card.module.css';
import { button } from '../Buttons/buttons.module.css';
import layout from '#@/styles/layout.module.css';
import { MonCarpeta } from '#@/lib/types/carpetas';

export const CarpetaCard = (
  {
    carpeta
  }: { carpeta: MonCarpeta }
) => {
          const {
            idProcesos, deudor, demanda, numero, procesos
          } = carpeta;

          return (
            <div
              className={styles.container}
              key={numero}
            >
              <div className={styles.card}>
                {deudor && (
                  <NombreComponent
                    key={numero}
                    primerNombre={ deudor.primerNombre }
                    primerApellido={ deudor.primerApellido }
                    segundoApellido={ deudor.segundoApellido }
                    segundoNombre={ deudor.segundoNombre }
                  />
                )}
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
                            <span className={styles.tooltiptext}>
                    Ultimas Actiaciones
                            </span>
                          </Link>
                        );
              }
            )}
                </section>
                {procesos.map(
                  (
                    {
                      juzgado
                    }
                  ) => {
                            return (
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
                                <sub className={typography.displaySmall}>{`${ juzgado.id }`}</sub>
                                <p className={typography.labelSmall}>
                                  {`Juzgado de origen: ${ juzgado.tipo }`}
                                </p>
                              </Link>
                            );
                  }
                )}
                {deudor?.telCelular && (
                  <Link
                    key={deudor.telCelular}
                    target={'_blank'}
                    className={card.link}
                    href={`tel:${ deudor.telCelular }`}
                  >
                    <span className={`material-symbols-outlined ${ styles.icon }`}>
              phone_iphone
                    </span>
                    <span className={styles.tooltiptext}>{deudor.telCelular}</span>
                  </Link>
                )}
                {deudor?.telFijo && (
                  <Link
                    key={deudor.telFijo}
                    target={'_blank'}
                    className={card.link}
                    href={`tel:${ deudor.telFijo }`}
                  >
                    <span className={`material-symbols-outlined ${ styles.icon }`}>
              call
                    </span>
                    <span className={styles.tooltiptext}>{deudor.telFijo}</span>
                  </Link>
                )}
                {demanda?.vencimientoPagare
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
                {deudor?.email && (
                  <Link
                    className={button}
                    target={'_blank'}
                    href={`mailto:${ deudor.email }`}
                  >
                    <span className={`material-symbols-outlined ${ styles.icon }`}>
              forward_to_inbox
                    </span>
                    <span
                      className={styles.tooltiptext}
                    >{`correo electrónico ${ deudor.email }`}</span>
                  </Link>
                )}

                {demanda?.entregaGarantiasAbogado && (
                  <p className={typography.labelSmall}>
                    {fixFechas(
                      demanda.entregaGarantiasAbogado
                    )}
                  </p>
                )}
                <div>
                  {demanda?.capitalAdeudado
            && fixMoney(
              Number(
                demanda.capitalAdeudado
              ),

            )}
                </div>
              </div>
              {deudor?.email && (
                <Link
                  className={card.link}
                  href={deudor.email as Route}
                  target={'_blank'}
                >
                  <span className={`material-symbols-outlined ${ card.icon }`}>mail</span>
                  <span className={card.tooltiptext}>{'Correo Electrónico'}</span>
                </Link>
              )}
              {deudor?.telCelular && (
                <Link
                  key={deudor.telCelular}
                  className={card.link}
                  target={'_blank'}
                  href={`tel:${ deudor.telCelular }`}
                >
                  <span className={`material-symbols-outlined ${ card.icon }`}>
            phone_iphone
                  </span>
                  <span className={card.tooltiptext}>{deudor.telCelular}</span>
                </Link>
              )}
              {deudor?.telFijo && (
                <Link
                  key={deudor.telFijo}
                  className={card.link}
                  href={`tel:${ deudor.telFijo }`}
                >
                  <span className={`material-symbols-outlined ${ card.icon }`}>call</span>
                  <span className={card.tooltiptext}>{deudor.telFijo.toString()}</span>
                </Link>
              )}
            </div>
          );
};
