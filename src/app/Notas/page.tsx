'use client';
import { NotaComponent } from 'components/Nota/server';
import { useNotaSort } from '../context/notas-sort-context';

export default function PrismaNotas() {
      const notas = useNotaSort();

      return (
        <>
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
        </>
      );
}
