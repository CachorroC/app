'use client';

import { ReactNode, Suspense } from 'react';
import layout from '#@/styles/layout.module.css';
import InputSearchBar from './search/InputSearchBar';
import { Loader } from '../Loader';
import { NuevaNota } from '../Nota/client/nueva-nota';

import { useNavigationContext } from '#@/app/context/main-context';
import Drawer from './Drawer';
import NavButtons from '../Buttons/nav-buttons';
import Link from 'next/link';
import { Route } from 'next';
import styles from '../Buttons/buttons.module.css';
import ModalDialog from '#@/app/hooks/modal-state';
import { NuevaNotaFormProvider } from '#@/app/context/nueva-nota-form-context';

export default function Header(
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
      <section className={layout.segmentRow}>
        <Link
          href={'/' as Route}
          className={styles.buttonHome}
        >
          <span className={`material-symbols-outlined ${ styles.icon }`}>
            home
          </span>
          <span className={styles.text}>inicio</span>
        </Link>
        <Suspense fallback={<Loader />}>
          <InputSearchBar />
        </Suspense>
      </section>

      <Suspense fallback={<Loader />}>
        <ModalDialog>
          <Suspense fallback={<Loader />}>
            <NuevaNotaFormProvider>
              <NuevaNota />
            </NuevaNotaFormProvider>
          </Suspense>
        </ModalDialog>
      </Suspense>
      <Suspense fallback={<Loader />}>
        <NavButtons />
      </Suspense>
      <Suspense fallback={<Loader/>}>
        {modalSegment}
      </Suspense>
    </div>
  );
}
