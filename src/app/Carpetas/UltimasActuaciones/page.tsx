
import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import {  FechaActuacionComponentAlt } from './actuaciones';
import { CarpetaUltimaActuacionRow } from '#@/components/table/row';
import { IntAction, carpetasReducer } from '#@/app/hooks/useCarpetasreducer';

export default async function Page(
  {
    searchParams,
  }: {
    searchParams: {
      sort: 'asc' | 'dsc' | undefined;
      sortingKey: 'fecha' | 'numero' | 'nombre' | 'category' | 'id' | 'tipoProceso' | 'updatedAt' | undefined
    };
  }
) {
      const {
        sort, sortingKey
      } = searchParams;

      const action: IntAction = {
        type: 'sort',
        dir : sort
          ? sort
          : 'asc',
        sortingKey: sortingKey
          ? sortingKey
          : 'fecha'
      };

      const carpetasRaw = await getCarpetas();

      const carpetas = carpetasReducer(
        carpetasRaw, action
      );

      return (
        <table>
          <thead>
            <tr>
              <th>nombre</th>
              <th>numero</th>
              <th>revisado</th>
              <th>tipo de proceso</th>
              <th>terminado</th>
              <th>fecha de la última actuacion</th>
              <th>numero de expediente para copiar</th>
              <th>categoria</th>
              <th>ultima actuacion</th>
              <th>anotacion</th>
            </tr>
          </thead>
          <tbody>

            {carpetas.flatMap(
              (
                carpeta, index
              ) => {
                        const {
                          idProcesos, numero
                        } = carpeta;

                        if ( idProcesos.length === 0 ) {
                          return (


                            <CarpetaUltimaActuacionRow
                              carpeta={carpeta}
                              key={numero}
                            >
                              <td>sin actuacion</td>
                            </CarpetaUltimaActuacionRow>

                          );
                        }

                        return idProcesos.map(
                          (
                            idProceso
                          ) => {
                                    return (
                                      <CarpetaUltimaActuacionRow key={ idProceso } carpeta={ carpeta }>
                                        <FechaActuacionComponentAlt idProceso={ idProceso } index={ index } initialOpenState={ false } />
                                      </CarpetaUltimaActuacionRow>
                                    );
                          }
                        );
              }
            )}
          </tbody>

        </table>
      );
}
