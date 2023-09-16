'use client';

import { useNotaContext } from '#@/app/context/main-context';
import note, { tareas } from 'components/Nota/note.module.css';

export default function NoteFormOutput () {
  const {
    inputNota
  } = useNotaContext();

  return (
    <div className={ note.container } key={ inputNota.nota }>
      {JSON.stringify(
        inputNota
      )}
    </div>
  );
}