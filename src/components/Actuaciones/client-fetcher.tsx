'use client';

import { useMemo } from 'react';
import { ActuacionesSlideshowContainer } from './actuaciones-slideshow';
import fetchActuaciones from '#@/lib/project/utils/Actuaciones';

export default function ActuacionClientFetcher( {
  idProceso,
}: {
  idProceso: number;
} ) {
  const memoizedActuacion = useMemo(
    () => {
      return fetchActuaciones( idProceso );
    }, [
      idProceso
    ]
  );

  return (
    <ActuacionesSlideshowContainer
      actuacionesPromise={memoizedActuacion}
      key={idProceso}
    />
  );
}
