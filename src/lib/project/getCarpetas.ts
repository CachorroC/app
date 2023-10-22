import { cache } from 'react';
import { pruebasCollection } from '../connection/mongodb';
import { carpetaConvert } from '../types/carpetas';

async function getCarpetas () {
  const collection = await pruebasCollection();

  const carpetasRaw = await collection
    .find(
      {}
    )
    .sort(
      {
        numero: 1,
      }
    )
    .allowDiskUse()
    .toArray();



  const carpetas = carpetaConvert.toMonCarpetas(
    carpetasRaw
  );


  return carpetas;
}

export default cache(
  getCarpetas
);
