'use client';

import { IntNota } from '#@/lib/types/notas';
import { useState } from 'react';
import { useNotaSortDispatch } from '../Context/notas-sort-context';
import { updateNotaTextState } from './actions';
import styles from './styles.module.css';

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
              onClick={ async () => {
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
        <div className={styles.listItemContainer}>
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

        </div>
      );
}
