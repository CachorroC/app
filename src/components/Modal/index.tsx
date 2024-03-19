'use client';
import { useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
  ReactNode,
  useState, } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { useModalContext, useModalNoteContext } from '#@/app/Context/modal-context';
import { useFormState, useFormStatus } from 'react-dom';
import { addNote } from './actions';
import { Snackbar } from './snackbar';

export function Modal(
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
                  console.log(
                    'onDismiss'
                  );
                  setIsModalOpen(
                    false
                  );
                  router.back();
        }, [ router, setIsModalOpen ]
      );

      const onBackspace = useCallback(
        () => {
                  console.log(
                    'on backspace'
                  );
                  setIsModalOpen(
                    false
                  );
                  router.back();

        }, [ router, setIsModalOpen ]
      );

      const onEnter = useCallback(
        () => {
                  setIsModalOpen(
                    false
                  );
                  router.forward();
        },
        [ router, setIsModalOpen ],
      );

      const onClick: MouseEventHandler = useCallback(
        (
          e
        ) => {
                  console.log(
                    'onCLick'
                  );

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
                  console.log(
                    'onKeyDown'
                  );

                  if ( e.key === 'Enter' ) {
                    onEnter();
                  }

                  if ( e.key === 'Escape' || e.key === 'Backspace' ) {
                    onBackspace();
                  }
        },
        [ onBackspace, onEnter ],
      );

      useEffect(
        () => {
                  console.log(
                    'on useEffect'
                  );
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


export function ModalNote(
  {
    children
  }: { children: ReactNode }
) {
      const pathname = usePathname();

      const {
        isModalNoteOpen,
        setIsModalNoteOpen
      } = useModalNoteContext();

      const overlay = useRef(
        null
      );

      const wrapper = useRef(
        null
      );

      const onDismiss = useCallback(
        () => {
                  setIsModalNoteOpen(
                    false
                  );
        }, [ setIsModalNoteOpen ]
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
        <>{isModalNoteOpen &&( <div
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
        </div> )}</>
      );
}


function Submit() {
      const {
        pending
      } = useFormStatus();
      return (
        <><Snackbar text={ 'submitted' } />
          <button disabled={ pending }>Submit</button></> );
}



export function NewNotaComponent () {
      const [ isOpen, setIsOpen ] = useState(
        false
      );

      const [ state, formAction ] = useFormState(
        addNote, {
          value    : '',
          submitted: false,
          success  : false
        }
      );
      return (
        <>
          <form action={ formAction } >


            { isOpen && (
              <fieldset>
                <legend>Nueva Nota</legend>
                <input type='text' defaultValue={ state.value } name='itemID' />
                <input type='submit' />
              </fieldset>
            ) }
            <button type={ 'button' } onClick={
              () => {
                        return setIsOpen(
                          (
                            e
                          ) => {
                                    return !e;
                          }
                        );
              }
            }>
              <span className='material-symbols-outlined'>{
                isOpen
                  ? 'close'
                  : 'note_stack_add'
              }</span>
              <span>nueva nota</span>
            </button>
            <Submit />
          </form>
          {
            state.success && (
              <Snackbar text={ 'successfully loaded to the server' } />
            )
          }
        </>
      );
}