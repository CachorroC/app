'use client';

import { useState } from 'react';
import { inputElement,
  slider,
  switchBox, } from '#@/components/Form/form.module.css';
import { updateTaskDoneState } from './actions';
import { IntTask } from '#@/lib/types/tareas';
import { useDispatchTasks } from '#@/components/Tareas/TasksContext';

export function DoneCheckBox(
  {
    task 
  }: { task: IntTask } 
) {
      const [ revisadoState, setRevisadoState ] = useState(
        {
          id  : task.id,
          done: task.done,
        } 
      );

      const dispatch = useDispatchTasks();

      return (
        <label className={switchBox}>
          <input
            className={inputElement}
            type="checkbox"
            name="done"
            checked={revisadoState.done}
            onChange={async (
              e 
            ) => {
                      const revis = await updateTaskDoneState(
                        {
                          ...revisadoState,
                          done: e.target.checked,
                        } 
                      );
                      dispatch(
                        {
                          type: 'changed',
                          task: {
                            ...task,
                            done: e.target.checked,
                          },
                        } 
                      );
                      return setRevisadoState(
                        revis 
                      );
            }}
          />
          <span className={slider}></span>
        </label>
      );
}
