'use client';

import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function CiudadFilteringButtons( {
  row
}: { row: boolean } ) {


  const [
    layout,
    setLayout
  ] = useState( row );

  const [
    selectedExcluded,
    setSelectedExcluded
  ] = useState<string[]>( [] );

  const dispatchCarpetas = useCarpetaSortDispatch();

  const {
    completeCarpetas
  } = useCarpetaSort();

  const ciudadesSet = new Set<string>();

  completeCarpetas.forEach( ( carpeta ) => {
    ciudadesSet.add( carpeta.ciudad
      ? carpeta.ciudad
      : 'Bogotá' );
  } );

  const categories = Array.from( ciudadesSet );

  useEffect(
    () => {
      if ( selectedExcluded && selectedExcluded.length > 0 ) {
        dispatchCarpetas( {
          type   : 'ciudad-filter',
          include: selectedExcluded,
        } );
      } else if ( selectedExcluded.length === 0 ) {
        dispatchCarpetas( {
          type: 'reset',
        } );
      }
    }, [
      dispatchCarpetas,
      selectedExcluded
    ]
  );

  return (
    <>
      <button onClick={ () => {
        return setLayout( !layout );
      }}>

      </button>
      <section
        className={
          layout
            ? styles.segmentedButtonsRow
            : styles.segmentedButtonsColumn
        }
      >
        {categories.map( ( category ) => {
          const isActive = selectedExcluded.includes( category );

          return (
            <button
              key={category}
              type="button"
              className={
                isActive
                  ? styles.buttonCategoryActive
                  : styles.buttonCategoryPasive
              }
              onClick={() => {
                if ( isActive ) {
                  return setSelectedExcluded( selectedExcluded.filter( ( a ) => {
                    return a !== category;
                  } ), );
                }

                return setSelectedExcluded( [
                  ...selectedExcluded,
                  category
                ] );
              }}
            >
              {category}
              <input
                type={'checkbox'}
                checked={isActive}
                readOnly={true}
                name={category}
              />
            </button>
          );
        } )}
      </section>
    </>
  );
}
