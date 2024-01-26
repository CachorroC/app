'use client';
import { useState } from 'react';
import styles from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';
import layout from '#@/styles/layout.module.css';
import button from '../Buttons/buttons.module.css';
import { outActuacion } from '#@/lib/types/actuaciones';

export function ActuacionComponent(
  {
    incomingActuacion,
    initialOpenState,
  }: {
    incomingActuacion: outActuacion;
    initialOpenState: boolean;
  }
) {
      const {
        actuacion,
        anotacion,
        idRegActuacion,
        consActuacion,
        fechaActuacion,
        cant,
      } = incomingActuacion;

      const [ isOpen, setIsOpen ] = useState(
        initialOpenState
      );
      let visibleContent;

      if ( isOpen ) {
        visibleContent = (
          <div className={layout.sectionColumn}>
            <sub className={styles.sub}>{`${ consActuacion } de ${ cant }`}</sub>
            <section className={layout.segmentRow}>
              <sub className={styles.sub}>{`actuacion registrada el ${ fixFechas(
                fechaActuacion,
              ) }`}</sub>
              {fechaActuacion && (
                <sub className={styles.date}>{fixFechas(
                  fechaActuacion
                )}</sub>
              )}
            </section>
            {`${ idRegActuacion }`}
            {anotacion && (
              <p className={` ${ styles.anotacion } ${ typography.labelSmall }`}>
                {anotacion}
              </p>
            )}
          </div>
        );
      } else {
        visibleContent = null;
      }

      return (
        <div className={layout.sectionRow}>
          <button
            className={button.buttonActuacion}
            type="button"
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
            <span className={`material-symbols-outlined ${ button.icon }`}>
              {isOpen
                ? 'expand_less'
                : 'expand_more'}
            </span>
          </button>
          <h5 className={` ${ styles.actuacion } ${ typography.titleSmall }`}>
            {actuacion}
          </h5>
          {visibleContent}
        </div>
      );
}
