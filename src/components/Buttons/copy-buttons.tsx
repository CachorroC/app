'use client';

import { useCopyToClipboard } from '#@/app/hooks/useCopyToClipboard';
import { MonCarpeta } from '#@/lib/types/carpetas';
import styles from './buttons.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';
import { useEffect, useState } from 'react';
import cardStyles from '../Card/card.module.css';

export const CopyButton = (
  {
    copyTxt,
    name,
  }: {
    copyTxt: string;
    name: string;
  }
) => {
          const [ value, copy ] = useCopyToClipboard();

          const [ isSnackbarOpen, setIsSnackbarOpen ] = useState(
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
            }, [ isSnackbarOpen ]
          );
          return (
            <div className={layout.segmentRow}>
              <div className={layout.sectionColumn}>
                <p className={typography.labelMedium}>{name}</p>
              </div>
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
                className={cardStyles.link}
              >
                <span className={`material-symbols-outlined ${ styles.icon }`}>
          file_copy
                </span>
                <span className={ cardStyles.tooltiptext }>{ value }</span>
                <span>{`copiar ${ name }`}</span>
              </button>
              {value && isSnackbarOpen && (
                <div className={`${ styles.snackbar } ${ isSnackbarOpen && styles.show }`}>
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
