'use client';
import styles from '#@/components/Buttons/buttons.module.css';
import Link from 'next/link';
import layout from '#@/styles/layout.module.css';
import { ActionName } from '#@/lib/project/sortert';
import { useState } from 'react';
import typography from '#@/styles/fonts/typography.module.css';
import { usePathname } from 'next/navigation';
import { Route } from 'next';

const options = [
  {
    name : 'Sort',
    value: 'sort',
    items: [
      'asc',
      'desc'
    ],
  },
  {
    name : 'Page',
    value: 'filter',
    items: [
      'fecha',
      'nombre',
      'numero',
      'category',
      'tipoProceso',
      'cc',
    ]
  },

];

export default function Page(
  {
    searchParams
  }:{  searchParams?: { [key: string]: string }}
) {
  let content;




  const keys: ActionName[] = [
    'fecha',
    'nombre',
    'numero',
    'category',
    'tipoProceso',
    'cc',
  ];

  const pathname = usePathname();

  const [
    sortDirection,
    setSortDirection
  ] = useState(
    true
  );

  if ( !searchParams ) {
    content = (
      <section className={layout.segmentColumn}>
        {keys.map(
          (
            key
          ) => {
            return (
              <Link
                onClick={ () => {
                  setSortDirection(
                    (
                      d
                    ) => {
                      return !d;

                    }
                  );


                } }
                className={ styles.buttonPassiveCategory }
                key={ key } href={ `/Carpetas/UltimasActuaciones?filter=${ key }&sort=${ sortDirection
                  ? 'asc'
                  : 'desc' }`}>
                {key}
              </Link>
            );
          }
        )}
      </section>
    );
  } else {
    content = (
      <section className={layout.sectionColumn}>
        {options.map(
          (
            option
          ) => {
            return (
              <div key={option.name}>
                <div className={typography.titleSmall}>{option.name}</div>

                <div className={layout.segmentColumn}>
                  {option.items.map(
                    (
                      item, i
                    ) => {
                      const isActive = ( !searchParams[ option.value ] && i === 0 ) || item === searchParams[ option.value ];

                      const params = new URLSearchParams(
                        searchParams
                      );
                      params.set(
                        option.value, item
                      );

                      const stringParams = params.toString();

                      return (
                        <Link
                          key={ item }
                          href={ `${ pathname }?${ stringParams }` as Route}
                          className={isActive
                            ? styles.buttonActiveCategory
                            : styles.buttonPassiveCategory}
                        >
                          {item}
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
            );
          }
        )}
      </section>

    );
  }

  return (
    <>

      <h1>{'ordenar:'}</h1>
      <span> {sortDirection
        ? 'ascendente'
        : 'descendente'} </span>
      <span className="material-symbols-outlined">
        {sortDirection
          ? 'arrow_upward'
          : 'arrow_downward'}
      </span>

      {content}


    </>
  );
}
