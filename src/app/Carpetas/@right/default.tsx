import { CarpetasSortButtons } from '#@/components/Carpetas/client/carpetasButtonsSort';
import { Loader } from '#@/components/Loader';
import { Suspense } from 'react';
import { ResetButtonSorter } from '../UltimasActuaciones/reset-button';


export default function Default () {

      const options = [ {
        name : 'sort direction',
        value: 'dir',
        items: [ 'asc', 'dsc' ],
      },
      {
        name : 'sorting key',
        value: 'sortingKey',
        items: [
          'fecha',
          'nombre',
          'id',
          'updatedAt',
          'numero',
          'category',
          'tipoProceso',
        ],
      }, ];
      return (
        <>
          <Suspense fallback={<Loader />}>
            <CarpetasSortButtons options={ options } />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <ResetButtonSorter />
          </Suspense>
        </>
      );
}
