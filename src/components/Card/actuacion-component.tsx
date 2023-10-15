'use client';

import { Actuacion } from '#@/lib/types/actuaciones';
import { useState } from 'react';
import styles from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';
import layout from '#@/styles/layout.module.css';

export function ActuacionComponent(
  {
    incomingActuacion, initialOpenState
  }: {
  incomingActuacion: Actuacion; initialOpenState: boolean
}
) {
  const {
    actuacion,
    anotacion,
    idRegActuacion,
    consActuacion,
    fechaActuacion,
    fechaRegistro,
    cant,
  } = incomingActuacion;

  const [
    isOpen,
    setIsOpen
  ] = useState(
    initialOpenState
  );
  let visibleContent;

  if ( isOpen ) {
    visibleContent = (
      <div className={layout.sectionColumn}>
        <sub className={styles.sub}>{`${ consActuacion } de ${ cant }`}</sub>
        <sub className={styles.sub}>{`actuacion registrada el ${ fixFechas(
          fechaRegistro,
        ) }`}</sub>
        {`${ idRegActuacion }`}
        {actuacion && (
          <h5 className={` ${ styles.actuacion } ${ typography.titleSmall }`}>
            {actuacion}
          </h5>
        )}
        {anotacion && (
          <p className={` ${ styles.anotacion } ${ typography.labelSmall }`}>
            {anotacion}
          </p>
        )}
        {fechaActuacion && (
          <sub className={styles.date}>{fixFechas(
            fechaActuacion
          )}</sub>
        )}
      </div>
    );
  } else {
    visibleContent = (
      <sub className={styles.date}>{fixFechas(
        fechaActuacion
      )}</sub>
    );
  }

  return (
    <div
      className={styles.section}
      onClick={(
        e
      ) => {
        e.stopPropagation();
        setIsOpen(
          (
            n
          ) => {
            return !n;
          }
        );
      }}
    >
      {visibleContent}
    </div>
  );
}
