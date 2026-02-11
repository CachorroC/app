'use client';

import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { ChangeEvent, useEffect, useState } from 'react';

export default function CiudadFilteringButtons () {
  const [
    selectedValues,
    setSelectedValues
  ] = useState<string[]>(
    []
  );
  const dispatchCarpetas = useCarpetaSortDispatch();
  const {
    completeCarpetas
  } = useCarpetaSort();
  // The modern, cleanest way to get unique items
  const categories = [
    ...new Set(
      completeCarpetas.map(
        c => {
          return  c.ciudad ?? 'Bogotá';
        }
      )
    )
  ].sort();

  // 2. Handle the change event
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>
  ) => {
    // e.target.options is an HTMLCollection, so we convert it to an array
    const options = Array.from(
      e.target.options
    );
    // Filter to find the selected options and map to their values
    const value = options
      .filter(
        option => {
          return option.selected;
        }
      )
      .map(
        option => {
          return option.value;
        }
      );
    setSelectedValues(
      value
    );
  };

  useEffect(
    () => {
      if ( selectedValues && selectedValues.length > 0 ) {
        dispatchCarpetas(
          {
            type   : 'ciudad-filter',
            include: selectedValues,
          }
        );
      } else if ( selectedValues.length === 0 ) {
        dispatchCarpetas(
          {
            type: 'reset',
          }
        );
      }
    }, [
      selectedValues,
      dispatchCarpetas
    ]
  );

  return (
    <>
      <label htmlFor="ciudades-select" >
        Filtre por ciudades (presione Ctrl/Cmd para selección múltiple):
      </label>
      <select id="ciudades-select"
        multiple={true} // Enables multiple selection
        value={selectedValues} // Controlled input
        onChange={handleChange}
      >

        {categories.map(
          (
            option
          ) => {

            return (
              <option
                key={ option }
                value={option}
              >
                {option}
              </option>
            );
          }
        )}
      </select>
      <div>
        <strong>Selected: </strong>
        <pre>{JSON.stringify(
          selectedValues, null, 2
        )}</pre>
      </div>
      {/* {categories.map(
        (
          category
        ) => {
          const isActive = selectedValues.includes(
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
                  return setSelectedValues(
                    selectedValues.filter(
                      (
                        a
                      ) => {
                        return a !== category;
                      }
                    ),
                  );
                }

                return setSelectedValues(
                  [
                    ...selectedValues,
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
      )} */}
    </>
  );
}
