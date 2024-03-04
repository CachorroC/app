import { CarpetasSortButtons } from '#@/components/Carpetas/client/carpetasButtonsSort';
import { Loader } from '#@/components/Loader';
import { Suspense } from 'react';
import { ResetButtonSorter } from '../UltimasActuaciones/reset-button';
import CategoryFilteringButtons from './category-filtering-buttons';
import { CompleteCarpetasRows } from '#@/components/Carpetas/client/carpetasList';


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
          'revisado',
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
          <ResetButtonSorter />
          <CarpetasSortButtons options={ options } />
          <CategoryFilteringButtons />
          <Suspense fallback={ <Loader /> }>
            <CompleteCarpetasRows />
          </Suspense>
        </>
      );
}
