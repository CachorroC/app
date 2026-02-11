import { CalendarContextProvider } from '#@/app/Context/calendario-context';
import { LabelBoundary } from '#@/components/layout/boundary';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { ReactNode, Suspense } from 'react';

// Force dynamic rendering if this route depends on data that changes
// or if you are hitting build errors with params.

export default async function Layout( {
  params,
  children,
}: {
  params  : Promise<{ ano: string; mes: string; dia: string }>;
  children: ReactNode;
} ) {
  const {
    ano, mes, dia
  } = await params;

  // Ensure numbers are valid to prevent "Invalid Date" errors during build
  const segmentDate = new Date(
    parseInt(
      ano, 10
    ),
    parseInt(
      mes, 10
    ) - 1,
    parseInt(
      dia, 10
    ),
  );

  return (
    <LabelBoundary color={'tertiary'}>
      <h1>
        {/* Wrap components that might trigger data fetching in Suspense */}
        <Suspense fallback={<span>Cargando fecha...</span>}>
          <OutputDateHelper incomingDate={segmentDate} />
        </Suspense>
      </h1>
      <CalendarContextProvider date={segmentDate}>
        {children}
      </CalendarContextProvider>
    </LabelBoundary>
  );
}