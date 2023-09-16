import { NewNota } from 'components/Nota/client';
import { Nota } from 'components/Nota/server';
import { getNotasByllaveProceso } from '#@/lib/project/notas';
import { Fragment } from 'react';

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

  return (
    <>
      <NewNota llaveProceso={params.llaveProceso} key={params.llaveProceso} />
      {notas.map(
        (
          nota, index, arr 
        ) => {
          return <Nota notaRaw={nota} key={nota._id} i={index} arr={arr} />;
        } 
      )}
    </>
  );
}
