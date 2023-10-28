
import { notasCollection } from '#@/lib/connection/mongodb';
import { notasConvert } from '#@/lib/types/notas';
import { NotaComponent } from 'components/Nota/server';
import { Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import { getNotas } from '#@/lib/project/utils/Notas/getNotas';

export async function MonNotas () {
  const collection = await notasCollection();

  const notasRaw = await collection.find()
    .toArray();


  const notas = notasConvert.toMonNotas(
    notasRaw
  );

  return (  <>
    {notas.map(
      (
        nota
      ) => {
        return (
          <NotaComponent
            key={nota.id}
            notaRaw={nota}
          />
        );
      }
    )}
  </> );
}

export default function Page () {
  return (
    <>

      <Suspense fallback={<Loader/>}>
        <PrismaNotas />
      </Suspense>
    </>
  );
}

export  async function PrismaNotas() {

  const notas = await getNotas();

  return (  <>
    {notas.map(
      (
        nota
      ) => {
        return (
          <NotaComponent
            key={nota.id}
            notaRaw={nota}
          />
        );
      }
    )}
  </> );
}