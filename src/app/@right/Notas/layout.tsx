import { Loader } from 'components/Loader';
import { CurrentRoute } from '#@/lib/client/current-route';
import { ReactNode, Suspense } from 'react';

export default function Layout(
  {
    children
  }: { children: ReactNode }
) {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <CurrentRoute />
      </Suspense>

      {children}
    </>
  );
}
