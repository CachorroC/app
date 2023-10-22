'use client';

import { useCopyToClipboard } from '#@/app/hooks/useCopyToClipboard';
import { MonCarpeta } from '#@/lib/types/carpetas';
import styles from './buttons.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';
import { useEffect, useState } from 'react';

export const CopyButton = (
  {
    copyTxt, name
  }: { copyTxt: string; name: string; }
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
    <div className={layout.segmentColumn}>
      <p className={ typography.labelLarge }>{ name }</p>
      <p className={ typography.labelMedium }>{ value }</p><button type='button' onClick={ () => {
        copy(
          copyTxt
        );
        setIsSnackbarOpen(
          true
        );
      } } className={ styles.buttonChip }>
        <span className={ `material-symbols-outlined ${ styles.icon }` }>file_copy</span>
        <span className={styles.text}>copiar</span>
      </button>
      { value &&( isSnackbarOpen && (
        <div className={ `${ styles.snackbar } ${ isSnackbarOpen && styles.show }` }>{ value} </div>
      ) )}
    </div>
  );
};

export function CopyButtons(
  {
    carpeta
  }: {carpeta: MonCarpeta}
) {
  return (
    <>

      { carpeta.llaveProceso && (
        <CopyButton copyTxt={ carpeta.llaveProceso} name='expediente' />
      )}
      { carpeta.demanda.radicado && (
        <CopyButton copyTxt={ carpeta.demanda.radicado} name='radicado' />
      )}
      { carpeta.cc && (
        <CopyButton copyTxt={ carpeta.cc.toString()}  name='cedula'/>
      )}
    </>
  );
}