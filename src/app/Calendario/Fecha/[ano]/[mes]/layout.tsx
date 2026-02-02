import { CalendarContextProvider } from '#@/app/Context/calendario-context';
import { Calendar } from '#@/components/Calendar/main';
import { LabelBoundary } from '#@/components/layout/boundary';
import { ReactNode } from 'react';

export default async function Layout( {
  params,
  children,
}: {
  params  : Promise <{ ano: string; mes: string }>;
  children: ReactNode;
} ) {
  const {
    ano, mes 
  } = await params;

  const month = Number( mes );

  const segmentDate = new Date(
    Number( ano ), Number( mes ) - 1, 1
  );

  const months = [
    'Zerooo',
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const dateOutput = months[ month ];

  return (
    <>
      <LabelBoundary color={'secondary'}>
        <h1>{dateOutput}</h1>
        <CalendarContextProvider date={segmentDate}>
          <Calendar />
          {children}
        </CalendarContextProvider>
      </LabelBoundary>
    </>
  );
}
