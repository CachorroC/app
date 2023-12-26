import { fixFechas } from '#@/lib/project/helper';
import { Suspense } from 'react';
import { ButtonSkeleton } from 'components/Buttons/ButtonSkeleton';
import note from './note.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { EditNoteButton,
  DeleteNoteButton, } from 'components/Buttons/noteButtons';
import { Nota } from '@prisma/client';

export const NotaComponent = (
  {
    notaRaw 
  }: { notaRaw: Nota } 
) => {
          const {
            id, title, date 
          } = notaRaw;

          return (
            <div className={note.container}>
              <section>
                <sup className={typography.labelSmall}>{id}</sup>
              </section>
              <p
                className={`${ typography.bodySmall } ${ note.textArea }`}
              >{`Nota: ${ title }`}</p>
              <sub className={`${ typography.labelSmall } ${ note.textArea }`}>
                {date && fixFechas(
                  date 
                )}
              </sub>
              <div className={note.buttonsRow}>
                <Suspense fallback={<ButtonSkeleton />}>
                  <EditNoteButton
                    key={id}
                    nota={notaRaw}
                  />
                </Suspense>
                <Suspense fallback={<ButtonSkeleton />}>
                  <DeleteNoteButton
                    key={id}
                    id={id}
                  />
                </Suspense>
              </div>
            </div>
          );
};
