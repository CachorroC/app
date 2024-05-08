'use client';
import { DoneCheckBox } from '#@/app/Tareas/done-checkbox';
import { IntTask } from '#@/lib/types/tareas';
import { useState } from 'react';
import { useDispatchTasks } from './TasksContext';
import { updateTaskTextState } from '#@/app/Tareas/actions';

export function Task(
  {
    task 
  }: { task: IntTask } 
) {
      const [ isEditing, setIsEditing ] = useState(
        false 
      );

      const [ taskState, setTaskState ] = useState(
        {
          ...task,
        } 
      );

      const dispatch = useDispatchTasks();
      let taskContent;

      async function editTask() {
            const revis = await updateTaskTextState(
              taskState 
            );
            alert(
              JSON.stringify(
                revis 
              ) 
            );

            return dispatch(
              {
                type: 'changed',
                task: {
                  ...taskState,
                  ...revis,
                },
              } 
            );
      }

      if ( isEditing ) {
        taskContent = (
          <>
            <input
              value={taskState.text}
              onChange={(
                e 
              ) => {
                        return setTaskState(
                          {
                            ...taskState,
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
        taskContent = (
          <>
            {task.text}
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
        <form action={editTask}>
          <DoneCheckBox
            task={task}
            key={task.id}
          />
          {taskContent}
          <button
            type="button"
            onClick={() => {
                      dispatch(
                        {
                          type: 'deleted',
                          id  : task.id,
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
