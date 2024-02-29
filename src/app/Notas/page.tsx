'use client';
import { useNotaSort } from '../Context/notas-sort-context';
import { Nota } from './nota';
import { OutputDateHelper } from '#@/lib/project/date-helper';

export default function PrismaNotas() {
      const notas = useNotaSort();

      return (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Numero</th>
              <th>contenido</th>
              <th>children</th>
              <th>eliminar</th>
            </tr>
          </thead>
          <tbody>
            {notas.map(
              (
                nota
              ) => {
                        return (

                          <Nota key={ nota.id } nota={ nota } >
                            <td>{OutputDateHelper(
                              nota.createdAt
                            )}</td>
                          </Nota>

                        );
              }
            ) }
          </tbody>
        </table>
      );
}
