'use client';
import { useNotaSort } from '#@/app/context/notas-sort-context';
import { usePathname } from 'next/navigation';
import { Task } from './nota';


export function NotasList() {
      const rawNotas = useNotaSort();

      const pathname = usePathname();

      const notas = [ ...rawNotas ].filter(
        (
          nota
        ) => {
                  return nota.pathname === pathname;
        }
      );
      return (
        <>
          {notas.map(
            (
              nota
            ) => {
                      return (
                        <Task
                          key={nota.id}
                          task={nota}
                        />
                      );
            }
          )}
        </>
      );
}
