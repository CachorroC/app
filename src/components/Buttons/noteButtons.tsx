'use client';
import { intNota, monNota } from 'types/notas';
import note from 'components/Nota/note.module.css';
import Link from 'next/link';
import type { Route } from 'next';
import { deleteNota } from '#@/app/actions';

export function DeleteNoteButton(
  {
    id 
  }: { id: string } 
) {
  return (
    <>
      <button
        className={note.buttonDelete}
        onClick={() => {
          return deleteNota(
            {
              id: id,
            } 
          );
        }}
        type="button"
      >
        <span className={`material-symbols-outlined ${ note.icon }`}>delete</span>
      </button>
      <button
        className={note.buttonDelete}
        onClick={() => {
          deleteNota(
            {
              id: id,
            } 
          );
        }}
        type="button"
      >
        <span className={`material-symbols-outlined ${ note.icon }`}>delete</span>
      </button>
    </>
  );
}

export function AddNoteButton(
  {
    nota 
  }: { nota: intNota } 
) {
  async function addRequestHandler() {
    const Request = await fetch(
      'api/Notas', {
        method : 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          nota 
        ),
      } 
    )
      .then(
        (
          fullfilled 
        ) => {
          alert(
            fullfilled.status.toString() 
          );

          return fullfilled;
        } 
      );

    if ( !Request.ok ) {
      return;
    }

    const Response = await Request.json();
    alert(
      JSON.stringify(
        Response 
      ) 
    );
  }

  return (
    <button
      className={note.buttonAdd}
      type="button"
      onClick={addRequestHandler}
    >
      <span className={`material-symbols-outlined ${ note.icon }`}>delete</span>
    </button>
  );
}

export function EditNoteButton(
  {
    nota 
  }: { nota: monNota } 
) {
  return (
    <Link
      className={note.buttonEdit}
      href={`/Notas/${ nota._id }/Editar` as Route}
    >
      <span className={`material-symbols-outlined ${ note.icon }`}>edit</span>
    </Link>
  );
}
