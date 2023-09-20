import { Loader } from 'components/Loader';
import NoteFormOutput from 'components/Nota/client/note-form-output';
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
      <NoteFormOutput />

      {children}
    </>
  );
}
