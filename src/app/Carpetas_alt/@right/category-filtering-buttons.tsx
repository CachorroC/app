'use client';

import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function CategoryFilteringButtons(
  {
    row
  }: { row: boolean }
) {
  const [
    selectedExcluded,
    setSelectedExcluded
  ] = useState<string[]>(
    []
  );

  const dispatchCarpetas = useCarpetaSortDispatch();

  const {
    completeCarpetas
  } = useCarpetaSort();

  const categoriesSet = new Set<string>();

  completeCarpetas.forEach(
    (
      carpeta
    ) => {
      categoriesSet.add(
        carpeta.category
      );
    }
  );

  const categories = Array.from(
    categoriesSet
  );

  useEffect(
    () => {
      if ( selectedExcluded && selectedExcluded.length > 0 ) {
        dispatchCarpetas(
          {
            type   : 'category-filter',
            exclude: selectedExcluded,
          }
        );
      } else if ( selectedExcluded.length === 0 ) {
        dispatchCarpetas(
          {
            type: 'reset',
          }
        );
      }
    }, [
      dispatchCarpetas,
      selectedExcluded
    ]
  );

  return (
    <section
      className={
        row
          ? styles.segmentedButtonsRow
          : styles.segmentedButtonsColumn
      }
    >
      {categories.map(
        (
          category
        ) => {
          const isActive = selectedExcluded.includes(
            category
          );

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
                  return setSelectedExcluded(
                    selectedExcluded.filter(
                      (
                        a
                      ) => {
                        return a !== category;
                      }
                    )
                  );
                }

                return setSelectedExcluded(
                  [
                    ...selectedExcluded,
                    category
                  ]
                );
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
        }
      )}
    </section>
  );
}
