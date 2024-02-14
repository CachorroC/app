'use client';
import { useNotaSort } from '../Context/notas-sort-context';
import layout from '#@/styles/layout.module.css';
import { Nota } from './nota';

export default function PrismaNotas() {
      const notas = useNotaSort();

      return (
        <ul>
          {notas.map(
            (
              nota 
            ) => {
                      return (
                        <li
                          key={nota.id}
                          className={layout.sectionColumn}
                        >
                          <Nota nota={nota} />
                        </li>
                      );
            } 
          )}
        </ul>
      );
}
