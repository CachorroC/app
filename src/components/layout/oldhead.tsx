'use client';

import { ReactNode, Suspense } from 'react';
import layout from '#@/styles/layout.module.css';
import { InputSearchBar } from './InputSearchBar';
import { Loader } from '../Loader';
import { NuevaNota } from '../Nota/client/nueva-nota';
import { useNavigationContext } from '#@/app/context/main-context';
import { Drawer } from './Drawer';
import NavButtons from '../Buttons/nav-buttons';
import ModalDialog from '#@/app/hooks/modal-state';
import { NavBar } from './NavBar';

export function HeaderOld(
  {
    children,
  }: { children: ReactNode }
) {
  let modalSegment;

  const {
    isNavOpen
  } = useNavigationContext();

  if ( isNavOpen ) {
    modalSegment = <Drawer>{children}</Drawer>;
  }

  return (
    <div className={layout.header}>


      <Suspense fallback={<Loader />}>
        <InputSearchBar />
      </Suspense>


      <Suspense fallback={<Loader />}>
        <ModalDialog>
          <Suspense fallback={<Loader />}>
            <NuevaNota />
          </Suspense>
        </ModalDialog>
      </Suspense>
      <Suspense fallback={<Loader />}>
        <NavButtons />
      </Suspense>
      <NavBar />
      <Suspense fallback={<Loader/>}>
        {modalSegment}
      </Suspense>
    </div>
  );
}