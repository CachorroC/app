'use client';

import { use, Suspense } from 'react';
import { ActuacionLoader } from '#@/components/Actuaciones/actuacion-loader';
import typography from '#@/styles/fonts/typography.module.css';
import styles from '#@/components/Card/card.module.css';
import { fixFechas } from '#@/lib/project/helper';
import { outActuacion } from '#@/lib/types/actuaciones';

export function ActuacionContainer(
  {
    actuacionPromise,
  }: {
    actuacionPromise: Promise<outActuacion>;
  } 
) {
  return (
    <Suspense fallback={<ActuacionLoader />}>
      <ActuacionClientComponent actuacionPromise={actuacionPromise} />
    </Suspense>
  );
}

export function ActuacionClientComponent(
  {
    actuacionPromise,
  }: {
    actuacionPromise: Promise<outActuacion>;
  } 
) {
  const {
    actuacion, anotacion, fechaActuacion, consActuacion, cant 
  }
    = use(
      actuacionPromise 
    );

  return (
    <>
      <td>
        <h5 className={` ${ styles.actuacion } ${ typography.titleSmall }`}>
          {actuacion}
        </h5>
        <sub
          className={typography.labelSmall}
        >{`${ consActuacion } de ${ cant }`}</sub>
      </td>
      <td>
        <sub
          className={typography.labelMedium}
        >{`actuacion registrada el ${ fixFechas(
            fechaActuacion 
          ) }`}</sub>
        {anotacion && (
          <p className={` ${ styles.anotacion } ${ typography.bodyMedium }`}>
            {anotacion}
          </p>
        )}
      </td>
    </>
  );
}
