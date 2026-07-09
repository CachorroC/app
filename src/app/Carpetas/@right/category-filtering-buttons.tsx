'use client';

import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { ColumnFilterDropdown } from './column-filter-dropdown';

export default function CategoryFilteringButtons() {
  const dispatchCarpetas = useCarpetaSortDispatch();

  const {
    completeCarpetas, filters
  } = useCarpetaSort();

  const categories = [
    ...new Set( completeCarpetas.map( ( c ) => {
      return c.category;
    } ), ),
  ];

  return (
    <ColumnFilterDropdown
      label="Categoría"
      options={categories}
      selected={filters.category ?? new Set()}
      onChange={( values ) => {
        return dispatchCarpetas( {
          type  : 'set-filter',
          column: 'category',
          values,
        } );
      }}
    />
  );
}
