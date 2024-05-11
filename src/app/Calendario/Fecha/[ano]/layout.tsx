import { CalendarContextProvider } from '#@/app/Context/calendario-context';
import { LabelBoundary } from '#@/components/layout/boundary';
import { ReactNode } from 'react';

export default function Layout(
  {
    params,
    children,
  }: {
  params: { ano: string };
  children: ReactNode;
} 
) {
  const segmentDate = new Date(
    params.ano 
  );

  return (
    <>
      <LabelBoundary color={'primary'}>
        <h1>{params.ano}</h1>
        <CalendarContextProvider date={segmentDate}>
          {children}
        </CalendarContextProvider>
      </LabelBoundary>
    </>
  );
}
