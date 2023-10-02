'use client';
import { useCarpetaSort } from '#@/app/context/carpetas-sort-context';
import styles from 'components/Card/card.module.css';
import { Card } from '#@/components/Card';
import { fixFechas } from '#@/lib/project/helper';
import card from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { useSearch } from '#@/app/context/search-context';
import { useCategory } from '#@/app/context/main-context';
import { JSX } from 'react';


export default function CarpetasList(
  {
    path,
  }: {
  path: string;
}
) {
  const rows: JSX.Element[] = [];


  const carpetasReduced = useCarpetaSort();

  const {
    search
  } = useSearch();

  const {
    category
  } = useCategory();


  carpetasReduced.forEach(
    (
      proceso
    ) => {
      const {
        ultimaActuacion
      } = proceso;

      if ( proceso.nombre.toLowerCase()
        .indexOf(
          search.toLowerCase()
        ) === -1 ) {
        return;
      }

      if ( category === 'todos' || category === proceso.category ) {
        rows.push(
          <Card key={ proceso._id } path={ path } carpeta={ proceso } >
            <div className={styles.section}>
              { ultimaActuacion && (
                <h5 className={ ` ${ card.actuacion } ${ typography.headlineMedium }` }>
                  { `ultima actuacion registrada en el servidor: ${ ultimaActuacion.actuacion }` }
                </h5>
              ) }

              {ultimaActuacion?.anotacion && (
                <p className={` ${ card.anotacion } ${ typography.labelSmall }`}>
                  {ultimaActuacion.anotacion}
                </p>
              )}
              <sub className={card.date}>
                {fixFechas(
                  ultimaActuacion?.fechaActuacion ?? ''
                )}
              </sub>

            </div>
          </Card>
        );
      }
    }
  );

  return <>
    {rows}</>;
}
