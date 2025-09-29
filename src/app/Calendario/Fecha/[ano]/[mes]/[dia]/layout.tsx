import { CalendarContextProvider } from '#@/app/Context/calendario-context';
import { LabelBoundary } from '#@/components/layout/boundary';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { ReactNode } from 'react';

export default async function Layout(
  {
    params,
    children,
  }: {
    params: Promise<{ ano: string; mes: string; dia: string }>;
    children: ReactNode;
  } 
) {
  const {
    ano, mes, dia 
  } = await params;

  const segmentDate = new Date(
    Number(
      ano 
    ),
    Number(
      mes 
    ) - 1,
    Number(
      dia 
    ),
  );

  return (
    <>
      <LabelBoundary color={'tertiary'}>
        <h1>
          <OutputDateHelper incomingDate={segmentDate} />
        </h1>
        <CalendarContextProvider date={segmentDate}>
          {children}
        </CalendarContextProvider>
      </LabelBoundary>
    </>
  );
}
