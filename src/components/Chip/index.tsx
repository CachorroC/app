'use client';
import { useCopyToClipboard } from '#@/app/Hooks/useCopyToClipboard';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { show, snackbar } from '../Buttons/buttons.module.css';
import typography from '#@/styles/fonts/typography.module.css';

export function ChipButton(
  {
    copyTxt,
    icon,
    name,
  }: {
    copyTxt: string;
    icon?: string;
    name: string;
  } 
) {
      const [ flipper, setFlipper ] = useState(
        false 
      );

      const [ copyToClipboard, setCopyToClipboard ] = useCopyToClipboard();

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
        <>
          <button
            type="button"
            onMouseLeave={() => {
                      setFlipper(
                        false 
                      );
            }}
            onMouseEnter={() => {
                      setFlipper(
                        true 
                      );
            }}
            onClick={() => {
                      setCopyToClipboard(
                        copyTxt 
                      );
                      setIsSnackbarOpen(
                        true 
                      );
            }}
            className={styles.chip}
          >
            {icon && (
              <span className={`material-symbols-outlined ${ styles.icon }`}>
                {icon}
              </span>
            )}
            <span className={`${ typography.labelMedium } ${ styles.text }`}>
              {flipper
                ? copyTxt
                : name}
            </span>
          </button>
          {copyToClipboard && isSnackbarOpen && (
            <div className={`${ snackbar } ${ isSnackbarOpen && show }`}>{copyTxt}</div>
          )}
        </>
      );
}
