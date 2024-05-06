import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import button from '#@/components/Buttons/buttons.module.css';
import { fixMoney } from '#@/lib/project/helper';
import typography from '#@/styles/fonts/typography.module.css';
import type {  Route } from 'next';
import { Suspense } from 'react';
import layout from '#@/styles/layout.module.css';
import { Loader, TableLoader } from '#@/components/Loader/main-loader';
import { ProcesoCard } from '#@/components/Proceso/server-components';
import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { InputSection } from '#@/components/Form/input-section';
import { DeudorFormComponent } from '../../../components/Form/deudor-form-component';
import { ActuacionLoader } from '#@/components/Actuaciones/actuacion-loader';
import { JuzgadoComponent, JuzgadoTableComponent } from '#@/components/Proceso/juzgado-component';
import { getProcesosByllaveProceso } from '#@/lib/project/utils/Procesos';
import styles from './styles.module.css';
import { NotificacionComponent } from '#@/components/Notificacion/notificacion';
import FruitPicker from '#@/components/Buttons/etapaProsesalSelector';
import { ProcesoTableDetalleComponent } from '#@/components/Proceso/proceso-detalles-component';
import { consultaProcesosPorRazonSocial } from '#@/lib/project/utils/main';
import { ConsultaProcesos, outProceso } from '#@/lib/types/procesos';
import { NewJuzgado } from '#@/lib/models/demanda';
import SujetosProcesales from '#@/components/Proceso/sujetos-procesales';

//SECTION Generate metadata for [numero]


async function AvailableProcesosByName (
  {
    nombre
  }: { nombre: string }
) {
      const urlNameMaker = consultaProcesosPorRazonSocial(
        nombre
      );

      const fetchProc = await fetch(
        urlNameMaker
      );

      if ( !fetchProc.ok ) {
        return null;
      }

      const jsonString = await fetchProc.json() as ConsultaProcesos;
      return (
        <table style={{
          gridArea: 'span 2 / span 4'
        }}>
          <thead>
            <tr>
              <th>Sujetos Procesales</th>
              <th>idConexion</th>
              <th>idRegProceso</th>
              <th>Contenido de radicacion</th>
              <th>fecha del Proceso</th>
              <th>tipo del proceso</th>
              <th>Enlace hibrido</th>
              <th>Clase del proceso</th>
              <th>Ponente</th>
              <th>recurso</th>
              <th>sub clase del proceso</th>
              <th>Juzgado</th>
            </tr>
          </thead>
          <tbody>

            { jsonString.procesos.map(
              (
                proceso
              ) => {
                        const outgoinProceso:outProceso = {
                          ...proceso,
                          juzgado: new NewJuzgado(
                            proceso.despacho
                          ),
                        };
                        return (
                          <tr
                            key={proceso.idProceso}
                          >
                            <td>
                              <SujetosProcesales sujetosProcesalesRaw={ proceso.sujetosProcesales } />
                            </td>
                            <Suspense fallback={<TableLoader />}>
                              <ProcesoTableDetalleComponent key={proceso.idProceso} idProceso={proceso.idProceso} />
                            </Suspense>
                            <Suspense fallback={<TableLoader />}>
                              <JuzgadoTableComponent juzgado={outgoinProceso.juzgado} />
                            </Suspense>
                          </tr> );
              }
            )}
          </tbody>
        </table>
      );
}

async function ProcesosComponent(
  {
    llaveProceso,
    numero,
  }: {
    llaveProceso: string;
    numero: number;
  }
) {
      const procesos = await getProcesosByllaveProceso(
        llaveProceso
      );

      if ( !procesos || procesos.length === 0 ) {
        return null;
      }

      return (
        <>
          {procesos.map(
            (
              proceso,
            ) => {
                      const {
                        idProceso
                      } = proceso;
                      return (
                        <div
                          className={layout.segmentColumn}
                          key={idProceso}
                        >
                          <Suspense fallback={<Loader />}>
                            <ProcesoCard
                              key={proceso.idProceso}
                              proceso={proceso}
                            >
                              <div className={layout.segmentColumn}>
                                <Suspense fallback={<Loader />}>
                                  <JuzgadoComponent
                                    key={proceso.juzgado.url}
                                    juzgado={proceso.juzgado}
                                  />
                                </Suspense>
                                <Suspense fallback={<Loader />}>
                                  <FruitPicker />
                                </Suspense>

                                <Link
                                  key={idProceso}
                                  className={button.buttonPassiveCategory}
                                  href={
                                    `/Carpeta/${ numero }/ultimasActuaciones/${ idProceso }` as Route
                                  }
                                >
                                  <span
                                    className={`material-symbols-outlined ${ button.icon }`}
                                  >
                      description
                                  </span>
                                  <span className={button.text}>
                      Todas las actuaciones de este juzgado
                                  </span>
                                </Link>
                              </div>
                              <Suspense fallback={<ActuacionLoader />}>
                                <FechaActuacionComponent
                                  key={idProceso}
                                  idProceso={idProceso}

                                />
                              </Suspense>
                            </ProcesoCard>
                          </Suspense>
                        </div>
                      );
            }
          )}
        </>
      );
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
        idProcesos, numero, llaveProceso
      } = carpeta;

      let idProcesoContent;

      if ( idProcesos && idProcesos.length > 0 ) {
        idProcesoContent = idProcesos.map(
          (
            idProceso
          ) => {
                    return (
                      <Link
                        key={idProceso}
                        href={
                          `/Carpeta/${ params.numero }/ultimasActuaciones/${ idProceso }` as Route
                        }
                      ></Link>
                    );
          }
        );
      }

      return (
        <>
          <div className={ layout.sectionColumn }>
            {
              carpeta.demanda?.capitalAdeudado && (
                <div className={ styles.valueCard }>
                  <h2 className={styles.valueCardTitle}>Capital Adeudado</h2>
                  <h3 className={styles.valueCardValue}>{fixMoney(
                    carpeta.demanda.capitalAdeudado
                  )}</h3>
                </div>
              ) }
            {
              carpeta.demanda?.avaluo && (
                <div className={ styles.valueCard }>
                  <h2 className={styles.valueCardTitle}>Valor del Avaluo</h2>
                  <h3 className={styles.valueCardValue}>{
                    fixMoney(
                      carpeta.demanda.avaluo
                    )
                  }</h3>
                </div>
              )
            }
            {
              carpeta.demanda?.liquidacion && (
                <div className={ styles.valueCard }>
                  <h2 className={styles.valueCardTitle}>Valor de la liquidacion</h2>
                  <h3 className={styles.valueCardValue}>{
                    fixMoney(
                      carpeta.demanda.liquidacion
                    )
                  }</h3>
                </div>
              )
            }
          </div>
          { carpeta.demanda?.notificacion && (
            <Suspense fallback={ <Loader /> }>
              <NotificacionComponent notificacion={ carpeta.demanda.notificacion } />
            </Suspense>
          )}
          <div className={layout.sectionColumn}>
            <h3 className={typography.titleLarge}>Procesos</h3>
            <Suspense fallback={<Loader />}>
              <ProcesosComponent
                llaveProceso={llaveProceso}
                numero={numero}
              />
            </Suspense>
          </div>
          <DeudorFormComponent />

          <Suspense fallback={<Loader />}>
            <InputSection
              key={params.numero}
              name={'llaveProceso'}
              title={'Numero de expediente'}
              type={'text'}
            />
          </Suspense>
          {idProcesoContent}
          <AvailableProcesosByName nombre={carpeta.nombre}/>

        </>
      );
}
