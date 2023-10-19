'use client';

import { useCopyToClipboard } from '#@/app/hooks/useCopyToClipboard';
import { MonCarpeta } from '#@/lib/types/carpetas';
import styles from './buttons.module.css';

export const copyButton = (
  {
    copyTxt
  }: { copyTxt: string }
) => {
  return (
    <button type='button' className={styles.buttonChip}>

    </button>
  );
};

export function CopyButtons(
  {
    carpeta
  }: {carpeta: MonCarpeta}
) {
  const [
    value,
    copy
  ] = useCopyToClipboard();
  return (
    <>

      {carpeta.llaveProceso && ( <button onClick={() => {
        return copy(
          carpeta.llaveProceso ?? ''
        );
      }}>
        <span className='material-symbols-outlined'>file_copy</span>
        <span className={styles.text}>Copiar el numero de expediente</span>
      </button> )}
      <button onClick={() => {
        return copy(
          carpeta.demanda.radicado ?? ''
        );
      }}>
        <span className='material-symbols-outlined'>file_copy</span>
        <span className={styles.text}>Numero de radicado</span>
      </button>
      <button onClick={() => {
        return copy(
          carpeta.deudor.cedula?.toString() ?? ''
        );
      }}>
        <span className='material-symbols-outlined'>file_copy</span>
        <span className={styles.text}>Numero de cedula</span>
      </button>

      <p>Copied value: {value ?? 'Nothing is copied yet!'}</p>
    </>
  );
}