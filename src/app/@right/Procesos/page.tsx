import { Calendar } from '#@/components/Calendar/main';
import { Loader } from '#@/components/Loader';
import getCarpetas from '#@/lib/project/getCarpetas';
import SearchOutputList from 'components/layout/search/SearchProcesosOutput';
import SearchOutputListSkeleton from 'components/layout/search/SearchProcesosOutputSkeleton';
import { Suspense } from 'react';

export default async function Page() {
  const carpetas = await getCarpetas();

  return (
    <>
      {' '}
      <Suspense fallback={<Loader />}>
        <Calendar />
      </Suspense>
      <Suspense fallback={<SearchOutputListSkeleton />}>
        <SearchOutputList
          path={'/Procesos'}
          fechas={carpetas}
        />
      </Suspense>
    </>
  );
}
