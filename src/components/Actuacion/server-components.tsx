import { fixFechas } from '#@/lib/project/helper';
import { MonCarpeta } from '#@/lib/types/carpetas';
import card from '../Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { getActuaciones } from '#@/lib/Actuaciones';
import { Actuacion } from '#@/lib/types/actuaciones';
import Link from 'next/link';
import styles from './actuaciones.module.css';
import type { Route } from 'next';
import { section } from '../form/form.module.css';

export const FechaActuacionComponent = async (
    {
                    carpeta,
                    index,
    }: {
  carpeta: MonCarpeta;
  index: number;
} 
) => {
      const actuaciones = await getActuaciones(
                  {
                                  carpeta: carpeta,
                                  index  : index,
                  } 
      );

      const ultimaActuacion = actuaciones
        ? actuaciones[ 0 ]
        : carpeta.ultimaActuacion;

      if ( !ultimaActuacion ) {
        return null;
      }

      return (
        <div className={section}>
          {ultimaActuacion.actuacion && (
            <h5 className={` ${ card.actuacion } ${ typography.titleSmall }`}>
              {ultimaActuacion.actuacion}
            </h5>
          )}
          {ultimaActuacion.anotacion && (
            <p className={` ${ card.anotacion } ${ typography.labelSmall }`}>
              {ultimaActuacion.anotacion}
            </p>
          )}
          <sub className={card.date}>
            {fixFechas(
                        ultimaActuacion.fechaActuacion 
            )}
          </sub>
        </div>
      );
};

export const ActuacionCard = (
    {
                    act 
    }: { act: Actuacion } 
) => {
      const {
                      idRegActuacion,
                      llaveProceso,
                      consActuacion,
                      fechaActuacion,
                      actuacion,
                      anotacion,
                      fechaInicial,
                      fechaFinal,
                      fechaRegistro,
                      codRegla,
                      conDocumentos,
                      cant,
      } = act;

      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={`${ typography.titleMedium } ${ styles.title }`}>
              {`${ actuacion }`}
            </h1>
            {anotacion && <p className={typography.bodyMedium}>{`${ anotacion }`}</p>}
            {conDocumentos && (
              <span className={`material-symbols-outlined ${ styles.icon }`}>
            file_present
              </span>
            )}
            <sub
              className={`${ typography.labelSmall } ${ styles.sub }`}
            >{`${ consActuacion } de ${ cant }`}</sub>
            <Link
              href={'/Notas/Nueva'}
              className={styles.button}
            >
              <span className={`material-symbols-outlined ${ styles.icon }`}>
            note_add
              </span>
            </Link>
            <sup className={`${ typography.labelMedium } ${ styles.date }`}>
              {fixFechas(
                          fechaActuacion 
              )}
            </sup>
          </div>
        </div>
      );
};

export const ActuacionesList = (
    {
                    actuaciones,
    }: {
  actuaciones: Actuacion[];
} 
) => {
      return (
        <>
          {actuaciones.map(
                      (
                          act, ind, arr 
                      ) => {
                            const {
                                            idRegActuacion 
                            } = act;

                            return (
                              <ActuacionCard
                                act={act}
                                key={ind}
                              />
                            );
                      } 
          )}
        </>
      );
};
