import { NotasSortButtons } from '#@/components/Nota/client/nota-sort-buttons';
import { ReactNode } from 'react';

export default function NotasRightLayout(
  {
    children,
  }: {
  children: ReactNode;
} 
) {
  return (
    <>
      <NotasSortButtons />
      {children}
    </>
  );
}
