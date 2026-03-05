import { UsersTable } from '#@/components/Carpetas/client/UserTable';
import { LefttableLoader } from '#@/components/Table/loader';
import { Fragment, Suspense } from 'react';
import { StudioClone } from './studio-clone';
import { Loader } from '#@/components/Loader/main-loader';

export default async function Page() {
  return (
    <Fragment>
      <Suspense fallback={<LefttableLoader />}>
        <UsersTable />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <StudioClone />
      </Suspense>
    </Fragment>
  );
}
