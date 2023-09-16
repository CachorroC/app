import { Loader } from '#@/components/Loader';
import { CurrentRoute } from '#@/lib/client/current-route';
import { Suspense } from 'react';

export default function Default() {
  return (    <Suspense fallback={<Loader />}>
    <CurrentRoute />
  </Suspense> );
}
