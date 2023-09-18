

import { NotaComponent } from '#@/components/Nota/server';
import getNotas from '#@/lib/project/getNotas';

export default async function Page () {
  const notas = await getNotas();

  return (
    <>
      { notas.map(
        (
          nota, i, arr
        ) => {
          return (
            <NotaComponent key={nota.id} notaRaw={ nota } />
          );
        }
      )}
    </>
  );
}