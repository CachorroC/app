'use client';
import { NotaComponent } from '#@/components/Nota/server';
import { useNotaSort } from '../context/notas-sort-context';

// eslint-disable-next-line @next/next/no-async-client-component
export default function Page() {
  const notas = useNotaSort();

  return (
    <>

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
    </>
  );
}
