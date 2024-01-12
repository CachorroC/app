import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import button from '#@/components/Buttons/buttons.module.css';
import { fixFechas, fixMoney } from '#@/lib/project/helper';
import typography from '#@/styles/fonts/typography.module.css';
import type { Metadata, Route } from 'next';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import styles from './styles.module.css';
import { Fragment, Suspense } from 'react';
import layout from '#@/styles/layout.module.css';
import { Loader } from '#@/components/Loader';
import { ProcesosComponent } from '#@/components/Proceso/server-components';
import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { InputSection } from '#@/components/form/input-section';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { DeudorFormComponent } from './deudor-form-component';
import { Snackbar } from '#@/components/Modal/snackbar';

//SECTION Generate metadata for [numero]
export async function generateMetadata(
  {
    params,
  }: {
    params: { numero: string };
  }
): Promise<Metadata> {
      const {
        numero
      } = params;

      const product = await getCarpetabyNumero(
        Number(
          numero
        )
      );

      if ( !product ) {
        return {
          title: 'sin carpeta',
        };
      }

      return {
        title   : product.nombre,
        keywords: [
          product.nombre,
          product.tipoProceso,
          product.numero.toString(),
          product.tipoProceso,
          product.category,
        ],
      };
}

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
        deudor, demanda, category, tipoProceso, idProcesos, procesos
      }
    = carpeta;

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
                      ></Link>
                    );
          }
        );
      }

      return (
        <>
          <Snackbar text={'Una pruebita del snackbar'} />
          <section className={layout.sectionRow}>
            <section className={layout.segmentColumn}>
              <h4 className={typography.titleSmall}>Categoria:</h4>

              <p className={styles.chip}>{category}</p>
            </section>
            <section className={layout.segmentColumn}>
              <h4 className={typography.titleSmall}>Tipo Proceso:</h4>
              <p className={styles.chip}>{tipoProceso}</p>
            </section>
            {deudor?.cedula && (
              <section className={layout.segmentColumn}>
                <section className={layout.segmentRow}>
                  <h4 className={typography.titleSmall}>Cédula de ciudadania:</h4>
                  <CopyButton
                    copyTxt={String(
                      deudor.cedula
                    )}
                    name={'Cédula'}
                  />
                </section>
                <p className={styles.chip}>{deudor.cedula}</p>
              </section>
            )}
          </section>
          <section className={layout.segmentRow}>
            {' '}
            {procesos
          && procesos.map(
            (
              despacho
            ) => {
                      return (
                        <Link
                          key={despacho.juzgado.url}
                          target={'_blank'}
                          className={button.buttonActiveCategory}
                          href={despacho.juzgado.url as Route}
                        >
                          <span className={`material-symbols-outlined ${ button.icon }`}>
                  enable
                          </span>
                          <sub className={typography.displaySmall}>
                            {`${ despacho.juzgado.id }`}
                          </sub>
                          <p className={`${ typography.labelSmall } ${ button.text }`}>
                            {`Juzgado de origen: ${ despacho.juzgado.tipo }`}
                          </p>
                          <span>{`${ despacho.sujetosProcesales }`}</span>
                        </Link>
                      );
            }
          )}
          </section>
          <DeudorFormComponent />
          <section className={layout.segmentRow}>
            {deudor?.telCelular && (
              <Link
                key={deudor.telCelular}
                target={'_blank'}
                className={button.buttonActiveCategory}
                href={`tel:${ deudor.telCelular }`}
              >
                <span className={`material-symbols-outlined ${ button.icon }`}>
              phone_iphone
                </span>
                <span className={typography.labelSmall}>{deudor.telCelular}</span>
              </Link>
            )}
            {deudor?.telFijo && (
              <Link
                key={deudor.telFijo}
                target={'_blank'}
                className={button.buttonActiveCategory}
                href={`tel:${ deudor.telFijo }`}
              >
                <span className={`material-symbols-outlined ${ button.icon }`}>
              call
                </span>
                <span className={typography.labelSmall}>{deudor.telFijo}</span>
              </Link>
            )}

            {deudor?.email && (
              <Link
                className={button.buttonActiveCategory}
                target={'_blank'}
                href={`mailto:${ deudor.email }`}
              >
                <span className={`material-symbols-outlined ${ button.icon }`}>
              forward_to_inbox
                </span>
                <span className={`${ typography.labelSmall } ${ button.text }`}>
              Email
                </span>
              </Link>
            )}
          </section>
          <section className={layout.segmentRow}>
            <h5 className={typography.titleMedium}>Vencimiento Pagaré:</h5>
            {demanda?.vencimientoPagare
          && demanda.vencimientoPagare.map(
            (
              pagare, index
            ) => {
                      return (
                        <section
                          className={layout.segmentRow}
                          key={index}
                        >
                          <h5 className={typography.titleSmall}>{`pagaré número ${
                            index + 1
                          }`}</h5>
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
          {demanda?.entregaGarantiasAbogado && (
            <p className={`${ typography.labelSmall } ${ button.text }`}>
              {OutputDateHelper(
                demanda.entregaGarantiasAbogado
              )}
            </p>
          )}
          <Suspense fallback={<Loader />}>
            <InputSection
              key={params.numero}
              name={'llaveProceso'}
              title={'Numero de expediente'}
              type={'text'}
            />
          </Suspense>

          <section className={layout.segmentColumn}>
            <h5 className={typography.titleMedium}>Capital Adeudado:</h5>
            <p className={typography.bodyMedium}>
              {' '}
              {demanda?.capitalAdeudado
            && fixMoney(
              {
                valor: Number(
                  demanda.capitalAdeudado
                ),
              }
            )}
            </p>
          </section>

          {idProcesoContent}
          <Suspense fallback={<Loader />}>
            {carpeta.llaveProceso && (
              <ProcesosComponent llaveProceso={carpeta.llaveProceso} />
            )}
          </Suspense>
          <Suspense fallback={<Loader />}>
            {carpeta.idProcesos
          && carpeta.idProcesos.map(
            (
              idProceso, index
            ) => {
                      return (
                        <section
                          className={layout.segmentColumn}
                          key={idProceso}
                        >
                          <FechaActuacionComponent
                            initialOpenState={true}
                            key={idProceso}
                            idProceso={idProceso}
                            index={index}
                          />

                          <Link
                            key={idProceso}
                            className={button.buttonPassiveCategory}
                            href={
                              `/Carpeta/${ carpeta.numero }/ultimasActuaciones/${ idProceso }` as Route
                            }
                          >
                            <span className={`material-symbols-outlined ${ button.icon }`}>
                    description
                            </span>
                          </Link>
                        </section>
                      );
            }
          )}
          </Suspense>
        </>
      );
}
