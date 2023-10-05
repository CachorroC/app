import { cache } from 'react';
import 'server-only';
import { carpetasCollection } from '../connection/mongodb';
import { sleep } from '../project/helper';
import { Actuacion, ConsultaActuacion, Data, Message } from '../types/actuaciones';
import { MonCarpeta } from '../types/carpetas';


export async function fetchActuaciones(
  idProceso: number, index: number
) {
  try {
    await sleep(
      index
    );

    const request = await fetch(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`, {
        next: {
          revalidate: 32400,
          tags      : [
            'actuaciones'
          ]
        }
      }
    );

    if ( !request.ok ) {
      const json = ( await request.json() ) as ConsultaActuacion;
      return json;
    }

    const data = ( await request.json() ) as Data;

    const {
      actuaciones
    } = data;

    await updateActuaciones(
      actuaciones
    );

    const json:ConsultaActuacion = {
      StatusCode: request.status,
      Message   : ( request.statusText ) as Message,
      data      : data
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
      Message   : ( JSON.stringify(
        error
      ) )as Message
    };
  }
}

export const getActuaciones = cache(
  async (
    {
      carpeta, index
    }: { carpeta: MonCarpeta; index: number }
  ) => {

    try {
      const actuacionesMap = new Map<number, Actuacion[]>();

      if ( !carpeta.idProcesos || carpeta.idProcesos.length === 0 ) {
        throw new Error(
          'no existen idProcesos en este proceso'
        );
      }

      for ( const idProceso of carpeta.idProcesos ) {
        const consultaActuaciones = await fetchActuaciones(
          idProceso, index
        );

        if ( !consultaActuaciones.data ) {
          continue;
        }

        const {
          data
        } = consultaActuaciones;

        const {
          actuaciones
        } = data;

        const [
          ultimaActuacion
        ] = actuaciones;

        const incomingDate = new Date(
          ultimaActuacion.fechaActuacion
        )
          .getTime();

        const savedDate = carpeta.fecha
          ?  new Date(
            carpeta.fecha
          )
            .getTime()
          : null;
        console.log(
          savedDate
        );
        console.log(
          incomingDate
        );

        if ( !savedDate || savedDate < incomingDate ) {

          await updateActuaciones(
            actuaciones

          );
        }

        actuacionesMap.set(
          idProceso, actuaciones
        );
      }

      const Iterablereturn = Array.from(
        actuacionesMap.values()
      );
      return Iterablereturn.flat();
    } catch ( error ) {
      if ( error instanceof Error ) {
        console.log(
          error.message
        );
      }

      return null;
    }
  },
);

export const updateActuaciones = cache(
  async (
    actuaciones: Actuacion[]
  ) => {
    try {
      if ( actuaciones.length === 0 ) {
        throw new Error(
          'no hay actuaciones en el array'
        );

      }

      const [
        ultimaActuacion
      ] = actuaciones;

      const carpetasColl = await carpetasCollection();

      const carpeta = await carpetasColl.findOne(
        {
          llaveProceso: ultimaActuacion.llaveProceso
        }
      );

      const incomingDate = new Date(
        ultimaActuacion.fechaActuacion
      )
        .getTime();

      const savedDate = carpeta?.fecha
        ?  new Date(
          carpeta.fecha
        )
          .getTime()
        : null;
      console.log(
        `saved date: ${ savedDate }`
      );
      console.log(
        `incoming date: ${ incomingDate }`
      );

      if ( !savedDate || savedDate < incomingDate ) {


        const updateCarpetawithActuaciones = await carpetasColl.updateOne(
          {
            llaveProceso: ultimaActuacion.llaveProceso,
          },
          {
            $set: {
              fecha: new Date(
                ultimaActuacion.fechaActuacion
              ),
              ultimaActuacion: ultimaActuacion,
            },
          },
          {
            upsert: false,
          },
        );

        if ( !updateCarpetawithActuaciones ) {
          throw new Error(
            'hubo un error en la peticion de actualizacion de la carpeta'
          );
        }

        if (
          updateCarpetawithActuaciones.modifiedCount > 0
      || updateCarpetawithActuaciones.upsertedCount > 0
        ) {
          console.log(
            `se modificaron ${ updateCarpetawithActuaciones.modifiedCount } carpetas y se insertaron ${ updateCarpetawithActuaciones.upsertedCount } carpetas`,
          );
        }
      }




      throw new Error(
        'llego al final del actualizador '
      );

    } catch ( error ) {
      if ( error instanceof Error ) {
        console.log(
          error.message
        );
      }

      console.log(
        JSON.stringify(
          error
        )
      );
    }
  },
);

export const deleteProcesoPrivado = async (
  {
    idProceso,
  }: {
  idProceso: number;
}
) => {
  const collection = await carpetasCollection();

  const deleteOne = await collection.deleteOne(
    {
      idProceso: idProceso,
    }
  );

  if ( deleteOne.deletedCount > 0 ) {
    return true;
  }

  return false;
};
