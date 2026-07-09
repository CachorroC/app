'use client';

import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { EstadoTag } from '#@/app/Hooks/useCarpetasreducer';
import { ESTADO_COLOR } from '#@/components/Carpetas/client/carpeta-meta';
import { FacetGroup } from './facet-group';

const ESTADO_ORDER: EstadoTag[] = [
  'Activo',
  'Terminado',
  'Revisado',
  'Pendiente'
];

export default function EstadoFilteringButtons() {
  const dispatchCarpetas = useCarpetaSortDispatch();

  const { filters } = useCarpetaSort();

  const selected = filters.estado ?? new Set();

  const toggle = ( value: string ) => {
    const next = new Set( selected );

    if ( next.has( value ) ) {
      next.delete( value );
    } else {
      next.add( value );
    }

    return dispatchCarpetas( {
      type  : 'set-filter',
      column: 'estado',
      values: next,
    } );
  };

  return (
    <FacetGroup
      label="Estado"
      options={ESTADO_ORDER.map( ( estado ) => {
        return {
          value   : estado,
          label   : estado,
          selected: selected.has( estado ),
          color   : ESTADO_COLOR[ estado ],
          onClick : () => {
            return toggle( estado );
          },
        };
      } )}
    />
  );
}
