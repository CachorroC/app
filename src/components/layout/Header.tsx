'use client';
import { Suspense } from 'react';
import { useMediaQuery } from '#@/app/hooks/useMediaQuery';
import { useNavigationContext } from '#@/app/context/main-context';
import layout from '#@/styles/layout.module.css';
import ModalDialog from '#@/app/hooks/modal-state';
import NavButtons, { DrawerMenuButton, } from '#@/components/Buttons/nav-buttons';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import { InputSearchBar } from './InputSearchBar';
import { SearchOutputListSkeleton } from './search/SearchProcesosOutputSkeleton';
import { SearchOutputList } from './search/SearchProcesosOutput';
import { Drawer } from './Drawer';
import { NavLink } from './NavLink';

export const Header = () => {
  let visibleContent;
  let nonVisibleContent;

  const {
    isNavOpen
  } = useNavigationContext();

  const isMobile = useMediaQuery(
    '(max-width: 600px)'
  );

  const isTablet = useMediaQuery(
    '(min-width: 600px)and (max-width: 840px)'
  );

  const isDesktop = useMediaQuery(
    '(min-width: 840px)'
  );

  if ( isMobile ) {
    visibleContent = (
      <>
        <DrawerMenuButton />
      </>
    );
    nonVisibleContent = (
      <>
        <InputSearchBar />
        <NavLink
          key={'home'}
          iconLabel={'home'}
          textLabel={'Inicio'}
          hrefLabel="/"
        />
        <NavLink
          iconLabel={'folder_open'}
          key={'carpetas'}
          textLabel={'Carpetas'}
          hrefLabel="/Carpetas"
        />
        <NavLink
          key={'note'}
          iconLabel={'note'}
          textLabel={'Notas'}
          hrefLabel="/Notas"
        />
        <NavLink
          iconLabel={'gavel'}
          textLabel={'Reciente'}
          key={'actuaciones'}
          hrefLabel="/Carpetas/UltimasActuaciones"
        />
        <DrawerMenuButton />
        <ModalDialog>
          <NuevaNota />
        </ModalDialog>
        <Suspense fallback={<SearchOutputListSkeleton />}>
          <SearchOutputList />
        </Suspense>
      </>
    );
  } else if ( isTablet ) {
    visibleContent = (
      <>
        <DrawerMenuButton />
        <ModalDialog>
          <NuevaNota />
        </ModalDialog>
      </>
    );
    nonVisibleContent = (
      <>
        <InputSearchBar />

        <Suspense fallback={<SearchOutputListSkeleton />}>
          <SearchOutputList />
        </Suspense>
      </>
    );
  } else if ( isDesktop ) {
    visibleContent = (
      <>
        <InputSearchBar />
        <ModalDialog>
          <NuevaNota />
        </ModalDialog>
        <NavButtons />
      </>
    );
    nonVisibleContent = (
      <Suspense fallback={<SearchOutputListSkeleton />}>
        <SearchOutputList />
      </Suspense>
    );
  } else {
    visibleContent = null;
    nonVisibleContent = null;
  }

  return (
    <div className={layout.header}>
      <NavLink
        key={'home'}
        iconLabel={'home'}
        textLabel={'Inicio'}
        hrefLabel="/"
      />
      <NavLink
        iconLabel={'folder_open'}
        key={'carpetas'}
        textLabel={'Carpetas'}
        hrefLabel="/Carpetas"
      />
      <NavLink
        key={'note'}
        iconLabel={'note'}
        textLabel={'Notas'}
        hrefLabel="/Notas"
      />
      <NavLink
        iconLabel={'gavel'}
        textLabel={'Reciente'}
        key={'actuaciones'}
        hrefLabel="/Carpetas/UltimasActuaciones"
      />
      {visibleContent}
      {isNavOpen && <Drawer>{nonVisibleContent}</Drawer>}
    </div>
  );
};
