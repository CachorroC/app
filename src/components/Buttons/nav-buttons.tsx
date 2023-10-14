'use client';

import { useRouter } from 'next/navigation';
import styles from './buttons.module.css';
import { useModalContext } from '#@/app/context/modal-context';
import { useNavigationContext } from '#@/app/context/main-context';

export default function NavButtons() {
  const router = useRouter();

  const {
    isModalOpen, setIsModalOpen 
  } = useModalContext();

  const {
    isNavOpen, setIsNavOpen 
  } = useNavigationContext();

  return (
    <section className={styles.segmentRow}>
      <button
        type="button"
        className={styles.buttonBackwards}
        onClick={() => {
          router.back();
        }}
      >
        <span className={`material-symbols-outlined ${ styles.icon }`}>
          chevron_left
        </span>
        <p className={styles.text}>atras</p>
      </button>
      <button
        type="button"
        className={styles.buttonForward}
        onClick={() => {
          router.forward();
        }}
      >
        <span className={`material-symbols-outlined ${ styles.icon }`}>
          chevron_right
        </span>
        <p className={styles.text}>entrar</p>
      </button>
      <button
        className={styles.buttonModal}
        onClick={() => {
          setIsModalOpen(
            (
              n 
            ) => {
              return !n;
            } 
          );
        }}
      >
        <span className="material-symbols-outlined">
          {isModalOpen
            ? 'close'
            : 'note_add'}
        </span>
      </button>

      <button
        type="button"
        className={styles.buttonDrawerMenu}
        onClick={() => {
          setIsModalOpen(
            false 
          );
          setIsNavOpen(
            (
              n 
            ) => {
              return !n;
            } 
          );
        }}
      >
        <span className={`material-symbols-outlined ${ styles.icon }`}>
          {isNavOpen
            ? 'close'
            : 'menu'}
        </span>
      </button>
    </section>
  );
}
