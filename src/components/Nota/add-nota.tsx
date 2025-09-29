'use client';
import { createNota } from '#@/app/actions/main';
import { useNuevaTaskContext } from '#@/app/Context/nueva-task-form-context';
import { InputDateHelper } from '#@/lib/project/date-helper';
import { inputElement, slider, switchBox } from '../Form/form.module.css';

export default function AddNota() {
  const {
    taskFormState, setTaskFormState 
  } = useNuevaTaskContext();

  return (
    <form action={createNota}>
      <input
        placeholder="Add task"
        value={taskFormState.text}
        type="text"
        name="text"
        onChange={(
          e 
        ) => {
          return setTaskFormState(
            {
              ...taskFormState,
              text: e.target.value,
            } 
          );
        }}
      />

      <input
        placeholder={'fecha de entrega'}
        type={'date'}
        onChange={(
          e 
        ) => {
          return setTaskFormState(
            {
              ...taskFormState,
              dueDate: new Date(
                e.target.value 
              ),
            } 
          );
        }}
        value={InputDateHelper(
          taskFormState.dueDate 
        )}
      />

      <label className={switchBox}>
        <input
          className={inputElement}
          type="checkbox"
          name="done"
          checked={taskFormState.done}
          onChange={(
            e 
          ) => {
            return setTaskFormState(
              {
                ...taskFormState,
                done: e.target.checked,
              } 
            );
          }}
        />
        <span className={slider}></span>
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
