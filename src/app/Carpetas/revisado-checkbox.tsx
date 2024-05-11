'use client';
import styles from '#@/components/Form/form.module.css';
import { useState } from 'react';
import { updateRevisadoState } from './actions';

export function RevisadoCheckBox(
  {
    numero,
    initialRevisadoState,
  }: {
  numero: number;
  initialRevisadoState: boolean;
} 
) {
  const [
    revisadoState,
    setRevisadoState
  ] = useState(
    {
      numero  : numero,
      revisado: initialRevisadoState,
    } 
  );

  return (
    <label className={styles.switchBox}>
      <input
        className={styles.inputElement}
        type="checkbox"
        role="switch"
        name="revisado"
        checked={revisadoState.revisado}
        onChange={async (
          e 
        ) => {
          const revis = await updateRevisadoState(
            {
              ...revisadoState,
              revisado: e.target.checked,
            } 
          );
          return setRevisadoState(
            revis 
          );
        }}
      />
      {/* <span className={ styles.slider }aria-hidden="true"></span> */}

      <span
        className={styles.decor}
        data-switch-input-state="on"
        aria-hidden="true"
      >
        On
      </span>
      <span
        className={styles.decor}
        data-switch-input-state="off"
        aria-hidden="true"
      >
        Off
      </span>
      <span
        className={styles.thumb}
        aria-hidden="true"
      ></span>
    </label>
  );
}
