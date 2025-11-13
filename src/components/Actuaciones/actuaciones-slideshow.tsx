'use client';

import { outActuacion } from '#@/lib/types/actuaciones';
import { sectionRow } from '#@/styles/layout.module.css';
import { Suspense, use, useState } from 'react';
import styles from '../Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { ErrorBoundary } from 'react-error-boundary';
import { ActuacionLoader } from './actuacion-loader';

export function ActuacionesSlideshowErrorComponent() {
  return (
    <div className={styles.actuacionContainer}>
      <h5
        className={typography.headlineSmall}
        style={{
          backgroundColor: 'var(--error-container)',
          color          : 'var(--on-error-container)',
          borderBottom   : 'solud 0.2rem var(--error)',
        }}
      >
        Sin actuaciones
      </h5>
      <div className={sectionRow}></div>
      <span className={typography.labelSmall}>
        Esta carpeta no tiene registros en la Rama Judicial
      </span>
    </div>
  );
}

export function ActuacionesSlideshowContainer(
  {
    actuacionesPromise,
  }: {
    actuacionesPromise: Promise<outActuacion[]>;
  }
) {
  return (
    <ErrorBoundary fallback={<ActuacionesSlideshowErrorComponent />}>
      <Suspense fallback={<ActuacionLoader />}>
        <ActuacionesSlideshow actuacionesPromise={actuacionesPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

export function ActuacionesSlideshow(
  {
    actuacionesPromise,
  }: {
    actuacionesPromise: Promise<outActuacion[]>;
  }
) {
  const actuacionesList = use(
    actuacionesPromise
  );

  const [
    index,
    setIndex
  ] = useState(
    0
  );

  const [
    showMore,
    setShowMore
  ] = useState(
    false
  );



  const sculpture = actuacionesList[ index ];

  function handleNextClick() {
    setIndex(
      index + 1
    );
  }

  function handlePreviousClick () {
    setIndex(
      index - 1
    );
  }

  function handleMoreClick() {
    setShowMore(
      !showMore
    );
  }

  if ( actuacionesList.length === 0 ) {
    return (
      <div className={styles.actuacionContainer}>
        <h5 className={typography.headlineSmall}>No hay actuaciones</h5>
        <div className={styles.segmentedButtonsRow}>
          <button
            type={'button'}
            onClick={ handlePreviousClick }
            className={styles.button}
          >
            previous
          </button>
          <button
            type="button"
            onClick={ handleMoreClick }
            className={styles.button}
          >
            {showMore
              ? 'Hide'
              : 'Show'} details
          </button>
          <button
            type={'button'}
            onClick={ handleNextClick }
            className={styles.button}
          >
            Next
          </button>
        </div>
        {showMore && (
          <>
            <p className={typography.bodySmall}>
              Por favor verifique que el número de expediente esté completo con
              los 23 dígitos y vuelva a intentarlo.{' '}
              <strong className={typography.labelMedium}>gracias</strong>
            </p>

            <h3>{index + 1}</h3>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.actuacionContainer}>
      <h5 className={typography.headlineSmall}>{sculpture.actuacion}</h5>
      <div className={styles.segmentedButtonsRow}>
        <button
          type={'button'}
          onClick={ handlePreviousClick }
          className={styles.button}
        >
          previous
        </button>
        <button
          type="button"
          onClick={ handleMoreClick }
          className={styles.button}
        >
          {showMore
            ? 'Hide'
            : 'Show'} details
        </button>
        <button
          type={'button'}
          onClick={ handleNextClick }
          className={styles.button}
        >
          Next
        </button>
      </div>
      {showMore && (
        <>
          <p className={typography.bodySmall}>{sculpture.anotacion}</p>
          <h2 className={typography.labelLarge}>
            <OutputDateHelper incomingDate={sculpture.fechaActuacion} />
          </h2>
          <h3>
            ({index + 1} and {sculpture.consActuacion} of {sculpture.cant})
          </h3>
        </>
      )}
    </div>
  );
}
