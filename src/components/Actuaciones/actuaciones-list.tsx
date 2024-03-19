'use client';

import { outActuacion } from '#@/lib/types/actuaciones';
import { Suspense, use, useState } from 'react';
import { ActuacionLoader } from '../Card/actuacion-loader';
import { ErrorBoundary } from 'react-error-boundary';
import { ActuacionTableErrorComponent } from '../Carpetas/client/carpetasList';
import styles from '../Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { sectionRow } from '#@/styles/layout.module.css';


export function ActuacionesContainer(
  {
    actuacionesPromise
  }: {actuacionesPromise: Promise<outActuacion[]>}
) {
      return (
        <ErrorBoundary fallback={<ActuacionTableErrorComponent />}>
          <Suspense fallback={<ActuacionLoader />}>
            <ActuacionesGallery actuacionesPromise={actuacionesPromise} />
          </Suspense>
        </ErrorBoundary>
      );
}

export  function ActuacionesGallery(
  {
    actuacionesPromise
  }: {actuacionesPromise: Promise<outActuacion[]>}
) {
      const actuacionesList = use(
        actuacionesPromise
      );


      const [ index, setIndex ] = useState(
        0
      );

      const [ showMore, setShowMore ] = useState(
        true
      );



      if ( actuacionesList.length === 0 ) {
        throw  new Error(
          'no hay actuacioens'
        );
      }

      let sculpture = actuacionesList[ index ];

      function handleNextClick() {
            setIndex(
              index + 1
            );
      }

      function handleMoreClick() {
            setShowMore(
              !showMore
            );
      }




      return (
        <div className={styles.containerFilledEnabled}>

          <h5 className={typography.titleSmall}>
            {sculpture.actuacion}
          </h5>
          <div className={sectionRow}>
            <button type='button' onClick={handleMoreClick}>
              {showMore
                ? 'Hide'
                : 'Show'} details
            </button>
            <button type={'button'} onClick={handleNextClick}>
        Next
            </button>
          </div>
          { showMore && (
            <>
              <p className={ typography.bodySmall }>{ sculpture.anotacion }</p><OutputDateHelper incomingDate={ sculpture.fechaActuacion } className={ typography.labelSmall } /><h3>
              ({ index + 1 } and { sculpture.consActuacion } of { sculpture.cant })
              </h3>
            </>
          ) }

        </div>
      );
}
