'use client';
import { inputElement, slider, switchBox } from '#@/components/Form/form.module.css';
import { useState } from 'react';
import { updateRevisadoState } from './actions';

export function RevisadoCheckBox (
  {
    numero, initialRevisadoState
  }: {numero: number; initialRevisadoState: boolean}
) {

      const [ revisadoState, setRevisadoState ] = useState(
        {
          numero  : numero,
          revisado: initialRevisadoState
        }
      );



      return (
        <td>
          <label className={switchBox}>
            <input className={ inputElement } type="checkbox" name='revisado' checked={ revisadoState.revisado } onChange={ async (
              e
            ) => {
                      const revis = await updateRevisadoState(
                        {
                          ...revisadoState,
                          revisado: e.target.checked
                        }
                      );
                      return setRevisadoState(
                        revis
                      );
            }}/>
            <span className={slider}></span>
          </label>

        </td>
      );
}