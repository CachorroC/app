import { cache } from 'react';
import 'server-only';
import clientPromise, { carpetasCollection } from '../connection/mongodb';
import { sleep } from '../project/helper';
import { Actuacion, ConsultaActuacion } from '../types/actuaciones';
import { MonCarpeta } from '../types/carpetas';
import * as fs from 'fs/promises';

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
      `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
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

    const {
      actuaciones 
    } = json;

    return actuaciones;
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

export async function getActuaciones(
  {
    carpeta,
    index,
  }: {
  carpeta: MonCarpeta;
  index: number;
} 
) {
  if ( !carpeta.idProceso ) {
    return null;
  }

  const actuaciones = await fetchActuaciones(
    carpeta.idProceso, index 
  );

  if ( actuaciones ) {
    const ultimaActuacion = actuaciones[ 0 ];

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
  }

  return actuaciones;
}

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
    const carpetasColl = await carpetasCollection();

    const updateCarpetawithActuaciones = await carpetasColl.updateOne(
      {
        idProceso: idProceso,
      },
      {
        $set: {
          fecha: new Date(
            actuaciones[ 0 ].fechaActuacion 
          ),
          ultimaActuacion: actuaciones[ 0 ],
        },
      },
      {
        upsert: true,
      },
    );

    if (
      updateCarpetawithActuaciones.modifiedCount > 0
      || updateCarpetawithActuaciones.upsertedCount > 0
    ) {
      console.log(
        `se modificaron ${ updateCarpetawithActuaciones.modifiedCount } carpetas y se insertaron ${ updateCarpetawithActuaciones.upsertedCount } carpetas`,
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