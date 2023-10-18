
import { NotaComponent } from '#@/components/Nota/server';

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

  return res.json();
}

export default async function Page() {
  const notas = ( await getData() ) as monNota[];

  return (  <>
    {notas.map(
      (
        nota
      ) => {
        return (
          <NotaComponent
            key={nota._id}
            notaRaw={nota}
          />
        );
      }
    )}
  </> );
}