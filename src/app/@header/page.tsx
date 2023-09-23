
import CarpetasList from '#@/components/Carpetas/client/carpetasList';
import Header from '#@/components/layout/header';
import SearchOutputListSkeleton from '#@/components/layout/search/SearchProcesosOutputSkeleton';
import { Suspense } from 'react';

export default function Page () {

  return (
    <Header  >
      <Suspense fallback={<SearchOutputListSkeleton />}>
        <CarpetasList path={ '/Procesos' }  />
      </Suspense>
    </Header>
  );
}
