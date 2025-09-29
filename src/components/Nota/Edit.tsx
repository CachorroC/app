'use client';
import { editNota } from '#@/app/actions/main';
import { useActionState, useState } from 'react';
import styles from 'components/Form/form.module.css';
import layout from '#@/styles/layout.module.css';
import cardStyles from '../Card/card.module.css';
import { IntNota } from '#@/lib/types/notas';
import { card } from '../Proceso/procesos.module.css';

export const Edit = (
  {
    nota 
  }: { nota: IntNota } 
) => {
  const [
    hasContent,
    setHasContent
  ] = useState(
    false 
  );

  const [
    formState,
    onFormCreate,
    isFormPending
  ] = useActionState(
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

  const dateString = inputNota.dueDate?.toISOString()
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
        className={styles.container}
        action={onFormCreate}
      >
        <fieldset className={layout.sectionRow}>
          <legend>Cédula</legend>
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
        </fieldset>
        <fieldset className={layout.sectionRow}>
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
        </fieldset>
        <fieldset className={layout.sectionRow}>
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
            value={inputNota.text}
            onChange={(
              e 
            ) => {
              setInputNota(
                {
                  ...inputNota,
                  text: e.target.value,
                } 
              );
            }}
          />
        </fieldset>
        <fieldset className={layout.sectionRow}>
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
                  dueDate: new Date(
                    e.target.value 
                  ),
                } 
              );
            }}
          />
          <p>{dateString}</p>
        </fieldset>
        <fieldset className={layout.segmentColumn}>
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
                  value={inputNota.content.join(
                    '\n' 
                  )}
                  onChange={(
                    e 
                  ) => {
                    setInputNota(
                      {
                        ...inputNota,
                        content: e.target.value.split(
                          '\n' 
                        ),
                      } 
                    );
                  }}
                />
              </label>
            </section>
          )}
        </fieldset>
        <button type="submit">Add</button>
        <p>{formState.message}</p>
      </form>

      <div className={card}>
        <h1>
          {isFormPending
            ? 'formulario no registrado'
            : 'formulario registrado'}
        </h1>
      </div>
    </div>
  );
};
