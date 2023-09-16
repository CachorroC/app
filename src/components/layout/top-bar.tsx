import { ReactNode, Suspense } from 'react';
import { BackwardsButton, ForwardButton } from 'components/Buttons/NavButtons';
import { Loader } from '#@/components/Loader';
import InputSearchBar from 'components/layout/search/InputSearchBar';
import SearchOutputList from 'components/layout/search/SearchProcesosOutput';
import Drawer from 'components/layout/drawer';
import getCarpetas from '#@/lib/project/getCarpetas';
import SearchOutputListSkeleton from './search/SearchProcesosOutputSkeleton';
import { HomeButton } from '../Buttons/server-buttons';
import layout from '#@/styles/layout.module.css';

export const TopBar = async (
  {
    children
  }: {children: ReactNode}
) => {
  const carpetas = await getCarpetas();

  return (
    <div className={ layout.header }>
      {children}
      <Suspense fallback={<Loader />}>
        <Drawer>
          <Suspense fallback={<SearchOutputListSkeleton />}>
            <SearchOutputList path={'/Procesos'} fechas={carpetas} />
          </Suspense>
        </Drawer>
      </Suspense>
    </div>
  );
};
