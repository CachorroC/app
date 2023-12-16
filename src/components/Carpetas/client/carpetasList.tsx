'use client';
import { useCarpetaSort, useCarpetaSortDispatch,  } from '#@/app/context/carpetas-sort-context';
import {  Card } from '#@/components/Card';
import { useSearch } from '#@/app/context/search-context';
import { JSX, useState } from 'react';
import { ActuacionComponent } from '#@/components/Card/actuacion-component';
import {  Category, MonCarpeta } from '#@/lib/types/carpetas';

export function CarpetasList(
  {
    carpetas
  }: {
    carpetas: MonCarpeta[];
  }
) {
      const rows: JSX.Element[] = [];

      const [
        selectedId,
        setSelectedId
      ] = useState(
        carpetas[ 0 ].numero
      );

      const categories = [
        'Terminados',
        'LiosJuridicos',
        'Bancolombia',
        'Reintegra',
        'Insolvencia',
        'sinEspecificar',
        'todos',
      ];

      const carpetasReduced = useCarpetaSort();

      const dispatchCarpetas = useCarpetaSortDispatch();

      const {
        search
      } = useSearch();

      const [
        category,
        setCategory
      ] = useState(
        'todos'
      );

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
                      </Card>
                    );
                  }
        }
      );

      return (
        <>
          {carpetas.map(
            (
              tabId
            ) => {
                      return (
                        <button
                          key={tabId._id}
                          onClick={() => {
                                    return setSelectedId(
                                      tabId.numero
                                    );
                          }}
                        >
                          {}
                        </button>
                      );
            }
          )}
          {categories.map(
            (
              tabId
            ) => {
                      return (
                        <button
                          key={tabId}
                          onClick={() => {
                                    setCategory(
                                      tabId
                                    );
                                    return dispatchCarpetas(
                                      {
                                        type         : 'fecha',
                                        sortDirection: true,
                                        category     : category as Category,
                                      }
                                    );
                          }}
                        >

                        </button>
                      );
            }
          )}
          <hr />
          <div key={selectedId}>
            <h3>{}</h3>
            {}
          </div>
          {rows}
        </>
      );
}
