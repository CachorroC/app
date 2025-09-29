'use client';

import { IntNota } from '#@/lib/types/notas';
import { ReactNode, useState } from 'react';
import { useNotaSortDispatch } from '../Context/notas-sort-context';
import { updateNotaTextState } from './actions';
import { containerEnabled } from '#@/components/Card/outlined.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import React from 'react';

export function Nota(
  {
    nota,
    children,
  }: {
    nota: IntNota;
    children: ReactNode;
  }
) {
  const [
    isEditing,
    setIsEditing
  ] = useState(
    false
  );

  const [
    notaState,
    setNotaState
  ] = useState(
    {
      ...nota,
    }
  );

  async function saveAction() {
    const revis = await updateNotaTextState(
      notaState
    );

    alert(
      JSON.stringify(
        revis
      )
    );

    dispatch(
      {
        type: 'changed',
        nota: {
          ...notaState,
          ...revis,
        },
      }
    );

    return setIsEditing(
      false
    );
  }

  const dispatch = useNotaSortDispatch();

  let notaContent;

  if ( isEditing ) {
    notaContent = (
      <>
        <input
          value={notaState.text}
          onChange={(
            e
          ) => {
            return setNotaState(
              {
                ...notaState,
                text: e.target.value,
              }
            );
          }}
        />
        <input
          value={notaState.id}
          onChange={(
            e
          ) => {
            return setNotaState(
              {
                ...notaState,
                id: `${ notaState.carpetaNumero ?? 'NC' }-${ e.target.value }`,
              }
            );
          }}
        />
        <button
          type="button"
          onClick={saveAction}
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
            return setIsEditing(
              true
            );
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
          dispatch(
            {
              type: 'deleted',
              id  : nota.id,
            }
          );
        }}
      >
        Delete
      </button>
    </div>
  );
}

export function NotaTable(
  {
    nota,
    children,
  }: {
    nota: IntNota;
    children: ReactNode;
  }
) {
  const [
    isEditing,
    setIsEditing
  ] = useState(
    false
  );

  const [
    notaState,
    setNotaState
  ] = useState(
    {
      ...nota,
    }
  );

  async function saveAction() {
    const revis = await updateNotaTextState(
      notaState
    );

    alert(
      JSON.stringify(
        revis
      )
    );

    dispatch(
      {
        type: 'changed',
        nota: {
          ...notaState,
          ...revis,
        },
      }
    );

    return setIsEditing(
      false
    );
  }

  const dispatch = useNotaSortDispatch();

  let notaContent;

  if ( isEditing ) {
    notaContent = (
      <>
        <td>
          <input
            value={notaState.text}
            onChange={(
              e
            ) => {
              return setNotaState(
                {
                  ...notaState,
                  text: e.target.value,
                }
              );
            }}
          />
        </td>
        <td>
          <input
            value={notaState.id}
            onChange={(
              e
            ) => {
              return setNotaState(
                {
                  ...notaState,
                  id: `${ notaState.carpetaNumero ?? 'NC' }-${ e.target.value }`,
                }
              );
            }}
          />
        </td>
        <td> <button
          type="button"
          onClick={saveAction}
             >
          Save
        </button></td>
      </>
    );
  } else {
    notaContent = (
      <>
        <td><p>{nota.text}</p></td>
        <td><button
          type="button"
          onClick={() => {
            return setIsEditing(
              true
            );
          }}
        >
          Edit
        </button></td>
      </>
    );
  }

  return (
    <tr>
      <td><sub className={typography.labelSmall}>{nota.id}</sub></td>
      {notaContent}
      {children}

      <td><button
        type="button"
        onClick={() => {
          dispatch(
            {
              type: 'deleted',
              id  : nota.id,
            }
          );
        }}
      >
        Delete
      </button></td>
    </tr>
  );
}
