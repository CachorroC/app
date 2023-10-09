'use client';
import { useCarpetaSort } from '#@/app/context/carpetas-sort-context';
import styles from 'components/Card/card.module.css';
import { Card } from '#@/components/Card';
import { useSearch } from '#@/app/context/search-context';
import { useCategory } from '#@/app/context/main-context';
import { JSX } from 'react';
import ActuacionComponent from '#@/components/Card/actuacion-component';


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
            <div className={ styles.section }>
              {ultimaActuacion && (  <ActuacionComponent incomingActuacion={ ultimaActuacion }  /> )}

            </div>
          </Card>
        );
      }
    }
  );

  return <>
    {rows}</>;
}
