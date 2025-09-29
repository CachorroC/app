'use client';

import { IntCarpeta } from '#@/lib/types/carpetas';
import { FieldPath, useFormContext } from 'react-hook-form';
import typography from '#@/styles/fonts/typography.module.css';
import { useState } from 'react';
import styles from '#@/components/Buttons/buttons.module.css';
import layout from '#@/styles/layout.module.css';

export const SelectSection = (
  {
    name,
    title,
    options,
    initialValue,
  }: {
    name: FieldPath<IntCarpeta>;
    title: string;
    options: string[];
    initialValue?: string;
  } 
) => {
  const {
    setValue 
  } = useFormContext<IntCarpeta>();

  const [
    isOptionsOpen,
    setIsOptionsOpen
  ] = useState(
    false 
  );

  return (
    <section className={layout.sectionColumn}>
      <div
        onClick={() => {
          setIsOptionsOpen(
            (
              o 
            ) => {
              return !o;
            } 
          );
        }}
        className={layout.segmentRow}
      >
        <span className={`material-symbols-outlined ${ styles.icon }`}>
          {isOptionsOpen
            ? 'expand_less'
            : 'expand_more'}
        </span>
        <p className={`${ styles.text } ${ typography.titleMedium }`}> {title}</p>
      </div>

      {isOptionsOpen && (
        <section className={layout.segmentRow}>
          {options.map(
            (
              option 
            ) => {
              return (
                <button
                  type="button"
                  className={
                    initialValue && option === initialValue
                      ? styles.buttonActiveCategory
                      : styles.buttonPassiveCategory
                  }
                  onClick={(
                    e 
                  ) => {
                    e.stopPropagation();
                    setValue(
                      name, option 
                    );
                  }}
                  key={option}
                >
                  <p className={styles.text}>{option}</p>
                </button>
              );
            } 
          )}
        </section>
      )}
    </section>
  );
};
