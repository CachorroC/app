import { CarpetasTable } from '#@/components/Carpetas/client/carpetasList';
import { CarpetasSkeleton } from '#@/components/Carpetas/client/carpetas-skeleton';
import { Fragment, Suspense } from 'react';

export default async function Page() {
  return (
    <Fragment>
      <Suspense fallback={<CarpetasSkeleton />}>
        <CarpetasTable />
      </Suspense>
    </Fragment>
  );
}
