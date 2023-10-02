import { cache } from 'react';
import 'server-only';
import { carpetasCollection } from '../connection/mongodb';
import { sleep } from '../project/helper';
import { Actuacion, ConsultaActuacion } from '../types/actuaciones';
import { MonCarpeta } from '../types/carpetas';
interface ErrorActuacion {
  StatusCode: number;
  Message: string;
}

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
      const json = ( await request.json() ) as ErrorActuacion;

      throw new Error(
        ` status: ${ request.status }, text: ${
          request.statusText
        }, json: ${ JSON.stringify(
          json
        ) }`,
      );
    }

    const json = ( await request.json() ) as ConsultaActuacion;

    return json;
  } catch ( error ) {
    if ( error instanceof Error ) {
      console.log(
        `${ idProceso }: error en la fetchActuaciones => ${ error.name } : ${ error.message }`,
      );

      return null;
    }
    console.log(
      `${ idProceso }: : error en la  fetchActuaciones  =>  ${ error }`
    );

    return null;
  }
}

export const getActuaciones = cache(
  async (
    {
      carpeta, index
    }: { carpeta: MonCarpeta; index: number }
  ) => {
    try {

      /*
    const limiteDownTimeServidor = new Date(
      '2023-09-20'
    );

    const today = new Date();
    console.log(
      today <= limiteDownTimeServidor
    );

    if ( today <= limiteDownTimeServidor ) {
      if ( !carpeta.ultimaActuacion ) {
        return null;
      }

      const temporaryArray = [];


      temporaryArray.push(
        carpeta.ultimaActuacion
      );

      return temporaryArray;



    } */

      if ( !carpeta.idProceso ) {
        return null;
      }

      const consultaActuaciones = await fetchActuaciones(
        carpeta.idProceso, index
      );

      if ( consultaActuaciones === null ) {
        throw new Error(
          'no pudimos resolver la peticion de acuaciones, intentalo nuevamente'
        );

      }

      const {
        actuaciones
      } = consultaActuaciones;

      const [
        ultimaActuacion
      ] = actuaciones;

      const newDate = new Date(
        ultimaActuacion.fechaActuacion
      )
        .toISOString();

      const oldDate = carpeta.fecha && new Date(
        carpeta.fecha
      )
        .toISOString();

      if ( oldDate !== newDate ) {
        await updateActuaciones(
          {
            idProceso  : carpeta.idProceso,
            actuaciones: actuaciones,
          }
        );
      }


      return actuaciones;
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
    {
      idProceso,
      actuaciones,
    }: {
    idProceso: number;
    actuaciones: Actuacion[];
  }
  ) => {
    try {
      const [
        ultimaActuacion
      ] = actuaciones;

      const carpetasColl = await carpetasCollection();

      const updateCarpetawithActuaciones = await carpetasColl.updateOne(
        {
          idProceso: idProceso,
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
          upsert: true,
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
