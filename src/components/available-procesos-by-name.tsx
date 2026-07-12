import { fetchWithSmartRetry } from '#@/lib/fetchWithSmartRetry';
import { consultaProcesosPorRazonSocial } from '#@/lib/project/utils/main';
import { ConsultaProcesos, outProceso } from '#@/lib/types/procesos';
import { Suspense } from 'react';
import SujetosProcesales from './Proceso/sujetos-procesales';
import { ProcesoTableDetalleComponent } from './Proceso/proceso-detalles-component';
import { TableLoader } from './Loader/main-loader';
import { JuzgadoComponent } from './Proceso/juzgado-component';
import { JuzgadoClass } from '#@/lib/models/juzgado';

export async function AvailableProcesosByName( {
  nombre 
}: { nombre: string } ) {
  const urlNameMaker = consultaProcesosPorRazonSocial( nombre );

  const fetchProc = await fetchWithSmartRetry( urlNameMaker.toString() );

  if ( !fetchProc.ok ) {
    return (
      <div>
        <h1> No hay procesos disponibles</h1>
      </div>
    );
  }

  const jsonString = ( await fetchProc.json() ) as ConsultaProcesos;

  return (
    <table>
      <thead>
        <tr>
          <th>Sujetos Procesales</th>
          <th>Despacho</th>
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
        {jsonString.procesos.map( ( proceso ) => {
          const outgoinProceso: outProceso = {
            ...proceso,
            juzgado: JuzgadoClass.fromProceso( proceso ),
          };

          return (
            <tr key={proceso.idProceso}>
              <td>
                <SujetosProcesales
                  sujetosProcesalesRaw={proceso.sujetosProcesales}
                />
              </td>
              <td>
                <p>{proceso.despacho}</p>
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
        } )}
      </tbody>
    </table>
  );
}
