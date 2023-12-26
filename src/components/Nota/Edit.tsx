'use client';
import { editNota } from '#@/app/actions';
import { useState } from 'react';
import styles from 'components/form/form.module.css';
import layout from '#@/styles/layout.module.css';
import { Nota } from '@prisma/client';
import { useFormState } from 'react-dom';
import cardStyles from '../Card/card.module.css';

export const Edit = (
  {
    nota 
  }: { nota: Nota } 
) => {
          const [
            hasContent,
            setHasContent 
          ] = useState(
            false 
          );

          const [
            formState,
            onCreate 
          ] = useFormState(
            editNota, {
              message: 'sin enviar',
              data   : nota,
              error  : false,
            } 
          );

          const [
            inputNota,
            setInputNota 
          ] = useState(
            formState.data ?? nota 
          );

          const dateString = inputNota.date.toISOString()
                .slice(
                  0, 10 
                );

          return (
            <div
              className={`${ styles.container } ${
                formState.error && cardStyles.errorContainer
              }`}
            >
              <form
                className={styles.form}
                action={onCreate}
              >
                <section className={layout.sectionRow}>
                  <label
                    className={styles.label}
                    htmlFor={'id'}
                  >
                    {'No.'}
                  </label>
                  <input
                    className={styles.textArea}
                    type="text"
                    name="id"
                    defaultValue={nota.id}
                  />
                </section>
                <section className={layout.sectionRow}>
                  <label
                    className={styles.label}
                    htmlFor={'llaveProceso'}
                  >
                    {'llaveProceso'}
                  </label>
                  <input
                    className={styles.textArea}
                    type="number"
                    name="llaveProceso"
                    defaultValue={
                      inputNota.carpetaNumero
                        ? inputNota.carpetaNumero
                        : ''
                    }
                  />
                </section>
                <section className={layout.sectionRow}>
                  <label
                    className={styles.label}
                    htmlFor={'text'}
                  >
                    {'Nota:'}
                  </label>
                  <input
                    className={styles.textArea}
                    type="text"
                    name="text"
                    value={inputNota.title}
                    onChange={(
                      e 
                    ) => {
                              setInputNota(
                                {
                                  ...inputNota,
                                  title: e.target.value,
                                } 
                              );
                    }}
                  />
                </section>
                <section className={layout.sectionRow}>
                  <label
                    className={styles.label}
                    htmlFor={'date'}
                  >
                    {'Fecha controlled'}
                  </label>
                  <input
                    type="date"
                    className={styles.textArea}
                    name="date"
                    value={dateString}
                    onChange={(
                      e 
                    ) => {
                              setInputNota(
                                {
                                  ...inputNota,
                                  date: new Date(
                                    e.target.value 
                                  ),
                                } 
                              );
                    }}
                  />
                  <p>{dateString}</p>
                </section>
                <section className={layout.segmentColumn}>
                  <label className={styles.switchBox}>
                    <input
                      className={styles.inputElement}
                      name="done"
                      checked={hasContent}
                      onChange={() => {
                                setHasContent(
                                  (
                                    c 
                                  ) => {
                                            return !c;
                                  } 
                                );
                      }}
                      type="checkbox"
                    />
                    <span className={styles.slider}></span>
                  </label>
                  {hasContent && (
                    <section className={layout.sectionRow}>
                      <label className={styles.label}>
                        {'Nota:'}
                        <input
                          className={styles.textArea}
                          type="text"
                          name="content"
                          value={inputNota.title}
                          onChange={(
                            e 
                          ) => {
                                    setInputNota(
                                      {
                                        ...inputNota,
                                        content: e.target.value,
                                      } 
                                    );
                          }}
                        />
                      </label>
                    </section>
                  )}
                </section>
                <button type="submit">Add</button>
                <p>{formState.message}</p>
              </form>
            </div>
          );
};
