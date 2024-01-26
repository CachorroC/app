'use client';
import { useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
  ReactNode, } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { useModalContext } from '#@/app/Context/modal-context';

export default function Modal(
  {
    children
  }: { children: ReactNode }
) {
      const pathname = usePathname();

      const {

        setIsModalOpen
      } = useModalContext();

      const overlay = useRef(
        null
      );

      const wrapper = useRef(
        null
      );

      const router = useRouter();

      const onDismiss = useCallback(
        () => {
                  setIsModalOpen(
                    false
                  );
                  router.back();
        }, [ router, setIsModalOpen ]
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
        }, [ pathname, onKeyDown ]
      );

      return (
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
      );
}
