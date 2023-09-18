'use client';
import { useNotaContext } from '#@/app/context/main-context';
import { Nota } from '@prisma/client';
import { useState } from 'react';

export function Task(
  {
    task
  }: {task: Nota}
) {
  const [
    isEditing,
    setIsEditing
  ] = useState(
    false
  );

  const {
    inputNota, setInputNota
  } = useNotaContext();
  let taskContent;

  if ( isEditing ) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            return setInputNota(
              {
                ...task,
                text: e.target.value
              }
            );

          }} />
        <button onClick={() => {
          return setIsEditing(
            false
          );
        }}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => {
          return setIsEditing(
            true
          );
        }}>
          Edit
        </button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done ?? false}
        onChange={ e => {
          return setInputNota(
            {
              ...task,
              done: e.target.checked
            }
          );
        }}
      />
      {taskContent}

    </label>
  );
}
