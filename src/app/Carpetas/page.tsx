
import { CarpetasTable } from '#@/components/Carpetas/client/carpetasList';
import { LefttableLoader } from '#@/components/Table/loader';
import { Suspense } from 'react';

export const dynamic = 'force-static';

export default function Page() {
      return (

        <Suspense fallback={<LefttableLoader />}>
          <CarpetasTable />
        </Suspense>

      );
}
