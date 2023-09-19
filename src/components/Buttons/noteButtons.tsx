'use client';
import { intNota, monNota } from 'types/notas';
import note from 'components/Nota/note.module.css';
import Link from 'next/link';
import type { Route } from 'next';
import { useState } from 'react';
import { DeleteResult } from 'mongodb';
import { Nota } from '@prisma/client';
import { deleteNota } from '#@/app/actions';

export function DeleteNoteButton(
            {
              id 
            }: { id: number } 
) {
  function onDelete() {
    deleteNota(
      id 
    );
  }

  return (
    <button className={note.buttonDelete} type="button" onClick={onDelete}>
      <span className={`material-symbols-outlined ${ note.icon }`}>delete</span>
    </button>
  );
}

export function AddNoteButton(
            {
              nota, uri 
            }: { nota: intNota; uri: string } 
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
                fullfilled.status 
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
            }: { nota: Nota } 
) {
  return (
    <Link
      className={note.buttonEdit}
      href={`/Notas/${ nota.id.toString() }/Editar` as Route}
    >
      <span className={`material-symbols-outlined ${ note.icon }`}>edit</span>
    </Link>
  );
}
