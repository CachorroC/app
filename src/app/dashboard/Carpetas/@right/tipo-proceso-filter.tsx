'use client';

import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { FacetGroup } from './facet-group';

export default function TipoProcesoFilteringButtons() {
  const dispatchCarpetas = useCarpetaSortDispatch();

  const {
    completeCarpetas, filters 
  } = useCarpetaSort();

  const tipos = [
    ...new Set( completeCarpetas.map( ( c ) => {
      return c.tipoProceso;
    } ), ),
  ].sort();

  const selected = filters.tipoProceso ?? new Set();

  const toggle = ( value: string ) => {
    const next = new Set( selected );

    if ( next.has( value ) ) {
      next.delete( value );
    } else {
      next.add( value );
    }

    return dispatchCarpetas( {
      type  : 'set-filter',
      column: 'tipoProceso',
      values: next,
    } );
  };

  return (
    <FacetGroup
      label="Tipo de proceso"
      options={tipos.map( ( tipo ) => {
        return {
          value   : tipo,
          label   : tipo,
          selected: selected.has( tipo ),
          onClick : () => {
            return toggle( tipo );
          },
        };
      } )}
    />
  );
}
