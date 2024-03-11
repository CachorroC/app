'use client';

import styles from '#@/components/Card/card.module.css';
import { RequestActuacion } from '#@/lib/types/actuaciones';
import layout from '#@/styles/layout.module.css';
import { Suspense, use } from 'react';
import typography from '#@/styles/fonts/typography.module.css';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { ActuacionLoader } from '#@/components/Card/actuacion-loader';

import { ErrorBoundary } from 'react-error-boundary';
import { ActuacionTableErrorComponent } from '#@/components/Carpetas/client/carpetasList';

export function ActuacionClientContainer(
  {
    consultaActuacionesPromise,
  }: {
    consultaActuacionesPromise: Promise<RequestActuacion>;
  }
) {
      return (
        <ErrorBoundary fallback={<ActuacionTableErrorComponent />}>
          <Suspense fallback={<ActuacionLoader />}>
            <ActuacionClientComponent
              consultaActuacionesPromise={consultaActuacionesPromise}
            />
          </Suspense>
        </ErrorBoundary>
      );
}

export function ActuacionClientComponent(
  {
    consultaActuacionesPromise,
  }: {
    consultaActuacionesPromise: Promise<RequestActuacion>;
  }
) {
      const {
        ConsultaActuaciones
      } = use(
        consultaActuacionesPromise
      );

      if ( !ConsultaActuaciones || ConsultaActuaciones.actuaciones.length === 0 ) {
        return (

          <div className={styles.containerFilledEnabled}>
            <div className={layout.segmentRow}>
              <h5 className={typography.titleSmall}>No hay actuaciones</h5>
              <p className={typography.labelSmall}>por favor revise que la llaveProceso y el idProceso estén correctos</p>
            </div>
            <p className={typography.bodySmall}>gracias</p>
          </div>
        );
      }

      const [ ultimaActuacion ] = ConsultaActuaciones.actuaciones;

      const {
        actuacion, anotacion, fechaActuacion
      } = ultimaActuacion;

      return (
        <div className={styles.containerFilledEnabled}>
          <div className={layout.segmentRow}>
            <h5 className={typography.titleSmall}>{actuacion}</h5>
            <OutputDateHelper incomingDate={ fechaActuacion} className={typography.labelSmall} />
          </div>
          {anotacion && <p className={typography.bodySmall}>{anotacion}</p>}
        </div>
      );
}
