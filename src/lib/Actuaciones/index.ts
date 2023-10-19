import 'server-only';
import { cache } from 'react';
import { carpetasCollection } from '../connection/mongodb';
import { sleep } from 'project/helper';
import { intActuacion, ConsultaActuacion, Data, Message } from 'types/actuaciones';
import { getCarpetaByllaveProceso } from '../project/carpetas';

export async function fetchActuaciones(
  idProceso: number | string, index: number
) {
  try {
    await sleep(
      index
    );

    const request = await fetch(
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
      {
        next: {
          revalidate: 32400,
          tags      : [
            'actuaciones'
          ],
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
    let idP;

    if ( typeof idProceso === 'string' ) {
      idP = parseInt(
        idProceso
      );
    } else {
      idP = idProceso;
    }

    console.log(
      `parsed idProceso: ${ idP }
      with a type of ${ typeof idP }`
    );
    await updateActuaciones(
      actuaciones, idP
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

export const getActuaciones = cache(
  async (
    {
      idProceso, index
    }: { idProceso: number| string; index: number }
  ) => {
    try {
      const consultaActuaciones = await fetchActuaciones(
        idProceso, index
      );

      if (
        !consultaActuaciones.actuaciones
        || consultaActuaciones.actuaciones.length === 0
      ) {
        return null;
      }

      const {
        actuaciones
      } = consultaActuaciones;

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

export async function updateActuaciones (
  actuaciones: intActuacion[], idProceso: number
) {
  try {
    if ( actuaciones.length === 0 ) {
      throw new Error(
        'no hay actuaciones en el array'
      );
    }

    const [
      ultimaActuacion
    ] = actuaciones;



    const carpeta = await getCarpetaByllaveProceso(
      ultimaActuacion.llaveProceso,
    );

    const incomingDate = new Date(
      ultimaActuacion.fechaRegistro
    )
      .getTime();

    const savedDate = carpeta?.fecha
      ? new Date(
        carpeta.fecha
      )
        .getTime()
      : null;

    if ( savedDate === incomingDate ) {
      return;
    }

    if ( !savedDate || savedDate < incomingDate ) {
      const carpetasColl = await carpetasCollection();

      const updateCarpetawithActuaciones = await carpetasColl.updateOne(
        {
          $or: [
            {
              llaveProceso: carpeta
                ? carpeta.llaveProceso
                : ultimaActuacion.llaveProceso
            },
            {
              idProcesos: idProceso

            }
          ]
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
        return;
      }

      if (
        updateCarpetawithActuaciones.modifiedCount > 0
        || updateCarpetawithActuaciones.upsertedCount > 0
      ) {
        console.log(
          `se modificaron ${ updateCarpetawithActuaciones.modifiedCount } carpetas y se insertaron ${ updateCarpetawithActuaciones.upsertedCount } carpetas: ${ updateCarpetawithActuaciones.matchedCount }`
        );

      }
    }

    return;
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
}


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
