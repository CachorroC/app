'use client';
import { intNota, monNota } from 'types/notas';
import note from 'components/Nota/note.module.css';
import Link from 'next/link';
import type { Route } from 'next';
import { useState } from 'react';
import { DeleteResult } from 'mongodb';

export function DeleteNoteButton(
  {
    id,
    llaveProceso,
  }: {
  id: string;
  llaveProceso: string;
} 
) {
  const [
    message,
    setMessage
  ] = useState(
    'no Response' 
  );

  async function onDelete() {
    const res = await fetch(
      `/api/Notas/${ llaveProceso }?_id=${ id }`, {
        method: 'DELETE',
      } 
    );

    const response = await res.json();

    const idk = JSON.stringify(
      response 
    );
    setMessage(
      idk 
    );
  }

  return (
    <button className={note.buttonDelete} onClick={onDelete}>
      <span className={`material-symbols-outlined ${ note.icon }`}>delete</span>
      <p>{message}</p>
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
      `${ uri }/api/Notas`, {
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
    <button className={note.buttonAdd} onClick={addRequestHandler}>
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
      href={`/Notas/${ nota.llaveProceso }/Editar?_id=${ nota._id }`}
    >
      <span className={`material-symbols-outlined ${ note.icon }`}>edit</span>
    </Link>
  );
}
