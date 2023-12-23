import { button } from '#@/components/Buttons/buttons.module.css';
import { icon, link } from '#@/components/Card/card.module.css';
import { fixFechas, fixMoney } from '#@/lib/project/helper';
import { MonCarpeta } from '#@/lib/types/carpetas';
import typography from '#@/styles/fonts/typography.module.css';
import type { Route } from 'next';
import Link from 'next/link';

export default function InformationComponent (
  {
    carpeta
  }: { carpeta: MonCarpeta }
) {
      const {
        deudor, demanda,  category, tipoProceso, procesos
      } = carpeta;

      const [
        {
          juzgado
        }
      ] = procesos;

      return (
        <>
          <p className={typography.bodySmall}>{category}</p>
          <p className={typography.labelSmall}>{tipoProceso}</p>
          <p className={ typography.titleSmall }>{ deudor?.cedula }</p>
          {juzgado
          && (
            <Link
              key={juzgado.url}
              target={'_blank'}
              className={link}
              href={juzgado.url as Route}
            >
              <span className={`material-symbols-outlined ${ icon }`}>
                  gavel
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
          {deudor?.telCelular && (
            <Link
              key={deudor.telCelular}
              target={'_blank'}
              className={link}
              href={`tel:${ deudor.telCelular }`}
            >
              <span className={`material-symbols-outlined ${ icon }`}>
              phone_iphone
              </span>
              <span className={typography.labelSmall}>{deudor.telCelular}</span>
            </Link>
          )}
          {deudor?.telFijo && (
            <Link
              key={deudor.telFijo}
              target={'_blank'}
              className={link}
              href={`tel:${ deudor.telFijo }`}
            >
              <span className={`material-symbols-outlined ${ icon }`}>
              call
              </span>
              <span className={typography.labelSmall}>{deudor.telFijo}</span>
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
              <span className={`material-symbols-outlined ${ icon }`}>
              forward_to_inbox
              </span>
              <span className={typography.labelSmall}>Email</span>
            </Link>
          )}

          {demanda?.entregaGarantiasAbogado && (
            <p className={typography.labelSmall}>
              {fixFechas(
                demanda.entregaGarantiasAbogado
              )}
            </p>
          )}

          {demanda?.capitalAdeudado
            && fixMoney(
              {
                valor: Number(
                  demanda.capitalAdeudado
                ),
              }
            )}

          {deudor?.email && (
            <Link
              className={link}
              href={deudor.email as Route}
              target={'_blank'}
            >
              <span className={`material-symbols-outlined ${ icon }`}>mail</span>
              <span className={typography.labelMedium}>{'Correo Electrónico'}</span>
            </Link>
          )}
          {deudor?.telCelular && (
            <Link
              key={deudor.telCelular}
              className={link}
              target={'_blank'}
              href={`tel:${ deudor.telCelular }`}
            >
              <span className={`material-symbols-outlined ${ icon }`}>
            phone_iphone
              </span>
              <span className={typography.labelMedium}>{deudor.telCelular}</span>
            </Link>
          )}
          {deudor?.telFijo && (
            <Link
              key={deudor.telFijo}
              className={link}
              href={`tel:${ deudor.telFijo }`}
            >
              <span className={`material-symbols-outlined ${ icon }`}>call</span>
              <span className={typography.labelMedium}>{deudor.telFijo}</span>
            </Link>
          )}
        </>
      );
}