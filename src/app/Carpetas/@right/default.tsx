import { CarpetasSortButtons } from '#@/components/Carpetas/client/carpetasButtonsSort';
import { ResetButtonSorter } from '../UltimasActuaciones/reset-button';
import CategoryFilteringButtons from './category-filtering-buttons';
import CiudadFilteringButtons from './ciudad-filter';

const options = [
  {
    name : 'sort direction',
    value: 'dir',
    items: [
      'asc',
      'dsc'
    ],
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
  },
];

export default function Default() {
  return (
    <>
      <ResetButtonSorter />
      <CarpetasSortButtons options={options} />
      <CategoryFilteringButtons row={ false } />
      <CiudadFilteringButtons row={false} />
    </>
  );
}
