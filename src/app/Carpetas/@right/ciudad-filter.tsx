'use client';

import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { DEFAULT_CIUDAD } from '#@/app/Hooks/useCarpetasreducer';
import { ColumnFilterDropdown } from './column-filter-dropdown';

export default function CiudadFilteringButtons() {
  const dispatchCarpetas = useCarpetaSortDispatch();

  const {
    completeCarpetas, filters
  } = useCarpetaSort();

  const ciudades = [
    ...new Set( completeCarpetas.map( ( c ) => {
      return c.ciudad ?? DEFAULT_CIUDAD;
    } ), ),
  ];

  return (
    <ColumnFilterDropdown
      label="Ciudad"
      options={ciudades}
      selected={filters.ciudad ?? new Set()}
      onChange={( values ) => {
        return dispatchCarpetas( {
          type  : 'set-filter',
          column: 'ciudad',
          values,
        } );
      }}
    />
  );
}
