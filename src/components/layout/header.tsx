'use client';

import { ReactNode, Suspense } from 'react';
import layout from '#@/styles/layout.module.css';
import navbar from 'components/layout/navbar.module.css';
import type { Route } from 'next';
import Link from 'next/link';
import button from '../Buttons/buttons.module.css';
import { useRouter } from 'next/navigation';
import InputSearchBar from './search/InputSearchBar';
import { Loader } from '../Loader';
import { NuevaNota } from '../Nota/client/nueva-nota';
import ModalDialog, { ModalDialogButton } from '#@/lib/hooks/modal-state';
import { useModalContext } from '#@/app/context/modal-context';
import { useNavigationContext } from '#@/app/context/main-context';
import Drawer from './Drawer';

export default function Header (
  {
    children
  }: {children: ReactNode}
) {
  const router = useRouter();
  let modalSegment;

  const {
    isNavOpen,
    setIsNavOpen
  }= useNavigationContext();

  const

    {
      setIsModalOpen
    }   = useModalContext();

  if ( isNavOpen ) {
    modalSegment = (

      <Drawer>

        {children}


      </Drawer> );
  }



  return (
    <div className={ layout.header }>
      <Link
        href={ '/' as Route }
        className={ navbar.buttonHome }
      >
        <span className={ `material-symbols-outlined ${ navbar.icon }` }>home</span>
        <p className={ navbar.ButtonTextHelper }>inicio</p>
      </Link>
      <Suspense fallback={ <Loader /> }>
        <InputSearchBar />
      </Suspense>

      <button
        type="button"
        className={ navbar.buttonBackwards }
        onClick={ () => {
          router.back();
        } }
      >
        <span className={ `material-symbols-outlined ${ navbar.icon }` }>
          chevron_left
        </span>
        <p className={ navbar.ButtonTextHelper }>atras</p>
      </button>
      <ModalDialogButton />
      <ModalDialog>
        <NuevaNota cod={ 0 } />
      </ModalDialog>
      <button
        type="button"
        className={ navbar.buttonForward }
        onClick={ () => {
          router.forward();
        } }
      >
        <span className={ `material-symbols-outlined ${ navbar.icon }` }>
          chevron_right
        </span>
        <p className={ navbar.ButtonTextHelper }>entrar</p>
      </button><button
        type="button"
        className={ button.buttonDrawerMenu }
        onClick={ () => {
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
        } }
      >
        <span className={ `material-symbols-outlined ${ button.icon }` }>
          { isNavOpen
            ? 'close'
            : 'menu' }
        </span>
      </button>
      { modalSegment}
    </div>

  );
}