'use client';

import { IntCarpeta } from '#@/lib/types/carpetas';
import { FieldPath, useFormContext } from 'react-hook-form';
import form from '../form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { useState } from 'react';
import styles from '#@/components/Buttons/buttons.module.css';

export const SelectSection = (
  {
    name,
    title,
    options,
  }: {
  name: FieldPath<IntCarpeta>;
  title: string;
  options: string[];
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
    <section className={form.sectionColumn}>
      <div onClick={(      ) => {
        setIsOptionsOpen(
          (
            o
          ) => {
            return !o;
          }
        );
      }} className={`${ form.sectionRow } ${ typography.titleLarge }`}
      >
        <span className={`material-symbols-outlined ${ styles.icon }`}>{isOptionsOpen
          ? 'expand_more'
          : 'expand_less'}</span>
        <p className={styles.text}> {title}</p>
      </div>


      <section  className={styles.segmentRow}>
        {options.map(
          (
            option
          ) => {
            return (
              <button
                type='button'
                className={styles.buttonActiveCategory}
                onClick={ (
                  e
                ) => {
                  e.stopPropagation();
                  setValue(
                    name, option
                  );
                }}
                key={option}
              >
                {option}
              </button>
            );
          }
        )}
      </section>

    </section>
  );
};
