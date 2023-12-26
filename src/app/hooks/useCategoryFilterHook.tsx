import { Category, MonCarpeta } from '#@/lib/types/carpetas';

export function CategoryCarpetasReducer(
  carpetas: MonCarpeta[],
  action: { type: Category },
) {
      const {
        type 
      } = action;

      switch ( type ) {
          case 'Bancolombia': {
            const temporryCarpetasMap = new Map<string, MonCarpeta>();

            for ( const carpeta of carpetas ) {
              const {
                category, _id 
              } = carpeta;

              if ( category === 'Bancolombia' ) {
                temporryCarpetasMap.set(
                  _id, carpeta 
                );
              }

              continue;
            }

            return Array.from(
              temporryCarpetasMap.values() 
            );
          }

          case 'LiosJuridicos': {
            const temporryCarpetasMap = new Map<string, MonCarpeta>();

            for ( const carpeta of carpetas ) {
              const {
                category, _id 
              } = carpeta;

              if ( category === 'LiosJuridicos' ) {
                temporryCarpetasMap.set(
                  _id, carpeta 
                );
              }

              continue;
            }

            return Array.from(
              temporryCarpetasMap.values() 
            );
          }

          case 'Insolvencia': {
            const temporryCarpetasMap = new Map<string, MonCarpeta>();

            for ( const carpeta of carpetas ) {
              const {
                category, _id 
              } = carpeta;

              if ( category === 'Insolvencia' ) {
                temporryCarpetasMap.set(
                  _id, carpeta 
                );
              }

              continue;
            }

            return Array.from(
              temporryCarpetasMap.values() 
            );
          }

          case 'Reintegra': {
            const temporryCarpetasMap = new Map<string, MonCarpeta>();
            carpetas.forEach(
              (
                carpeta 
              ) => {
                        const {
                          category 
                        } = carpeta;

                        if ( category === 'Reintegra' ) {
                          temporryCarpetasMap.set(
                            carpeta._id, carpeta 
                          );
                        }
              } 
            );

            return Array.from(
              temporryCarpetasMap.values() 
            );
          }

          case 'Terminados': {
            const temporryCarpetasMap = new Map<string, MonCarpeta>();

            for ( const carpeta of carpetas ) {
              const {
                category, _id 
              } = carpeta;

              if ( category !== 'Terminados' ) {
                temporryCarpetasMap.set(
                  _id, carpeta 
                );
              }
            }

            return Array.from(
              temporryCarpetasMap.values() 
            );
          }

          default: {
            return carpetas;
          }
      }
}
