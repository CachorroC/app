import { CalendarContextProvider } from '#@/app/Context/calendario-context';
import { LabelBoundary } from '#@/components/layout/boundary';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { ReactNode } from 'react';

export default function Layout( {
  params,
  children,
}: {
  params: { ano: string; mes: string; dia: string };
  children: ReactNode;
} ) {
  const segmentDate = new Date(
    Number( params.ano ),
    Number( params.mes ) - 1,
    Number( params.dia ),
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
