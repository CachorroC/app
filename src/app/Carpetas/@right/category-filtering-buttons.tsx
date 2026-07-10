'use client';

import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { getCategoryMeta } from '#@/components/Carpetas/client/carpeta-meta';
import { FacetGroup } from './facet-group';

export default function CategoryFilteringButtons() {
  const dispatchCarpetas = useCarpetaSortDispatch();

  const {
    completeCarpetas, filters
  } = useCarpetaSort();

  const categories = [
    ...new Set( completeCarpetas.map( ( c ) => {
      return c.category;
    } ), ),
  ].sort();

  const selected = filters.category ?? new Set();

  const toggle = ( value: string ) => {
    const next = new Set( selected );

    if ( next.has( value ) ) {
      next.delete( value );
    } else {
      next.add( value );
    }

    return dispatchCarpetas( {
      type  : 'set-filter',
      column: 'category',
      values: next,
    } );
  };

  return (
    <FacetGroup
      label="Categoría"
      options={categories.map( ( category ) => {
        const meta = getCategoryMeta( category );

        return {
          value   : category,
          label   : meta.label,
          selected: selected.has( category ),
          color   : meta.color,
          onClick : () => {
            return toggle( category );
          },
        };
      } )}
    />
  );
}
