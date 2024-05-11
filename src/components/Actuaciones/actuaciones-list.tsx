'use client';

import { outActuacion } from '#@/lib/types/actuaciones';
import { Suspense, use } from 'react';
import { ActuacionesLoader } from './actuacion-loader';
import { ErrorBoundary } from 'react-error-boundary';
import { gridContainer } from '#@/styles/layout.module.css';
import { ActuacionComponent } from './actuacion-component';
import { ActuacionTableErrorComponent } from './actuacion-table-component';

export function ActuacionesListContainer(
  {
    actuacionesPromise,
  }: {
  actuacionesPromise: Promise<outActuacion[]>;
} 
) {
  return (
    <ErrorBoundary fallback={<ActuacionTableErrorComponent />}>
      <Suspense fallback={<ActuacionesLoader />}>
        <ActuacionesList actuacionesPromise={actuacionesPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

export function ActuacionesList(
  {
    actuacionesPromise,
  }: {
  actuacionesPromise: Promise<outActuacion[]>;
} 
) {
  const actuaciones = use(
    actuacionesPromise 
  );

  return (
    <div className={gridContainer}>
      {actuaciones.map(
        (
          actuacion 
        ) => {
          return (
            <ActuacionComponent
              key={actuacion.idRegActuacion}
              incomingActuacion={actuacion}
            />
          );
        } 
      )}
    </div>
  );
}
