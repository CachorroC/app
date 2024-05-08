'use client';

import { getActuaciones } from '#@/lib/project/utils/Actuaciones/actuaciones-main';
import { useMemo } from 'react';
import { ActuacionesSlideshowContainer } from './actuaciones-slideshow';

export default function ActuacionClientFetcher (
  {
    idProceso,
  }: {idProceso: number; }
) {
      const memoizedActuacion = useMemo(
        () => {
                  return getActuaciones(
                    {
                      idProceso,
                    }
                  );
        }, [ idProceso ]
      );
      return (
        <ActuacionesSlideshowContainer
          actuacionesPromise={memoizedActuacion}
          key={idProceso}
        />
      );
}