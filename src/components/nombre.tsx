import typography from '#@/styles/fonts/typography.module.css';
import Link from 'next/link';
import { CopyButton } from './Buttons/copy-buttons';
import React from 'react';

export function NombreComponent(
  {
    nombre,
    carpetaNumero,
  }: {
    nombre: string;
    carpetaNumero: number;
  }
) {
  const rawName = nombre.split(
    ' '
  )
    .map(
      (
        palabra
      ) => {
        return palabra.charAt(
          0
        )
          .toUpperCase() + palabra.toLowerCase()
          .substring(
            1
          );
      }
    );

  const joinedName = rawName.join(
    ' '
  );

  return (
    <>
      <Link
        href={`/Carpeta/${ carpetaNumero }`}
        className={typography.displayLarge}
      >
        {joinedName}
      </Link>
      <CopyButton
        copyTxt={joinedName}
        name={'copiar'}
      />
    </>
  );
}
