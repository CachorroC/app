import { CalendarContextProvider } from '#@/app/context/calendario-context';
import { LabelBoundary } from '#@/components/layout/boundary';
import { OutputDateHelper } from '#@/lib/project/date-helper';
import { ReactNode } from 'react';

export default function Layout (
  {
    params, children
  }: { params: { ano: string; mes: string; dia: string };  children: ReactNode}
) {

  const segmentDate = new Date(
    Number(
      params.ano
    ), Number(
      params.mes
    ) - 1, Number(
      params.dia
    )
  );

  const dateOutput = OutputDateHelper(
    segmentDate
  );
  return (

    <>
      <LabelBoundary color={ 'tertiary' }>
        <h1>{dateOutput }</h1>
        <CalendarContextProvider date={ segmentDate}>
          {children}
        </CalendarContextProvider>
      </LabelBoundary>
    </>
  );
}