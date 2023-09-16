
import { monNota } from '#@/lib/types/notas';
import { Nota } from 'components/Nota/server';

async function getData() {
  const res = await fetch(
    '/api/Notas', {
      next: {
        tags: [
          'notas'
        ]
      }
    }
  );

  if ( !res.ok ) {
    throw new Error(
      'Failed to fetch data'
    );
  }

  const response = ( await res.json() ) as monNota[];

  return response;
}

export default async function PageNotas() {
  const notas = await getData();

  return (
    <>
      {notas.map(
        (
          NotaM, index, arr
        ) => {
          const {
            _id, llaveProceso, nota, pathname, tareas, fecha
          } = NotaM;

          return <Nota notaRaw={NotaM} i={index} key={_id} arr={arr} />;
        }
      )}
    </>
  );
}
