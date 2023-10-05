'use client';

import { Actuacion } from '#@/lib/types/actuaciones';
import { useState } from 'react';

import styles from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { fixFechas } from '#@/lib/project/helper';

export default function ActuacionComponent (
  {
    incomingActuacion
  }: { incomingActuacion: Actuacion }
) {
  const {
    actuacion, anotacion, idRegActuacion, consActuacion, fechaActuacion,  fechaRegistro,  cant
  } = incomingActuacion;

  const [
    isOpen,
    setIsOpen
  ] = useState(
    false
  );
  let visibleContent;

  if ( isOpen ) {
    visibleContent = (
      <>
        <sub className={ styles.sub }>{
          `${ consActuacion } de ${ cant }`
        }</sub>
        <sub className={ styles.sub }>{
          `actuacion registrada el ${ fixFechas(
            fechaRegistro
          ) }`
        }</sub>
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
        ) }
        { fechaActuacion && (
          <sub className={styles.date}>
            {
              fechaActuacion.toLocaleString(
                'es-CO', {
                  year   : 'numeric',
                  weekday: 'short',
                  month  : 'long',
                  day    : 'numeric',
                }
              )
            }
          </sub>
        )}
      </>
    );
  } else {
    visibleContent = (
      <sub className={styles.date}>
        {
          fechaActuacion && fechaActuacion.toLocaleString(
            'es-CO', {
              year   : 'numeric',
              weekday: 'short',
              month  : 'long',
              day    : 'numeric',
            }
          )
        }
      </sub>
    );
  }

  return (
    <div className={ styles.section } onClick={ (
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
    }}>
      {visibleContent}
    </div>
  );
}