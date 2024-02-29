'use client';

import { IntNota } from '#@/lib/types/notas';
import { ReactNode, useState } from 'react';
import { useNotaSortDispatch } from '../Context/notas-sort-context';
import { updateNotaTextState } from './actions';

export function Nota(
  {
    nota, children
  }: { nota: IntNota;  children : ReactNode}
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
            <input value={ notaState.id } onChange={ (
              e
            ) => {
                      return setNotaState(
                        {
                          ...notaState,
                          id: notaState.carpetaNumero
                            ? `${ notaState.carpetaNumero }-${ e.target.value }`
                            : `NC-${ e.target.value }`
                        }
                      );
            }}/>
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
        <tr>
          <td>{nota.id}</td>
          <td>{`carpeta ${ nota.carpetaNumero }`}</td>
          <td>{ notaContent }</td>
          {children}
          <td>
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
            </button></td>

        </tr>
      );
}
