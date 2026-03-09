import { CarpetasSortButtons } from '#@/app/Carpetas/@right/carpetasButtonsSort';
import { ResetButtonSorter } from './reset-button';
import CategoryFilteringButtons from './category-filtering-buttons';
import CiudadFilteringButtons from './ciudad-filter';
import { InputSearchBar } from '#@/components/layout/InputSearchBar';
import { actionButtons, tableControls } from './styles.module.css';

const options = [
  {
    name : 'direccion de sorteo',
    value: 'dir',
    items: [
      'asc',
      'dsc'
    ],
  },
  {
    name : 'valor del sorteo',
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
      <div className={tableControls}>
        <InputSearchBar />

        <div className={actionButtons}>
          <ResetButtonSorter />
          <CarpetasSortButtons options={options} />
          <CategoryFilteringButtons />

          <CiudadFilteringButtons />
        </div>
      </div>
    </>
  );
}
