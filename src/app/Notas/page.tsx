
import { NotaComponent } from 'components/Nota/server';
import { Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import { getNotas } from '#@/lib/project/utils/Notas/getNotas';



export default function Page () {
  return (
    <>

      <Suspense fallback={<Loader/>}>
        <PrismaNotas />
      </Suspense>
    </>
  );
}


async function PrismaNotas() {

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