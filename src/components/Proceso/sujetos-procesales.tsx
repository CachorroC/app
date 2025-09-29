import typography from '#@/styles/fonts/typography.module.css';
import { Fragment } from 'react';

export default function SujetosProcesales(
  {
    sujetosProcesalesRaw,
  }: {
    sujetosProcesalesRaw: string;
  } 
) {
  const mapperObject = new Map();

  const matcher = sujetosProcesalesRaw.matchAll(
    /(\s?)([A-Za-z\s/]+)(:)(\s?)([A-Za-z\s.ÓóÚúÍíÁáÉéÑñ()]+)(\|?)/gim, 
  );

  for ( const matchedValue of matcher ) {
    mapperObject.set(
      matchedValue[ 2 ].trim(), matchedValue[ 5 ].trim() 
    );
  }

  const objectify = Array.from(
    mapperObject.entries() 
  );

  return objectify.map(
    (
      object 
    ) => {
      const [
        key,
        value
      ] = object;

      return (
        <Fragment key={key}>
          <sub
            style={{
              color: 'var(--primary)',
            }}
            className={typography.labelSmall}
          >
            {key}
          </sub>
          <h5
            style={{
              color: 'var(--secondary)',
            }}
            className={typography.titleMedium}
          >
            {value}
          </h5>
        </Fragment>
      );
    } 
  );
}
