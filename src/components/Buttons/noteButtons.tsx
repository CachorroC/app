'use client';
import note from 'components/Nota/note.module.css';
import Link from 'next/link';
import type { Route } from 'next';
import { deleteNota } from '#@/app/actions/main';
import { Nota } from '#@/app/generated/prisma/client';

export function DeleteNoteButton( {
  id
}: { id: string } ) {
  return (
    <>
      <button
        className={note.deleteButton}
        onClick={() => {
          return deleteNota( {
            id: id,
          } );
        }}
        type="button"
      >
        <span className={`material-symbols-outlined ${ note.icon }`}>delete</span>
      </button>
      <button
        className={note.deleteButton}
        onClick={() => {
          deleteNota( {
            id: id,
          } );
        }}
        type="button"
      >
        <span className={`material-symbols-outlined ${ note.icon }`}>delete</span>
      </button>
    </>
  );
}

export function EditNoteButton( {
  nota
}: { nota: Nota } ) {
  return (
    <Link
      className={note.Add}
      href={`/Notas/id/${ nota.id }/Editar` as Route}
    >
      <span className={`material-symbols-outlined ${ note.icon }`}>edit</span>
    </Link>
  );
}
