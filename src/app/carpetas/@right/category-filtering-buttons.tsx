'use client';

import {
  useCarpetaSort,
  useCarpetaSortDispatch,
} from '#@/app/carpetas/context';
import { useEffect, useState } from 'react';

export default function CategoryFilteringButtons() {
  const [selectedExcluded, setSelectedExcluded] = useState<string[]>([]);

  const dispatchCarpetas = useCarpetaSortDispatch();

  const { completeCarpetas } = useCarpetaSort();

  // The modern, cleanest way to get unique items
  const categories = [
    ...new Set(
      completeCarpetas.map((c) => {
        return c.category;
      }),
    ),
  ];

  useEffect(() => {
    if (selectedExcluded && selectedExcluded.length > 0) {
      dispatchCarpetas({
        type: 'category-filter',
        exclude: selectedExcluded,
      });
    } else if (selectedExcluded.length === 0) {
      dispatchCarpetas({
        type: 'reset',
      });
    }
  }, [dispatchCarpetas, selectedExcluded]);

  return (
    <>
      {categories.map((category) => {
        const isActive = selectedExcluded.includes(category);

        return (
          <button
            key={category}
            type="button"
            onClick={() => {
              if (isActive) {
                return setSelectedExcluded(
                  selectedExcluded.filter((a) => {
                    return a !== category;
                  }),
                );
              }

              return setSelectedExcluded([...selectedExcluded, category]);
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
      })}
    </>
  );
}
