
import SearchOutputList from '#@/components/layout/search/SearchProcesosOutput';
import SearchOutputListSkeleton from '#@/components/layout/search/SearchProcesosOutputSkeleton';
import Header from 'components/layout/header';
import { Suspense } from 'react';

export default  function Default () {

  return (
    <Header>
      <Suspense fallback={<SearchOutputListSkeleton />}>
        <SearchOutputList path={ '/Procesos' }  />
      </Suspense>
    </Header>
  );
}
