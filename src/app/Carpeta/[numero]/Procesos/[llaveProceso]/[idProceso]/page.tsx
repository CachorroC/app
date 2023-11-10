import {  fetchActuaciones } from '#@/lib/Actuaciones';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';

export async function generateStaticParams () {
  const mapperCarpetas = new Set<{ numero: string; llaveProceso: string;  idProceso: string}>();

  const products = await getCarpetas();

  const noKey = 'noKey';

  for ( const carpeta of products ) {
    const {
      llaveProceso, idProcesos, numero
    } = carpeta;

    if ( !llaveProceso ) {
      mapperCarpetas.add(
        {
          numero: String(
            numero
          ),
          llaveProceso: noKey,
          idProceso   : noKey,
        }
      );
      continue;
    } else if ( !idProcesos || idProcesos.length === 0 ) {
      mapperCarpetas.add(
        {
          numero: String(
            numero
          ),
          llaveProceso: llaveProceso,
          idProceso   : noKey,
        }
      );
      continue;
    } else if ( idProcesos.length === 1 ) {
      mapperCarpetas.add(
        {
          numero: String(
            numero
          ),
          llaveProceso: llaveProceso,
          idProceso   : String(
            idProcesos[ 0 ]
          ),
        }
      );
      continue;
    }

    idProcesos.forEach(
      (
        idProceso
      ) => {
        mapperCarpetas.add(
          {
            numero: String(
              numero
            ),
            llaveProceso: llaveProceso,
            idProceso   : String(
              idProceso
            ),
          }
        );
      }
    );
    continue;
  }

  return Array.from(
    mapperCarpetas
  );
}

export default async function Page(
  {
    params,
  }: {
  params: {
    numero: string;
      llaveProceso: string;
    idProceso: number;
  };
}
) {


  const consultaActuaciones = await fetchActuaciones(
    params.idProceso,
    Number(
      params.numero
    )

  );


  return (

    <>
      <h1>{consultaActuaciones.Message}</h1>
      {consultaActuaciones.actuaciones && consultaActuaciones.actuaciones.map(
        (
          actuacion, index
        ) => {
          return (
            <ActuacionComponent
              key={ index } incomingActuacion={actuacion } initialOpenState={ true} />
          );
        }
      )}

    </>
  );
}
