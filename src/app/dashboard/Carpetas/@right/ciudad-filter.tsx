'use client';

import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { DEFAULT_CIUDAD } from '#@/app/Hooks/useCarpetasreducer';
import { FacetGroup } from './facet-group';

export default function CiudadFilteringButtons() {
  const dispatchCarpetas = useCarpetaSortDispatch();

  const {
    completeCarpetas, filters 
  } = useCarpetaSort();

  const ciudades = [
    ...new Set( completeCarpetas.map( ( c ) => {
      return c.ciudad ?? DEFAULT_CIUDAD;
    } ), ),
  ].sort();

  const selected = filters.ciudad ?? new Set();

  const toggle = ( value: string ) => {
    const next = new Set( selected );

    if ( next.has( value ) ) {
      next.delete( value );
    } else {
      next.add( value );
    }

    return dispatchCarpetas( {
      type  : 'set-filter',
      column: 'ciudad',
      values: next,
    } );
  };

  return (
    <FacetGroup
      label="Ciudad"
      options={ciudades.map( ( ciudad ) => {
        return {
          value   : ciudad,
          label   : ciudad,
          selected: selected.has( ciudad ),
          onClick : () => {
            return toggle( ciudad );
          },
        };
      } )}
    />
  );
}
