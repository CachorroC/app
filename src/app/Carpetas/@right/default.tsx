import { CarpetasSortButtons } from '#@/app/Carpetas/@right/carpetasButtonsSort';
import { sectionColumn } from '#@/styles/layout.module.css';
import { ResetButtonSorter } from './reset-button';
import CategoryFilteringButtons from './category-filtering-buttons';
import CiudadFilteringButtons from './ciudad-filter';
import React from 'react';

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
      <section className={ sectionColumn }>

        <ResetButtonSorter />
        <CarpetasSortButtons options={ options } row={true} />
        <CategoryFilteringButtons row={false} />

        <CiudadFilteringButtons row={false} />

      </section>

    </>
  );
}
