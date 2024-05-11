'use client';
import { IntCarpeta } from '#@/lib/types/carpetas';
import Link from 'next/link';
import { ReactNode } from 'react';
import { CopyButton } from '../Buttons/copy-buttons';
import { switchBox, inputElement, slider } from '../Nota/note.module.css';
import { useCategory } from '#@/app/Context/category-context';
import OutputDateHelper from '#@/lib/project/output-date-helper';

export function CarpetaUltimaActuacionRow(
  {
    children,
    carpeta,
  }: {
  children: ReactNode;
  carpeta: IntCarpeta;
} 
) {
  const {
    currentCategory 
  } = useCategory();

  if ( currentCategory !== 'todos' && currentCategory !== carpeta.category ) {
    return null;
  }

  return (
    <tr>
      <td>
        <Link href={`/Carpeta/${ carpeta.numero }`}>{carpeta.nombre}</Link>
      </td>
      <td>{`#${ carpeta.numero }`}</td>
      <td>
        <label className={switchBox}>
          <input
            className={inputElement}
            defaultChecked={carpeta.revisado}
            type="checkbox"
          />
          <span className={slider}></span>
        </label>
      </td>
      <td>{carpeta.tipoProceso}</td>
      <td>
        {' '}
        <label className={switchBox}>
          <input
            className={inputElement}
            defaultChecked={carpeta.terminado}
            type="checkbox"
          />
          <span className={slider}></span>
        </label>
      </td>

      <td>
        <OutputDateHelper incomingDate={carpeta.fecha} />
      </td>
      <td>
        <CopyButton
          copyTxt={carpeta.llaveProceso}
          name={carpeta.llaveProceso}
        />
      </td>
      <td>{carpeta.category}</td>

      {children}
    </tr>
  );
}
