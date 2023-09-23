'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';

export default function ModalDialog(
  {
    children 
  }: { children: ReactNode } 
) {
  const [
    isOpen,
    setShow
  ] = useState(
    false 
  );

  const ref = useRef<HTMLDialogElement>(
    null 
  );

  useEffect(
    () => {
      if ( !isOpen ) {
        return;
      }

      const dialog = ref.current;
      dialog && dialog.showModal();

      () => {
        dialog && dialog.close();
      };
    }, [
      isOpen
    ] 
  );

  return (
    <>
      <button
        type={'button'}
        onClick={() => {
          setShow(
            false 
          );
        }}
      >
        <span className="material-symbols-outlined">close</span>
      </button>
      <dialog
        ref={ref}
        className="modal"
      >
        {children}
      </dialog>
      <button
        type={'button'}
        onClick={() => {
          return setShow(
            true 
          );
        }}
      >
        Open dialog
      </button>
    </>
  );
}
