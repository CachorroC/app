import { CarpetasTable } from '#@/components/Carpetas/client/carpetasList';
import { LefttableLoader } from '#@/components/Table/loader';
import { Fragment, Suspense } from 'react';


export default async function Page() {

  return (
    <Fragment>
      <Suspense fallback={ <LefttableLoader /> }>
        <CarpetasTable />
      </Suspense>

    </Fragment>
  );
}
