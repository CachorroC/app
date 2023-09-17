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

export const Nota = (
  {
    notaRaw,
    i,
    arr,
  }: {
  notaRaw: monNota;
  i: number;
  arr: monNota[];
}
) => {
  const {
    _id, nota, tareas, fecha, llaveProceso
  } = notaRaw;

  return (
    <div className={note.container} key={_id}>
      <sup className={note.sup}>{`${ i + 1 }`}</sup>

      <p
        className={`${ typography.bodySmall } ${ note.textArea }`}
      >{`Nota: ${ nota }`}</p>
      <sub className={`${ typography.labelSmall } ${ note.textArea }`}>
        {fixFechas(
          fecha.toString()
        )}
      </sub>
      <div className={note.buttonsRow}>
        <Suspense fallback={<ButtonSkeleton />}>
          <EditNoteButton key={_id} nota={notaRaw} />
        </Suspense>
        <Suspense fallback={<ButtonSkeleton />}>
          <DeleteNoteButton llaveProceso={llaveProceso} key={_id} id={_id} />
        </Suspense>
      </div>
      <div className={note.section}>
        {tareas.map(
          (
            tr
          ) => {
            return (
              <Accordion key={tr.tarea}>
                <h1 className={typography.titleMedium}>{tr.tarea}</h1>
                <p className={tr.isDone
                  ? note.innactive
                  : note.active}>
                  {`fecha de entrega: ${ fixFechas(
                    tr.dueDate.toString()
                  ) }`}
                </p>
                <span
                  className={`${
                    tr.isDone
                      ? note.innactive
                      : note.active
                  } material-symbols-outlined`}
                >
                  {tr.isDone
                    ? 'assignment_turned_in'
                    : 'assignment_late'}
                </span>
              </Accordion>
            );
          }
        )}
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
          return <Nota notaRaw={nota} i={i} arr={arr} key={nota._id} />;
        }
      );

      return <>{NotasRow}</>;
    }

    const NotasRow = notas.map(
      (
        nota, i, arr
      ) => {
        return <Nota notaRaw={nota} i={i} arr={arr} key={nota._id} />;
      }
    );

    return <>{NotasRow}</>;
  }

  const notas = await getNotas();

  const NotasRow = notas.map(
    (
      nota, i, arr
    ) => {
      return <Nota notaRaw={nota} i={i} arr={arr} key={nota._id} />;
    }
  );

  return <>{NotasRow}</>;
}
