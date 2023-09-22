import { Calendar } from '#@/components/Calendar/main';
import { CarpetaCard } from '#@/components/Card/carpeta';
import { Loader } from '#@/components/Loader';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import { NotaComponent } from '#@/components/Nota/server';
import { getCarpetaByllaveProceso } from '#@/lib/project/carpetas';
import getNotas from '#@/lib/project/getNotas';
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

  const notas = await getNotas();

  const lengthDef = notas.length;

  const Carpeta = await getCarpetaByllaveProceso(
    params.llaveProceso
  );

  return (
    <>
      {Carpeta && (
        <>
          <Suspense fallback={<Loader />}>
            <Calendar date={Carpeta.fecha?.toLocaleString()} />
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
        llaveProceso={params.llaveProceso}
        key={params.llaveProceso}
        cod={lengthDef +1}
      />
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
