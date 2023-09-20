import { ReactNode, Suspense } from 'react';
import { Loader } from '#@/components/Loader';
import SearchOutputList from 'components/layout/search/SearchProcesosOutput';
import Drawer from 'components/layout/drawer';
import getCarpetas from '#@/lib/project/getCarpetas';
import SearchOutputListSkeleton from './search/SearchProcesosOutputSkeleton';

export default async function TopBar(
            {
                            children 
            }: { children: ReactNode } 
) {
  const carpetas = await getCarpetas();

  return (
    <>
      {children}
      <Suspense fallback={<Loader />}>
        <Drawer>
          <Suspense fallback={<SearchOutputListSkeleton />}>
            <SearchOutputList
              path={'/Procesos'}
              fechas={carpetas}
            />
          </Suspense>
        </Drawer>
      </Suspense>
    </>
  );
}
