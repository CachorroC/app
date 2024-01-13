import { ReactNode } from 'react';

export default function Layout (
  {
    children, ingreso
  }: { children: ReactNode; ingreso: ReactNode }
)
{
  return (
    <>
      { children }
      { ingreso }
    </>
  );
}