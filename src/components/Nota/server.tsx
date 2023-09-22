import { fixFechas } from '#@/lib/project/helper';
import { Suspense } from 'react';
import { ButtonSkeleton } from 'components/Buttons/ButtonSkeleton';
import note from './note.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { EditNoteButton,
  DeleteNoteButton, } from 'components/Buttons/noteButtons';
import { monNota } from '#@/lib/types/notas';

export const NotaComponent = (
  {
    notaRaw
  }: { notaRaw: monNota }
) => {
  const {
    _id, text, date
  } = notaRaw;

  return (
    <div
      className={note.container}
      key={_id}
    >
      <p
        className={`${ typography.bodySmall } ${ note.textArea }`}
      >{`Nota: ${ text }`}</p>
      <sub className={`${ typography.labelSmall } ${ note.textArea }`}>
        {date && fixFechas(
          date.toISOString()
        )}
      </sub>
      <div className={note.buttonsRow}>
        <Suspense fallback={<ButtonSkeleton />}>
          <EditNoteButton
            key={_id}
            nota={notaRaw}
          />
        </Suspense>
        <Suspense fallback={<ButtonSkeleton />}>
          <DeleteNoteButton
            key={_id}
            id={_id}
          />
        </Suspense>
      </div>
    </div>
  );
};
