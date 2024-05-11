'use client';

import { useCopyToClipboard } from '#@/app/Hooks/useCopyToClipboard';
import { MonCarpeta } from '#@/lib/types/carpetas';
import typography from '#@/styles/fonts/typography.module.css';
import { useEffect, useState } from 'react';
import styles from '../Proceso/styles.module.css';
import layout from '#@/styles/layout.module.css';
import buttons from './buttons.module.css';

export const CopyButton = (
  {
    copyTxt,
    horizontal,
    name,
  }: {
  copyTxt: string;
  horizontal?: boolean;
  name: string;
} 
) => {
  const [
    value,
    copy
  ] = useCopyToClipboard();

  const [
    isSnackbarOpen,
    setIsSnackbarOpen
  ] = useState(
    false 
  );

  useEffect(
    () => {
      const timer = setTimeout(
        () => {
          setIsSnackbarOpen(
            false 
          );
        }, 5000 
      );

      if ( isSnackbarOpen ) {
        timer;
      }

      return () => {
        return clearTimeout(
          timer 
        );
      };
    }, [
      isSnackbarOpen
    ] 
  );
  return (
    <div className={styles.container}>
      <div className={horizontal
        ? layout.segmentRow
        : layout.segmentColumn}>
        <span className={typography.labelSmall}>{name}</span>
        <span className={typography.labelMedium}>{copyTxt}</span>
        <button
          type="button"
          onClick={() => {
            copy(
              copyTxt 
            );
            setIsSnackbarOpen(
              true 
            );
          }}
          className={styles.buttonActive}
        >
          <span className={`material-symbols-outlined ${ styles.icon }`}>
            file_copy
          </span>

          <span className={styles.text}>copiar</span>
        </button>
      </div>

      {value && isSnackbarOpen && (
        <div
          className={`${ buttons.snackbar } ${ isSnackbarOpen && buttons.show }`}
        >
          {`${ name } : ${ copyTxt } `}
        </div>
      )}
    </div>
  );
};

export function CopyButtons(
  {
    carpeta 
  }: { carpeta: MonCarpeta } 
) {
  return (
    <>
      {carpeta.llaveProceso && (
        <CopyButton
          copyTxt={carpeta.llaveProceso}
          name={`expediente ${ carpeta.llaveProceso }`}
        />
      )}
      {carpeta.deudor?.cedula && (
        <CopyButton
          copyTxt={carpeta.deudor.cedula}
          name={`cédula de ciudadanía número${ carpeta.deudor.cedula }`}
        />
      )}
      {carpeta.demanda?.radicado && (
        <CopyButton
          copyTxt={carpeta.demanda.radicado}
          name={`radicado ${ carpeta.demanda.radicado }`}
        />
      )}
    </>
  );
}
