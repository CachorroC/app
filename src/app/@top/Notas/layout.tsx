import NoteFormOutput from '#@/components/Nota/client/note-form-output';
import { ReactNode } from 'react';

export default function Layout (
  {
    children
  }: {children: ReactNode}
) {
  return (
    <>
      <NoteFormOutput />
      { children }
    </>
  );
}