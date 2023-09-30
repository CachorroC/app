import { Calendar } from '#@/components/Calendar/main';
import { Loader } from '#@/components/Loader';
import SearchOutputList from 'components/layout/search/SearchProcesosOutput';
import SearchOutputListSkeleton from 'components/layout/search/SearchProcesosOutputSkeleton';
import { Suspense } from 'react';

export default function Page() {

  return (
    <>
      {' '}
      <Suspense fallback={<Loader />}>
        <Calendar />
      </Suspense>
      <Suspense fallback={<SearchOutputListSkeleton />}>
        <SearchOutputList
          path={'/Procesos'}
        />
      </Suspense>
    </>
  );
}
