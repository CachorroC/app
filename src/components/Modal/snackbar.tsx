'use client';
import { useEffect } from 'react';
import styles from './styles.module.css';
import { useSnackbarContext } from '#@/app/context/main-context';

export function Snackbar(
  {
    text 
  }: { text: string } 
) {
      const {
        isSnackbarOpen, setIsSnackbarOpen 
      } = useSnackbarContext();

      useEffect(
        () => {
                  const timer = setTimeout(
                    () => {
                              setIsSnackbarOpen(
                                false 
                              );
                    }, 1000 
                  );

                  if ( isSnackbarOpen ) {
                    timer;
                  }

                  return () => {
                            return clearTimeout(
                              timer 
                            );
                  };
        }, [ isSnackbarOpen, setIsSnackbarOpen ] 
      );

      return (
        <>
          {isSnackbarOpen && (
            <div className={`${ styles.snackbar } ${ isSnackbarOpen && styles.show }`}>
              {text}
            </div>
          )}
        </>
      );
}
