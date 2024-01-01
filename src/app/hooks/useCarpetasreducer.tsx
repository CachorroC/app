
import { MonCarpeta } from '#@/lib/types/carpetas';

export type SortActionType = {
  type: 'sort';
  dir: 'asc' | 'dsc',
  sortingKey: 'fecha' | 'numero' | 'nombre' | 'category' | 'id' | 'tipoProceso' | 'updatedAt';

}

export type SearchActionType = {
  type: 'search',
  query: string
}

export type FilterActionType = {
  type: 'filter',
  filteringKey: 'category' | 'terminado' | 'revisado' | 'tipoProceso'
  filteringValue: string;

}

export type IntAction = FilterActionType | SearchActionType | SortActionType;


export function carpetasReducer(
  carpetas: MonCarpeta[], action: IntAction
) {
      const {
        type
      }= action;

      switch ( type ) {
          case 'sort': {

            const asc = [
              -1,
              0,
              1
            ];

            const dsc = [
              1,
              0,
              -1
            ];

            const sorter = action.dir === 'asc'
              ? asc
              : dsc;

            return [
              ...carpetas
            ].sort(
              (
                a, b
              ) => {
                        const aSortingKey = a[ action.sortingKey ];

                        const bSortingKey = b[ action.sortingKey ];

                        if ( !aSortingKey || aSortingKey === undefined ) {
                          return sorter[ 2 ];
                        }

                        if ( !bSortingKey || bSortingKey === undefined ) {
                          return sorter[ 0 ];
                        }

                        if ( aSortingKey < bSortingKey ) {
                          return sorter[ 2 ];
                        }

                        if ( aSortingKey > bSortingKey ) {
                          return sorter[ 0 ];
                        }

                        return 0;
              }
            );
          }

          case 'search': {
            return [
              ...carpetas
            ].filter(
              (
                carpeta
              ) => {
                        if ( carpeta.nombre.toLocaleLowerCase()
                              .indexOf(
                                action.query.toLocaleLowerCase()
                              ) === -1 ) {
                          return false;
                        }

                        return true;


              }
            );
          }

          case 'filter': {
            return [
              ...carpetas
            ].filter(
              (
                carpeta
              ) => {
                        const querier = carpeta[ action.filteringKey ];

                        if ( typeof querier === 'boolean' ) {
                          return querier;
                        }


                        if ( querier.toLocaleLowerCase()
                              .indexOf(
                                action.filteringKey.toLocaleLowerCase()
                              ) === -1 ) {
                          return false;
                        }

                        return true;
              }
            );
          }

          default: {
            throw new Error(
              `no existe el tipo de accion requerido: ${ type }`
            );

          }
      }
}
