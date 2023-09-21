'use client';
import { useCallback, useRef, useEffect, MouseEventHandler, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { useModalContext } from '#@/app/context/modal-context';

export default function Modal(
  {
    children
  }: { children: ReactNode }
) {
  const {
    isModalOpen, setIsModalOpen
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
    }, [
              router,
              setIsModalOpen
    ]
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
    [
              onDismiss
    ],
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
    }, [
              onKeyDown
    ]
  );

  return (
    <div
      ref={overlay}
      className={isModalOpen
        ? styles.open
        : styles.closed}
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
