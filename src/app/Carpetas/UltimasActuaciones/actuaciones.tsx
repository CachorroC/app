
import typography from '#@/styles/fonts/typography.module.css';
import styles from '#@/components/Card/card.module.css';
import { fixFechas } from '#@/lib/project/helper';
import { getActuaciones } from '#@/lib/project/utils/Actuaciones/actuaciones-main';
import { ActuacionesContainer } from '#@/components/Actuaciones/actuaciones-list';

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
        `${ idProceso }: error en la getActuaciones => ${ error.name } : ${ error.message }`,
      );
    }

    console.log(
      `${ idProceso }: : error en la  getActuaciones  =>  ${ error }`
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
      const promiseActs = getActuaciones(
        {
          index    : index,
          idProceso: idProceso
        }
      );

      return (

        <ActuacionesContainer
          actuacionesPromise={promiseActs}
          key={idProceso}
        />
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

      const actuaciones = await getActuaciones(
        {
          index    : index,
          idProceso: idProceso
        }
      );

      if ( !actuaciones || actuaciones.length === 0 ) {


        return (
          <>
            <h5 style={{
              backgroundColor: 'var(--error-container)',
              color          : 'var(--on-error-container)'
            }} className={` ${ styles.actuacion } ${ typography.titleSmall }`}>
            Sin Actuaciones
            </h5>
            <sub className={typography.labelSmall}>0 de 0</sub>
            <sub className={typography.labelMedium}>
              {`Existe el idProceso ${ idProceso } pero este no contiene actuaciones o arrojó un error`}
            </sub>
          </>
        );
      }

      const [ ultimaActuacion ] = actuaciones;

      const {
        actuacion, fechaActuacion, anotacion, consActuacion, cant
      }
    = ultimaActuacion;

      return (
        <>

          <h5 className={` ${ styles.actuacion } ${ typography.titleSmall }`}>
            {actuacion}
          </h5>
          <sub
            className={typography.labelSmall}
          >{`${ consActuacion } de ${ cant }`}</sub>

          <sub
            className={typography.labelMedium}
          >{ anotacion
              ? anotacion
              : `actuacion registrada el ${ fixFechas(
                fechaActuacion
              ) }`}</sub>

        </>
      );
}
