import { fetchActuaciones } from '#@/lib/project/utils/Actuaciones';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { unstable_noStore as noStore } from 'next/cache';
import { Suspense } from 'react';
import ActuacionLoader from '#@/components/Card/actuacion-loader';
import typography from '#@/styles/fonts/typography.module.css';
import styles from '#@/components/Card/card.module.css';
import { fixFechas } from '#@/lib/project/helper';

/*
async function getData(
  idProceso: number, index: number
) {
  try {
    await sleep(
      index
    );

    const request = await fetch(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
      {
        next: {
          revalidate: 86400,
        },
      },
    );

    if ( !request.ok ) {
      const json = ( await request.json() ) as ConsultaActuacion;
      return json;
    }

    const data = ( await request.json() ) as Data;

    const {
      actuaciones
    } = data;

    console.log(
      `parsed idProceso: ${ idProceso } with a type of ${ typeof idProceso }`
    );
    await updateActuaciones(

      actuaciones, idProceso

    );

    const json: ConsultaActuacion = {
      StatusCode : request.status,
      Message    : request.statusText as Message,
      actuaciones: actuaciones,
    };
    return json;
  } catch ( error ) {
    if ( error instanceof Error ) {
      console.log(
        `${ idProceso }: error en la fetchActuaciones => ${ error.name } : ${ error.message }`,
      );
    }

    console.log(
      `${ idProceso }: : error en la  fetchActuaciones  =>  ${ error }`
    );

    return {
      StatusCode: 404,
      Message   : JSON.stringify(
        error
      ) as Message,
    };
  }
}

 */
export async function FechaActuacionComponent(
  {
    idProceso,
    index,
  }: {
    idProceso: number;
    index: number;
  } 
) {
      noStore();

      const consultaActuaciones = await fetchActuaciones(
        idProceso, index 
      );

      if ( !consultaActuaciones ) {
        return (
          <div className={styles.containerFilledDisabled}>
            <span className={typography.headlineSmall}>No Hay Actuaciones</span>
          </div>
        );
      }

      const [ ultimaActuacion ] = consultaActuaciones;

      return (
        <Suspense fallback={<ActuacionLoader />}>
          <ActuacionComponent
            key={ultimaActuacion.idRegActuacion}
            incomingActuacion={ultimaActuacion}
          />
        </Suspense>
      );
}

export async function FechaActuacionComponentAlt(
  {
    idProceso,
    index,
  }: {
    idProceso: number;
    index: number;
  } 
) {
      const consultaActuaciones = await fetchActuaciones(
        idProceso, index 
      );

      if ( !consultaActuaciones || consultaActuaciones.length === 0 ) {
        return (
          <>
            <td>
              <h5 className={` ${ styles.actuacion } ${ typography.titleSmall }`}>
            Sin registro
              </h5>
              <sub className={typography.labelSmall}>0 de 0</sub>
            </td>
            <td>
              <sub className={typography.headlineMedium}>
            por favor revise que el numero de expediente esté bien o si la
            informacion la brinda el juzgado por otro canal
              </sub>
            </td>
          </>
        );
      }

      const [ ultimaActuacion ] = consultaActuaciones;

      const {
        actuacion, fechaActuacion, anotacion, consActuacion, cant 
      }
    = ultimaActuacion;

      return (
        <>
          <td>
            <h5 className={` ${ styles.actuacion } ${ typography.titleSmall }`}>
              {actuacion}
            </h5>
            <sub
              className={typography.labelSmall}
            >{`${ consActuacion } de ${ cant }`}</sub>
          </td>
          <td>
            <sub
              className={typography.labelMedium}
            >{`actuacion registrada el ${ fixFechas(
                fechaActuacion 
              ) }`}</sub>
            {anotacion && (
              <p className={` ${ styles.anotacion } ${ typography.bodyMedium }`}>
                {anotacion}
              </p>
            )}
          </td>
        </>
      );
}
