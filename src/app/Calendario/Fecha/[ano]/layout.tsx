import { CalendarContextProvider } from '#@/app/Context/calendario-context';
import { LabelBoundary } from '#@/components/layout/boundary';
import { ReactNode } from 'react';

export default async function Layout(
  {
    params,
    children,
  }: {
    params: Promise<{ ano: string }>;
    children: ReactNode;
  } 
) {
  const {
    ano 
  } = await params;

  const segmentDate = new Date(
    ano 
  );

  return (
    <>
      <LabelBoundary color={'primary'}>
        <h1>{ano}</h1>
        <CalendarContextProvider date={segmentDate}>
          {children}
        </CalendarContextProvider>
      </LabelBoundary>
    </>
  );
}
