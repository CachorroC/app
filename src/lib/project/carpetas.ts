import { ObjectId } from 'mongodb';
import { cache } from 'react';
import clientPromise, { carpetasCollection, pruebasCollection } from '#@/lib/connection/mongodb';
import { IntCarpeta, carpetaConvert } from 'types/carpetas';

export const getCarpetasByllaveProceso = cache(
  async (
    llaveProceso: string
  ) => {
    const client = await clientPromise;

    if ( !client ) {
      throw new Error(
        'no hay cliente mongólico'
      );
    }

    const db = client.db(
      'RyS'
    );

    const collection = db.collection<IntCarpeta>(
      'Pruebas'
    );

    const carpetasRaw = await collection
      .find(
        {
          llaveProceso: llaveProceso,
        }
      )
      .sort(
        {
          fecha: 1,
        }
      )
      .allowDiskUse()
      .toArray();

    if ( !carpetasRaw ) {
      return null;
    }

    const carpetas = carpetaConvert.toMonCarpetas(
      carpetasRaw
    );

    return carpetas;
  }
);

export const getCarpetaByllaveProceso = cache(
  async (
    llaveProceso: string
  ) => {
    const collection = await carpetasCollection();

    const carpetaRaw = await collection.findOne(
      {
        $or: [
          {
            llaveProceso: llaveProceso
          },
          {
            'demanda.expediente': llaveProceso
          }
        ]
      },      {
        sort: {
          fecha: 1,
        },
      },
    );

    if ( !carpetaRaw ) {
      return null;
    }

    const carpeta = carpetaConvert.toMonCarpeta(
      carpetaRaw
    );

    return carpeta;
  }
);

export const getCarpetaById = cache(
  async (
    _id: string
  ) => {
    const client = await clientPromise;

    if ( !client ) {
      throw new Error(
        'no hay cliente mongólico'
      );
    }

    const db = client.db(
      'RyS'
    );

    const collection = db.collection<IntCarpeta>(
      'Pruebas'
    );

    const Carpeta = await collection.findOne(
      {
        _id: new ObjectId(
          _id
        ),
      }
    );

    if ( !Carpeta ) {
      return null;
    }

    const carpetas = carpetaConvert.toMonCarpeta(
      Carpeta
    );

    return carpetas;
  }
);

export const getCarpetabyNumero = cache(
  async (
    numero: number
  ) => {
    const collection = await pruebasCollection();

    const carpeta = await collection.findOne(
      {
        numero: numero,
      }, {
        sort: {
          fecha: 1
        }
      }
    );

    if ( !carpeta ) {
      return null;
    }

    const Carpeta = carpetaConvert.toMonCarpeta(
      carpeta
    );

    return Carpeta;
  }
);

export const getCarpetaByidProceso = cache(
  async (
    idProceso: number
  ) => {
    const collection = await carpetasCollection();

    const carpeta = await collection.findOne(
      {
        idProceso: idProceso,
      },
      {
        sort: {
          fecha: 1,
        },
      },
    );

    if ( !carpeta ) {
      return null;
    }

    const Carpeta = carpetaConvert.toMonCarpeta(
      carpeta
    );

    return Carpeta;
  }
);
