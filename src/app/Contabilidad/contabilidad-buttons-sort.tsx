'use client';

import styles from '#@/components/Buttons/buttons.module.css';
import { useState } from 'react';
import layout from '#@/styles/layout.module.css';
import { useFacturaSortDispatch } from './facturas-context-provider';
import { SortActionType } from '../Hooks/useFacturasReducer';

type sortingType =
  | 'fecha'
  | 'id'
  | 'razonSocial'
  | 'valorTotal'
  | 'valorBase'
  | 'valorIva'
  | 'valorOtroImp';
interface optionsType {
  name: string;
  value: keyof SortActionType;
  items: string[] | sortingType[];
}

const options: optionsType[] = [
  {
    name : 'Sort',
    value: 'dir',
    items: [
      'asc',
      'dsc'
    ],
  },
  {
    name : 'Page',
    value: 'sortingKey',
    items: [
      'fecha',
      'id',
      'razonSocial',
      'valorTotal',
      'valorBase',
      'valorIva',
      'valorOtroImp',
    ],
  },
  {
    name : 'Items Per Page',
    value: 'type',
    items: [
      'sort'
    ],
  },
];

export function FacturasSortButtons() {
  const keys: sortingType[] = [
    'fecha',
    'id',
    'razonSocial',
    'valorTotal',
    'valorBase',
    'valorIva',
    'valorOtroImp',
  ];

  const dispatchFacturas = useFacturaSortDispatch();

  const [
    currentDispatcher,
    setCurrentDispatcher
  ] = useState<SortActionType>(
    {
      type      : 'sort',
      dir       : true,
      sortingKey: 'fecha',
    } 
  );

  return (
    <>
      <div>
        <h1>{'ordenar:'}</h1>
        <span>{currentDispatcher.dir
          ? 'ascendente'
          : 'descendente'}</span>
        <span className="material-symbols-outlined">
          {currentDispatcher.dir
            ? 'arrow_upward'
            : 'arrow_downward'}
        </span>
      </div>
      {options.map(
        (
          {
            name, value, items 
          } 
        ) => {
          return (
            <section
              key={value}
              className={layout.sectionColumn}
            >
              <h5>{name}</h5>
              <section className={layout.sectionRow}>
                {items.map(
                  (
                    item 
                  ) => {
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          console.log(
                            currentDispatcher[ value ] 
                          );

                          return dispatchFacturas(
                            {
                              ...currentDispatcher,
                              sortingKey: item as sortingType,
                            } 
                          );
                        }}
                      >
                        {item}
                      </button>
                    );
                  } 
                )}
              </section>
            </section>
          );
        } 
      )}
      <section className={layout.segmentColumn}>
        {keys.map(
          (
            key 
          ) => {
            return (
              <button
                type="button"
                onClick={() => {
                  setCurrentDispatcher(
                    (
                      curdispatch 
                    ) => {
                      return {
                        ...curdispatch,
                        sortingKey: key,
                        dir       : !curdispatch.dir,
                      };
                    } 
                  );
                  return dispatchFacturas(
                    {
                      ...currentDispatcher,
                      sortingKey: key,
                    } 
                  );
                }}
                className={
                  currentDispatcher.sortingKey === key
                    ? styles.buttonActiveCategory
                    : styles.buttonPassiveCategory
                }
                key={key}
              >
                {key}
              </button>
            );
          } 
        )}
        <button
          type="button"
          onClick={() => {
            setCurrentDispatcher(
              (
                d 
              ) => {
                return {
                  ...d,
                  dir: !d.dir,
                };
              } 
            );
            return dispatchFacturas(
              currentDispatcher 
            );
          }}
          className={styles.buttonPassiveCategory}
        >
          {currentDispatcher.dir}
        </button>
      </section>
    </>
  );
}

export function TableRowFacturaSortingButton(
  {
    sortKey,
  }: {
  sortKey:
    | 'fecha'
    | 'id'
    | 'razonSocial'
    | 'valorTotal'
    | 'valorBase'
    | 'valorIva'
    | 'valorOtroImp';
} 
) {
  const dispatchFacturas = useFacturaSortDispatch();

  const [
    currentDispatcher,
    setCurrentDispatcher
  ] = useState<SortActionType>(
    {
      type      : 'sort',
      dir       : true,
      sortingKey: 'fecha',
    } 
  );
  return (
    <th>
      <button
        type="button"
        onClick={() => {
          setCurrentDispatcher(
            (
              curdispatch 
            ) => {
              return {
                ...curdispatch,
                sortingKey: sortKey,
                dir       : !curdispatch.dir,
              };
            } 
          );
          return dispatchFacturas(
            {
              ...currentDispatcher,
              sortingKey: sortKey,
              dir       : !currentDispatcher.dir,
            } 
          );
        }}
        className={
          currentDispatcher.sortingKey === sortKey
            ? styles.buttonActiveCategory
            : styles.buttonPassiveCategory
        }
        key={sortKey}
      >
        {sortKey}
      </button>
    </th>
  );
}
