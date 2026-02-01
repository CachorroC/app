import { getCarpetabyNumero } from '#@/lib/project/utils/Carpetas/carpetas';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fixMoney } from '#@/lib/project/helper';
import { Fragment, Suspense } from 'react';
import layout, { buttonActiveCategory } from '#@/styles/layout.module.css';
import { Loader, TableLoader } from '#@/components/Loader/main-loader';
import { InputSection } from '#@/components/Form/input-section';
import { DeudorFormComponent } from '#@/components/Form/deudor-form-component';
import { JuzgadoComponent,
  JuzgadoErrorComponent, } from '#@/components/Proceso/juzgado-component';
import styles from './styles.module.css';
import { NotificacionComponent } from '#@/components/Notificacion/notificacion';
import { ProcesoTableDetalleComponent } from '#@/components/Proceso/proceso-detalles-component';
import { consultaProcesosPorRazonSocial } from '#@/lib/project/utils/main';
import { ConsultaProcesos, outProceso } from '#@/lib/types/procesos';
import SujetosProcesales from '#@/components/Proceso/sujetos-procesales';
import { JuzgadoClass } from '#@/lib/models/juzgado';
import { ProcesosComponent } from '#@/components/Proceso/server-components';
import ProtoPage from './proto-page';

async function AvailableProcesosByName(
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
    return (
      <div>
        <h1> No hay procesos disponibles</h1>
      </div>
    );
  }

  const jsonString = ( await fetchProc.json() ) as ConsultaProcesos;

  return (
    <table
      style={{
        gridArea: 'span 2 / span 4',
      }}
    >
      <thead>
        <tr>
          <th>Sujetos Procesales</th>
          <th>Clase del proceso</th>
          <th>Contenido de radicacion</th>
          <th>Despacho</th>
          <th>privado</th>
          <th>fecha de consulta</th>
          <th>fecha del Proceso</th>
          <th>id Conexion</th>
          <th>id Registro Proceso</th>
          <th>llaveProceso</th>
          <th>Ponente</th>
          <th>recurso</th>
          <th>sub clase del proceso</th>
          <th>tipo del proceso</th>
          <th>ubicacion</th>
          <th>fecha ultima actualizacion</th>
          <th>Juzgado</th>
        </tr>
      </thead>
      <tbody>
        {jsonString.procesos.map(
          (
            proceso
          ) => {
            const outgoinProceso: outProceso = {
              ...proceso,
              juzgado: JuzgadoClass.fromProceso(
                proceso
              ),
            };

            return (
              <tr key={proceso.idProceso}>
                <td>
                  <SujetosProcesales
                    sujetosProcesalesRaw={proceso.sujetosProcesales}
                  />
                </td>
                <Suspense fallback={<TableLoader />}>
                  <ProcesoTableDetalleComponent
                    key={proceso.idProceso}
                    idProceso={proceso.idProceso}
                  />
                </Suspense>
                <Suspense fallback={<TableLoader />}>
                  <JuzgadoComponent juzgado={outgoinProceso.juzgado} />
                </Suspense>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}

export default async function Page(
  {
    params
  }: { params: Promise<{ numero: string; }>; }
) {
  const {
    numero
  } = await params;

  const carpeta = await getCarpetabyNumero(
    Number(
      numero
    )
  );

  if ( !carpeta ) {
    return notFound();
  }

  const {
    idProcesos, llaveProceso, juzgado, nombre
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
            className={buttonActiveCategory}
            href={
              `/Carpeta/${ numero }/ultimasActuaciones/${ idProceso }`
            }
          >
            <span>{nombre}</span>
          </Link>
        );
      }
    );
  }

  return (
    <>
      <ProtoPage carpeta={carpeta} />
      <div className={ layout.sectionRow }>
        {carpeta.demanda?.capitalAdeudado && (
          <div className={styles.valueCard}>
            <h2 className={styles.valueCardTitle}>Capital Adeudado</h2>
            <h3 className={styles.valueCardValue}>
              {fixMoney(
                carpeta.demanda.capitalAdeudado
              )}
            </h3>
          </div>
        )}
        {carpeta.demanda?.avaluo && (
          <div className={styles.valueCard}>
            <h2 className={styles.valueCardTitle}>Valor del Avaluo</h2>
            <h3 className={styles.valueCardValue}>
              {fixMoney(
                carpeta.demanda.avaluo
              )}
            </h3>
          </div>
        )}
        {carpeta.demanda?.liquidacion && (
          <div className={styles.valueCard}>
            <h2 className={styles.valueCardTitle}>Valor de la liquidacion</h2>
            <h3 className={styles.valueCardValue}>
              {fixMoney(
                carpeta.demanda.liquidacion
              )}
            </h3>
          </div>
        )}


        <div className={styles.valueCard}>
          <h2 className={styles.valueCardTitle}>Tipo de Proceso</h2>
          <h3 className={styles.valueCardValue}>{carpeta.tipoProceso}</h3>
        </div>
        {carpeta.demanda?.notificacion && (
          <Suspense fallback={<Loader />}>
            <NotificacionComponent notificacion={carpeta.demanda.notificacion} />
          </Suspense>
        )}

        <div className={layout.sectionColumn}>
          <Suspense fallback={<Loader />}>
            {juzgado
              ? (
                  <JuzgadoComponent juzgado={juzgado} />
                )
              : (
                  <JuzgadoErrorComponent />
                )}
          </Suspense>
        </div>
      </div>
      <div className={layout.sectionRow}>
        <Suspense fallback={<Loader />}>
          <ProcesosComponent
            llaveProceso={llaveProceso}
            numero={Number(
              numero
            )}
          />
        </Suspense>
      </div>
      <div className={layout.sectionColumn}>
        <Suspense fallback={<Loader />}>
          <DeudorFormComponent />
        </Suspense>
      </div>

      <div className={layout.sectionColumn}>
        <Suspense fallback={<Loader />}>
          <InputSection
            key={numero}
            name={'llaveProceso'}
            title={'Numero de expediente'}
            type={'text'}
          />
        </Suspense>
      </div>
      <div className={ layout.sectionColumn }>{ idProcesoContent }</div>
      {/*  <div style={ {
        gridArea: 'span 2 / span 4',
        overflow: 'scroll'

      }}
      > */}
      <Suspense fallback={<Loader />}>
        <AvailableProcesosByName nombre={carpeta.nombre} />
      </Suspense>
      {/*  </div> */}
    </>
  );
}
