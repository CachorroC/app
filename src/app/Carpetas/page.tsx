
import { CarpetasTable } from '#@/components/Carpetas/client/carpetasList';
import { LefttableLoader } from '#@/components/Table/loader';
import { Suspense } from 'react';

export const revalidate = 86400;
// false | 0 | number

export default function Page () {


      return (

        <Suspense fallback={<LefttableLoader />}>
          <CarpetasTable />
        </Suspense>

      );
}
