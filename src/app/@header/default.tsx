import CarpetasList from '#@/components/Carpetas/client/carpetasList';
import SearchOutputListSkeleton from '#@/components/layout/search/SearchProcesosOutputSkeleton';
import Header from 'components/layout/header';
import { Suspense } from 'react';

export default  function Default () {

  return (
    <Header>
      <Suspense fallback={<SearchOutputListSkeleton />}>
        <CarpetasList path={ '/Procesos' }  />
      </Suspense>
    </Header>
  );
}
