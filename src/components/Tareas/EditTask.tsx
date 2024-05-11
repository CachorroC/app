'use client';
import { useState } from 'react';
import { useDispatchTasks } from './TasksContext';
import { editTask } from './actions';
import { InputDateHelper } from '#@/lib/project/date-helper';
import { IntTask } from '#@/lib/types/tareas';

export function EditTask(
  {
    initialTask 
  }: { initialTask: IntTask } 
) {
  const [
    taskState,
    setTaskState
  ] = useState(
    initialTask 
  );

  const dispatchTasks = useDispatchTasks();

  async function createTask() {
    const user = await editTask(
      taskState 
    );

    console.log(
      user 
    );
    return dispatchTasks(
      {
        type: 'changed',
        task: user,
      } 
    );
  }

  return (
    <>
      <form action={createTask}>
        {taskState.text}
        <input
          name="id"
          type={'number'}
          placeholder={'ID'}
          value={taskState.id}
          onChange={(
            e 
          ) => {
            return setTaskState(
              {
                ...taskState,
                id: Number(
                  e.target.value 
                ),
              } 
            );
          }}
        />
        <input
          placeholder={taskState.text}
          type="text"
          name={'text'}
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
        <input
          type="checkbox"
          name="done"
          defaultChecked={taskState.done}
        />
        <input
          type="date"
          name="dueDate"
          value={InputDateHelper(
            taskState.updatedAt 
          )}
          onChange={(
            e 
          ) => {
            console.log(
              `onChange new value for date-section: ${ e.target.valueAsDate }`,
            );

            const [
              yearStringer,
              monthStringer,
              dayStringer
            ]
              = e.target.value.split(
                '-' 
              );

            const newYear = Number(
              yearStringer 
            );

            const newMonth = Number(
              monthStringer 
            ) - 1;

            const newDay = Number(
              dayStringer 
            );

            return setTaskState(
              {
                ...taskState,
                updatedAt: new Date(
                  newYear, newMonth, newDay 
                ),
              } 
            );
          }}
        />

        <button type={'submit'}>Add</button>
      </form>
      <pre>{JSON.stringify(
        taskState, null, 2 
      )}</pre>
    </>
  );
}
