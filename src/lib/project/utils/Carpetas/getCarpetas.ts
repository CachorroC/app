import { pruebasCollection } from '#@/lib/connection/mongodb';
import { carpetaConvert } from '#@/lib/types/carpetas';
import { cache } from 'react';

export const getCarpetas = cache(
  async() => {
    const collection = await pruebasCollection();

    const carpetasRaw = await collection
      .find(
        {}
      )
      .sort(
        {
          fecha: 1,
        }
      )
      .allowDiskUse()
      .toArray();



    const carpetas = carpetaConvert.toMonCarpetas(
      carpetasRaw
    );


    return carpetas;
  }
);
