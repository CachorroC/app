'use client';
import {  Suspense } from 'react';
import { useMediaQuery } from '#@/app/hooks/useMediaQuery';
import { useNavigationContext } from '#@/app/context/main-context';
import layout from '#@/styles/layout.module.css';
import ModalDialog from '#@/app/hooks/modal-state';
import NavButtons from '#@/components/Buttons/nav-buttons';
import { Loader } from '#@/components/Loader';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import { InputSearchBar } from './InputSearchBar';
import { SearchOutputListSkeleton } from './search/SearchProcesosOutputSkeleton';
import { SearchOutputList } from './search/SearchProcesosOutput';
import { Drawer } from './Drawer';
import { NavBar } from './NavBar';

export const Header = () => {
  let visibleContent;

  const {
    isNavOpen
  } = useNavigationContext();

  const isMobile = useMediaQuery(
    '(max-width: 600px)'
  );

  const isTablet = useMediaQuery(
    '(min-width: 768px)and (max-width: 1200px)'
  );

  const isDesktop = useMediaQuery(
    '(min-width: 1200px)'
  );

  if ( isMobile ) {
    visibleContent = (
      <NavBar />
    );
  } else if ( isTablet ) {
    visibleContent = (
      <div className={ layout.navRail }>
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
      </div>
    );
  } else if ( isDesktop ) {
    visibleContent = (
      <div className={ layout.navDrawer }>
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
      </div>
    );
  }

  return (
    <div className={ layout.header }>
      {visibleContent}
      { isNavOpen && (
        <Drawer>
          <Suspense fallback={<SearchOutputListSkeleton />}>
            <SearchOutputList />
          </Suspense>
        </Drawer>
      )}
    </div>

  );
};
