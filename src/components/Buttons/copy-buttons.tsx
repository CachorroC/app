'use client';

import { useCopyToClipboard } from '#@/app/Hooks/useCopyToClipboard';
import { MonCarpeta } from '#@/lib/types/carpetas';
import typography from '#@/styles/fonts/typography.module.css';
import { Fragment, useEffect, useState } from 'react';
import layout from '#@/styles/layout.module.css';
import styles from './tonal.module.css';
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
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
    <Fragment key={copyTxt}>
      <div className={horizontal
        ? layout.segmentRow
        : layout.segmentColumn}
      >
        <h5
          style={{
            color: 'var(--primary)',
            flex : 1,
          }}
          className={typography.labelLarge}
        >
          {name}
        </h5>
        <p
          style={{
            color: 'var(--on-surface)',
            flex : 1,
          }}
          className={typography.bodySmall}
        >
          {copyTxt}
        </p>
        <button
          type="button"
          className={ styles.button }

          onClick={() => {
            copy(
              copyTxt
            );
            setIsSnackbarOpen(
              true
            );
          }}
        >
          <span className={`material-symbols-outlined ${ styles.icon }`}>
            file_copy
          </span>

          <p className={`${ typography.labelLarge } ${ styles.text }`}>{copyTxt}</p>
        </button>
      </div>

      {value && isSnackbarOpen && (
        <div
          className={`${ buttons.snackbar } ${ isSnackbarOpen && buttons.show }`}
        >
          {`${ name } : ${ value } `}
        </div>
      )}
    </Fragment>
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
