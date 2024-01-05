'use client';
import { useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
  ReactNode, } from 'react';
import styles from 'components/Modal/styles.module.css';
import { useModalContext } from '../context/modal-context';

export default function ModalDialog(
  {
    children 
  }: { children: ReactNode } 
) {
      const overlay = useRef(
        null 
      );

      const wrapper = useRef(
        null 
      );

      const {
        isModalOpen, setIsModalOpen 
      } = useModalContext();

      const onDismiss = useCallback(
        () => {
                  setIsModalOpen(
                    (
                      n 
                    ) => {
                              return !n;
                    } 
                  );
        }, [ setIsModalOpen ] 
      );

      const onClick: MouseEventHandler = useCallback(
        (
          e 
        ) => {
                  if ( e.target === overlay.current || e.target === wrapper.current ) {
                    if ( onDismiss ) {
                      onDismiss();
                    }
                  }
        },
        [
          onDismiss,
          overlay,
          wrapper 
        ],
      );

      const onKeyDown = useCallback(
        (
          e: KeyboardEvent 
        ) => {
                  if ( e.key === 'Escape' ) {
                    onDismiss();
                  }
        },
        [ onDismiss ],
      );

      useEffect(
        () => {
                  document.addEventListener(
                    'keydown', onKeyDown 
                  );

                  return () => {
                            return document.removeEventListener(
                              'keydown', onKeyDown 
                            );
                  };
        }, [ onKeyDown ] 
      );

      return (
        <>
          {isModalOpen && (
            <div
              ref={overlay}
              className={styles.open}
              onClick={onClick}
            >
              <div
                ref={wrapper}
                className={styles.wrapper}
              >
                {children}
              </div>
            </div>
          )}
        </>
      );
}
