'use client';

import { IntNota } from '#@/lib/types/notas';
import { useState } from 'react';
import { useNotaSortDispatch } from '../Context/notas-sort-context';
import { updateNotaTextState } from './actions';

export function Nota(
  {
    nota 
  }: { nota: IntNota } 
) {
      const [ isEditing, setIsEditing ] = useState(
        false 
      );

      const [ notaState, setNotaState ] = useState(
        {
          ...nota,
        } 
      );

      const dispatch = useNotaSortDispatch();
      let notaContent;

      async function editNota() {
            const revis = await updateNotaTextState(
              notaState 
            );
            alert(
              JSON.stringify(
                revis 
              ) 
            );

            return dispatch(
              {
                type: 'changed',
                nota: {
                  ...notaState,
                  ...revis,
                },
              } 
            );
      }

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
            <button
              type="button"
              onClick={() => {
                        return setIsEditing(
                          false 
                        );
              }}
            >
          Save
            </button>
          </>
        );
      } else {
        notaContent = (
          <>
            {nota.text}
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
        <form action={editNota}>
          {notaContent}
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
          <button type="submit">Save</button>
        </form>
      );
}
