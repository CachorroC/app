import { CalendarContextProvider } from '#@/app/Context/calendario-context';
import { Calendar } from '#@/components/Calendar/main';
import { LabelBoundary } from '#@/components/layout/boundary';
import { ReactNode } from 'react';

export default function Layout(
  {
    params,
    children,
  }: {
    params: { ano: string; mes: string };
    children: ReactNode;
  } 
) {
      const mes = Number(
        params.mes 
      );

      const segmentDate = new Date(
        Number(
          params.ano 
        ), Number(
          params.mes 
        ) - 1, 1 
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

      const dateOutput = months[ mes ];
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
