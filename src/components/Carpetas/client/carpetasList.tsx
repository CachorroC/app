'use client';
import { useCarpetaSort } from '#@/app/context/carpetas-sort-context';
import { Card, CardRow } from '#@/components/Card';
import { useSearch } from '#@/app/context/search-context';
import { JSX } from 'react';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import { useCategory } from '#@/app/context/category-context';

export function CarpetasList() {
      const rows: JSX.Element[] = [];

      const carpetasReduced = useCarpetaSort();

      const {
        search
      } = useSearch();

      const {
        currentCategory
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

                  if ( currentCategory === 'todos' || currentCategory === proceso.category ) {
                    rows.push(
                      <Card
                        key={proceso.numero}
                        carpeta={proceso}
                      >
                        {ultimaActuacion && (
                          <ActuacionComponent
                            initialOpenState={false}
                            key={ultimaActuacion.idProceso}
                            incomingActuacion={ultimaActuacion}
                          />
                        )}
                      </Card>,
                    );
                  }
        }
      );

      return <>{rows}</>;
}



export function CarpetasTable() {

      const carpetasReduced = useCarpetaSort();
      /*
      const {
        search
      } = useSearch();

      const {
        currentCategory
      } = useCategory();

      carpetasReduced.forEach(
        (
          carpeta
        ) => {
                  const {
                    ultimaActuacion
                  } = carpeta;

                  if ( carpeta.nombre.toLowerCase()
                        .indexOf(
                          search.toLowerCase()
                        ) === -1 ) {
                    return;
                  }

                  if ( currentCategory === 'todos' || currentCategory === carpeta.category ) {
                    rows.push(
                      <CardRow
                        key={carpeta.numero}
                        carpeta={carpeta}
                      >
                        {ultimaActuacion && (
                          <ActuacionComponent
                            initialOpenState={false}
                            key={ultimaActuacion.idRegActuacion}
                            incomingActuacion={ultimaActuacion}
                          />
                        )}
                      </CardRow>
                    );
                  }
        }
      ); */

      return <>{ carpetasReduced.map(
        (
          carpeta
        ) => {
                  const {
                    ultimaActuacion
                  } = carpeta;
                  return (
                    <CardRow
                      key={carpeta.numero}
                      carpeta={carpeta}
                    >
                      {ultimaActuacion && (
                        <ActuacionComponent
                          initialOpenState={false}
                          key={ultimaActuacion.idRegActuacion}
                          incomingActuacion={ultimaActuacion}
                        />
                      )}
                    </CardRow>
                  );
        }
      )}</>;
}
