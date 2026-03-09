import { Loader } from '#@/components/Loader/main-loader';
import { ReactNode, Suspense } from 'react';
import { DatabaseModelsContextProvider } from '../Context/database-models-context';

export default function Layout( {
  children 
}: { children: ReactNode } ) {
  return (
    <Suspense fallback={<Loader />}>
      <DatabaseModelsContextProvider>{children}</DatabaseModelsContextProvider>
    </Suspense>
  );
}
