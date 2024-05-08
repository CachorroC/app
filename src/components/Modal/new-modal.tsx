'use client';
import { ReactNode } from 'react';
import styles from './styles.module.css';
import { useModalContext } from '#@/app/Context/modal-context';

export default function NewModal(
  {
    children 
  }: { children: ReactNode } 
) {
      const {
        isModalOpen, setIsModalOpen 
      } = useModalContext();

      return (
        <>
          {isModalOpen && (
            <div
              className={styles.open}
              onClick={() => {
                        if ( isModalOpen ) {
                          return setIsModalOpen(
                            false 
                          );
                        }

                        return setIsModalOpen(
                          true 
                        );
              }}
            >
              <div
                className={styles.wrapper}
                onClick={(
                  e 
                ) => {
                          e.stopPropagation();
                }}
              >
                {children}
              </div>
            </div>
          )}
        </>
      );
}
