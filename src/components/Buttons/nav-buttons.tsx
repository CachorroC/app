'use client';

import { useRouter } from 'next/navigation';
import { useModalContext } from '#@/app/context/modal-context';

import { useNavigationContext } from '#@/app/context/main-context';
import styles from '#@/styles/layout.module.css';
import { NavLink } from '../layout/Drawer';
import layout from '#@/styles/layout.module.css';

// TODO: arreglar lo de la navegacion
export default function NavButtons() {


  const {
    isModalOpen, setIsModalOpen
  } = useModalContext();

  const {
    isNavOpen, setIsNavOpen
  } = useNavigationContext();

  return (
    <>
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
            !isNavOpen
          );
        }}
      >
        <span className={`material-symbols-outlined ${ styles.icon }`}>
          {isNavOpen
            ? 'close'
            : 'menu'}
        </span>
      </button>
      <NavLink iconLabel={ 'home' } textLabel={ 'Inicio' } hrefLabel='/' />
      <NavLink iconLabel={ 'gavel' } textLabel={ `ultimas
      actuaciones`} hrefLabel= '/Carpetas/UltimasActuaciones' />
      <NavLink iconLabel={ 'note' } textLabel={ 'Notas' } hrefLabel='/Notas' />
      <NavLink iconLabel={ 'folder_open' } textLabel={ 'Carpetas' } hrefLabel='/Carpetas'   />
    </>
  );
}


export function ForwardBackwardNavButtons () {
  const router = useRouter();
  return (

    <section className={ layout.segmentRow }>
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
    </section>
  );
}