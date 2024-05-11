import { monFactura } from '#@/lib/types/contabilidad';

export type SortActionType = {
  type: 'sort';
  dir: boolean;
  sortingKey:
    | 'fecha'
    | 'id'
    | 'razonSocial'
    | 'valorTotal'
    | 'valorBase'
    | 'valorIva'
    | 'valorOtroImp';
};

export type SearchActionType = {
  type: 'search';
  query: string;
};

export type FilterActionType = {
  type: 'filter';
  filteringKey: 'hasIva' | 'hasImpoConsumo' | 'hasOtroImp' | 'hasIcui';
  filteringValue: boolean;
};

export type ResetActionType = {
  type: 'reset';
  payload: monFactura[];
};

export type IntAction =
  | FilterActionType
  | SearchActionType
  | SortActionType
  | ResetActionType;

export function facturasReducer(
  facturas: monFactura[], action: IntAction 
) {
  const {
    type 
  } = action;

  switch ( type ) {
      case 'sort': {
        const {
          dir, sortingKey 
        } = action;

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

        const sorter = dir
          ? asc
          : dsc;

        switch ( sortingKey ) {
            case 'fecha': {
              return [
                ...facturas
              ].sort(
                (
                  a, b 
                ) => {
                  if ( !a.fecha || a.fecha === undefined ) {
                    return sorter[ 2 ];
                  }

                  if ( !b.fecha || b.fecha === undefined ) {
                    return sorter[ 0 ];
                  }

                  const x = a.fecha;

                  const y = b.fecha;

                  if ( x < y ) {
                    return sorter[ 2 ];
                  }

                  if ( x > y ) {
                    return sorter[ 0 ];
                  }

                  return sorter[ 1 ];
                } 
              );
            }

            case 'valorTotal': {
              return [
                ...facturas
              ].sort(
                (
                  a, b 
                ) => {
                  const valortotalA = parseFloat(
                    a.valorTotal 
                  );

                  const valortotalB = parseFloat(
                    b.valorTotal 
                  );

                  if ( valortotalA < valortotalB ) {
                    return sorter[ 2 ];
                  } else if ( valortotalA > valortotalB ) {
                    return sorter[ 0 ];
                  }

                  return 0;
                } 
              );
            }

            case 'valorIva': {
              return [
                ...facturas
              ].sort(
                (
                  a, b 
                ) => {
                  const valortotalA = parseFloat(
                    a.valorIva 
                  );

                  const valortotalB = parseFloat(
                    b.valorIva 
                  );

                  if ( valortotalA < valortotalB ) {
                    return sorter[ 2 ];
                  } else if ( valortotalA > valortotalB ) {
                    return sorter[ 0 ];
                  }

                  return 0;
                } 
              );
            }

            case 'valorOtroImp': {
              return [
                ...facturas
              ].sort(
                (
                  a, b 
                ) => {
                  const valortotalA = parseFloat(
                    a.valorOtroImp 
                  );

                  const valortotalB = parseFloat(
                    b.valorOtroImp 
                  );

                  if ( valortotalA < valortotalB ) {
                    return sorter[ 2 ];
                  } else if ( valortotalA > valortotalB ) {
                    return sorter[ 0 ];
                  }

                  return 0;
                } 
              );
            }

            default: {
              return [
                ...facturas
              ].sort(
                (
                  a, b 
                ) => {
                  const aSortingKey = a[ sortingKey ];

                  const bSortingKey = b[ sortingKey ];

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
        }
      }

      case 'search': {
        const facturasMap = [];

        const searchQuery = action.query.toLocaleLowerCase();

        if ( !searchQuery || searchQuery === '' ) {
          return [
            ...facturas
          ];
        }

        for ( const carpeta of [
          ...facturas
        ] ) {
          const nombreString = carpeta.concepto.toLocaleLowerCase();

          const carpetaQuery = nombreString.indexOf(
            searchQuery 
          );

          if ( carpetaQuery === -1 ) {
            continue;
          }

          facturasMap.push(
            carpeta 
          );

          console.log(
            carpetaQuery 
          );
        }

        return facturasMap;
      }
      /*
        case 'filter': {
          return [ ...facturas ].filter(
            (
              carpeta
            ) =>
            {
              const querier = carpeta[ action.filteringKey ];

              if ( typeof querier === 'boolean' )
              {
                return querier;
              }

              if (
                querier
                  .toLocaleLowerCase()
                  .indexOf(
                    action.filteringKey.toLocaleLowerCase()
                  ) === -1
              )
              {
                return false;
              }

              return true;
            }
          );
        } */

      case 'reset': {
        return action.payload;
      }

      default: {
        return [
          ...facturas
        ].sort(
          (
            a, b 
          ) => {
            if ( !a.fecha || a.fecha === undefined ) {
              return 1;
            }

            if ( !b.fecha || b.fecha === undefined ) {
              return -1;
            }

            const x = a.fecha;

            const y = b.fecha;

            if ( x < y ) {
              return 1;
            }

            if ( x > y ) {
              return -1;
            }

            return 0;
          } 
        );
      }
  }
}
