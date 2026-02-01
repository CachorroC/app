
import { UsersTable } from '#@/components/Carpetas/client/UserTable';
import { LefttableLoader } from '#@/components/Table/loader';
import { Fragment, Suspense } from 'react';


export default async function Page() {

  return (
    <Fragment>
      <Suspense fallback={ <LefttableLoader /> }>
        <UsersTable />
      </Suspense>

    </Fragment>
  );
}
