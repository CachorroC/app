'use client';

import { IntNota } from '#@/lib/types/notas';
import { ReactNode, useState } from 'react';
import { useNotaSortDispatch } from '../Context/notas-sort-context';
import { updateNotaTextState } from './actions';
import { containerEnabled } from '#@/components/Card/outlined.module.css';
import typography from '#@/styles/fonts/typography.module.css';

export function Nota( {
  nota,
  children,
}: {
  nota: IntNota;
  children: ReactNode;
} ) {
  const [
    isEditing,
    setIsEditing
  ] = useState( false );

  const [
    notaState,
    setNotaState
  ] = useState( {
    ...nota,
  } );

  const dispatch = useNotaSortDispatch();

  let notaContent;

  if ( isEditing ) {
    notaContent = (
      <>
        <input
          value={notaState.text}
          onChange={( e ) => {
            return setNotaState( {
              ...notaState,
              text: e.target.value,
            } );
          }}
        />
        <input
          value={notaState.id}
          onChange={( e ) => {
            return setNotaState( {
              ...notaState,
              id: notaState.carpetaNumero
                ? `${ notaState.carpetaNumero }-${ e.target.value }`
                : `NC-${ e.target.value }`,
            } );
          }}
        />
        <button
          type="button"
          onClick={async () => {
            const revis = await updateNotaTextState( notaState );

            alert( JSON.stringify( revis ) );

            dispatch( {
              type: 'changed',
              nota: {
                ...notaState,
                ...revis,
              },
            } );

            return setIsEditing( false );
          }}
        >
          Save
        </button>
      </>
    );
  } else {
    notaContent = (
      <>
        <p>{nota.text}</p>
        <button
          type="button"
          onClick={() => {
            return setIsEditing( true );
          }}
        >
          Edit
        </button>
      </>
    );
  }

  return (
    <div className={containerEnabled}>
      <sub className={typography.labelSmall}>{nota.id}</sub>
      {notaContent}
      {children}

      <button
        type="button"
        onClick={() => {
          dispatch( {
            type: 'deleted',
            id  : nota.id,
          } );
        }}
      >
        Delete
      </button>
    </div>
  );
}
