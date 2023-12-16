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

          const {
            tel, email
          } = deudor;

          const {
            fijo, celular
          } = tel;

          return (
            <div
              className={styles.container}
              key={numero}
            >
              <div className={styles.card}>
                {deudor && (
                  <NombreComponent
                    key={numero}
                    deudor={deudor}
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
                {celular && (
                  <Link
                    key={celular}
                    target={'_blank'}
                    className={card.link}
                    href={`tel:${ celular }`}
                  >
                    <span className={`material-symbols-outlined ${ styles.icon }`}>
              phone_iphone
                    </span>
                    <span className={styles.tooltiptext}>{celular}</span>
                  </Link>
                )}
                {fijo && (
                  <Link
                    key={fijo}
                    target={'_blank'}
                    className={card.link}
                    href={`tel:${ fijo }`}
                  >
                    <span className={`material-symbols-outlined ${ styles.icon }`}>
              call
                    </span>
                    <span className={styles.tooltiptext}>{fijo.toString()}</span>
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
              {celular && (
                <Link
                  key={celular}
                  className={card.link}
                  target={'_blank'}
                  href={`tel:${ celular }`}
                >
                  <span className={`material-symbols-outlined ${ card.icon }`}>
            phone_iphone
                  </span>
                  <span className={card.tooltiptext}>{celular}</span>
                </Link>
              )}
              {fijo && (
                <Link
                  key={fijo}
                  className={card.link}
                  href={`tel:${ fijo }`}
                >
                  <span className={`material-symbols-outlined ${ card.icon }`}>call</span>
                  <span className={card.tooltiptext}>{fijo.toString()}</span>
                </Link>
              )}
            </div>
          );
};
