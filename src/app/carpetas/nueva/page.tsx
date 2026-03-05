import NuevoProceso from '#@/components/Form/nuevo-proceso';
import { Loader } from '#@/components/Loader/main-loader';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <NuevoProceso />
    </Suspense>
  );
}
