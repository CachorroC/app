import { fixFechas } from '#@/lib/project/helper';
import { getNotasByllaveProceso } from '#@/lib/project/notas';
import { monNota } from 'types/notas';
import { Suspense } from 'react';
import { ButtonSkeleton } from 'components/Buttons/ButtonSkeleton';
import note from './note.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { EditNoteButton,
         DeleteNoteButton, } from 'components/Buttons/noteButtons';
import { Accordion } from '../Accordion';
import getNotas from '#@/lib/project/getNotas';
import { Nota } from '@prisma/client';

export const NotaComponent = (
  {
    notaRaw,
  }: {
  notaRaw: Nota;
}
) => {
  const {
    id, text, date, llaveProceso, done, pathname
  } = notaRaw;

  return (
    <div className={note.container} key={id}>
      <p className={`${ typography.bodySmall } ${ note.textArea }`}>{`Nota: ${ text }`}</p>
      <sub className={`${ typography.labelSmall } ${ note.textArea }`}>
        {date && fixFechas(
          date
        )}
      </sub>
      <div className={note.buttonsRow}>
        <Suspense fallback={<ButtonSkeleton />}>
          <EditNoteButton key={id} nota={notaRaw} />
        </Suspense>
        <Suspense fallback={<ButtonSkeleton />}>
          <DeleteNoteButton key={id} id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export async function Notas(
  {
    llaveProceso
  }: { llaveProceso?: string }
) {
  if ( llaveProceso ) {
    const notas = await getNotasByllaveProceso(
      {
        llaveProceso: llaveProceso,
      }
    );

    if ( notas.length === 0 ) {
      const nts = await getNotas();

      const NotasRow = nts.map(
        (
          nota, i, arr
        ) => {
          return <NotaComponent  key={ nota.id } notaRaw={ nota } />;
        }
      );

      return <>{NotasRow}</>;
    }

    const NotasRow = notas.map(
      (
        nota, i, arr
      ) => {
        return <NotaComponent notaRaw={nota}key={nota.id} />;
      }
    );

    return <>{NotasRow}</>;
  }

  const notas = await getNotas();

  const NotasRow = notas.map(
    (
      nota, i, arr
    ) => {
      return <NotaComponent notaRaw={nota}  key={nota.id} />;
    }
  );

  return <>{NotasRow}</>;
}
