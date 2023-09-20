'use client';

import { IntCarpeta } from '#@/lib/types/carpetas';
import { FieldPath, useFormContext } from 'react-hook-form';
import form from '../form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';

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
      const rules = {
                      required: true,
      };

      const {
                      register,

      } = useFormContext<IntCarpeta>();



      return (
        <section className={form.section}>
          <label
            className={`${ form.label } ${ typography.titleLarge }`}
            htmlFor={name}
          >
            {title}
          </label>

          <select
            key={name}
            {...register(
                        name, rules
            )}
            className={form.selectArea}
          >
            {options.map(
                        (
                            option, index
                        ) => {
                              return (
                                <option
                                  value={option}
                                  key={index}
                                >
                                  {option}
                                </option>
                              );
                        }
            )}
          </select>
        </section>
      );
};
