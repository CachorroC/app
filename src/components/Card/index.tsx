import { MonCarpeta } from '#@/lib/types/carpetas';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './card.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import type { Route } from 'next';
import layout from '#@/styles/layout.module.css';
import { CopyButton } from '../Buttons/copy-buttons';
import { RevisadoCheckBox } from '#@/app/dashboard/Carpetas/revisado-checkbox';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { containerEnabled } from './filled.module.css';

export const Card = ( {
  carpeta,
  children,
}: {
  carpeta : MonCarpeta;
  children: ReactNode;
} ) => {
  let contentIdProcesos;

  const llaveLength = carpeta.llaveProceso?.length;

  const errorLLaveProceso = llaveLength
    ? llaveLength < 23
    : true;

  const {
    idProcesos, nombre, numero
  } = carpeta;

  const carpetaHref: Route<`/dashboard/Carpeta/${number}`> = `/dashboard/Carpeta/${ numero }`;
  const editarHref: Route<`/dashboard/Carpeta/${number}/Editar`> = `/dashboard/Carpeta/${ numero }/Editar`;

  if ( !idProcesos || idProcesos.length === 0 ) {
    contentIdProcesos = <span>no hay idProcesos</span>;
  } else {
    contentIdProcesos = idProcesos.map( ( idProceso ) => {
      const actuacionesHref: Route<`/dashboard/Carpeta/${string}/ultimasActuaciones/${string}`> = `/dashboard/Carpeta/${ String( numero ) }/ultimasActuaciones/${ String( idProceso ) }`;

      return (
        <Link
          key={idProceso}
          href={actuacionesHref}
          className={styles.link}
        >
          <span className={`material-symbols-outlined ${ styles.icon }`}>
            inventory
          </span>
        </Link>
      );
    } );
  }

  return (
    <div className={containerEnabled}>
      <div
        className={`${ styles.card } ${
          errorLLaveProceso && styles.errorContainer
        }`}
      >
        <section className={layout.sectionRow}>
          <h4 className={typography.titleMedium}>{nombre}</h4>
          <Link
            className={styles.link}
            href={carpetaHref}
          >
            <span className={`${ typography.labelLarge } ${ layout.text }`}>
              {numero.toString()}
            </span>
            <span className={`material-symbols-outlined ${ layout.icon }`}>
              folder
            </span>
          </Link>
        </section>
        {children}
        <div className={layout.segmentRow}>{contentIdProcesos}</div>

        <div className={styles.links}>
          {errorLLaveProceso && (
            <Link
              href={editarHref}
              className={styles.link}
            >
              {'error con el numero de expediente'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export const CardRow = ( {
  carpeta,
  children,
}: {
  carpeta : MonCarpeta;
  children: ReactNode;
} ) => {
  const llaveLength = carpeta.llaveProceso?.length;

  const errorLLaveProceso = llaveLength
    ? llaveLength < 23
    : true;

  const {
    numero, idProcesos, revisado, id
  } = carpeta;

  const idProcesosLength = idProcesos.length;
  const editarHref: Route<`/dashboard/Carpeta/${number}/Editar`> = `/dashboard/Carpeta/${ numero }/Editar`;

  let carpetaHref;

  if ( idProcesosLength > 1 ) {
    carpetaHref = idProcesos.map( (
      idProceso, index
    ) => {
      const actuacionesHref: Route<`/dashboard/Carpeta/${number}/ultimasActuaciones/${string}`> = `/dashboard/Carpeta/${ carpeta.numero }/ultimasActuaciones/${ idProceso }`;

      return (
        <Link
          key={idProceso}
          href={actuacionesHref}
        >
          <span className={`${ typography.labelLarge } ${ layout.text }`}>
            {`#${ numero } - ${ index }`}
          </span>
        </Link>
      );
    } );
  } else if ( idProcesosLength === 1 ) {
    const primerActuacionHref: Route<`/dashboard/Carpeta/${number}/ultimasActuaciones/${string}`> = `/dashboard/Carpeta/${ carpeta.numero }/ultimasActuaciones/${ idProcesos[ 0 ] }`;

    carpetaHref = (
      <Link
        key={idProcesos[ 0 ]}
        href={primerActuacionHref}
      >
        <span className={`${ typography.labelLarge } ${ layout.text }`}>
          {`#${ numero }`}
        </span>
      </Link>
    );
  } else {
    carpetaHref = (
      <Link
        key={numero}
        href={`/dashboard/Carpeta/${ numero }`}
      >
        <span className={`${ typography.labelLarge } ${ layout.text }`}>
          {`#${ numero }`}
        </span>
      </Link>
    );
  }

  return (
    <tr>
      <td>{carpetaHref}</td>
      <td>
        {
          <Link
            href={`/dashboard/Carpeta/${ numero }`}
            className={typography.titleSmall}
          >
            {carpeta.nombre.toLocaleLowerCase()}
          </Link>
        }
      </td>
      <td>
        <OutputDateHelper incomingDate={carpeta.fecha} />
      </td>

      <td>{carpeta.category}</td>
      {errorLLaveProceso
        ? (
            <>
              <td>
                <Link
                  href={editarHref}
                  className={styles.link}
                >
                  {'error con el numero de expediente'}
                </Link>
              </td>
              <td>Sin anotaciones</td>
            </>
          )
        : (
            children
          )}
      <RevisadoCheckBox
        numero={numero}
        id={id}
        initialRevisadoState={revisado}
      />
      <td>
        <CopyButton
          copyTxt={carpeta.llaveProceso}
          name={'expediente'}
        />
      </td>
    </tr>
  );
};
