import { Calendar } from '#@/components/Calendar/main';
import { CarpetaCard } from '#@/components/Card/carpeta';
import { Loader } from '#@/components/Loader';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import { NotaComponent } from '#@/components/Nota/server';
import { getCarpetaByllaveProceso } from '#@/lib/project/carpetas';
import getNotas from '#@/lib/project/getNotas';
import { getNotasByllaveProceso } from '#@/lib/project/notas';
import {  Suspense } from 'react';

export default async function PageProcesosRightllaveProceso(
  {
    params,
  }: {
  params: {
    llaveProceso: string;
  };
}
) {
  const notas = await getNotasByllaveProceso(
    {
      llaveProceso: params.llaveProceso,
    }
  );

  const rawNotas = await getNotas();

  const lengthRawNotas = rawNotas.length;


  const Carpeta = await getCarpetaByllaveProceso(
    params.llaveProceso
  );

  return (
    <>
      {Carpeta && (
        <>
          <Suspense fallback={<Loader />}>
            <Calendar date={Carpeta.fecha} />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <CarpetaCard
              key={Carpeta._id}
              carpeta={Carpeta}
            />
          </Suspense>
        </>
      )}
      <NuevaNota
        llaveProceso={ params.llaveProceso }
        key={ params.llaveProceso } cod={ lengthRawNotas + 1  }      />
      {notas.map(
        (
          nota
        ) => {
          return (
            <NotaComponent
              notaRaw={nota}
              key={nota._id}
            />
          );
        }
      )}
    </>
  );
}
