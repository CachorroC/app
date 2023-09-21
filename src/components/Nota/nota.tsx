'use client';
import {  editNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';
import { Nota } from '@prisma/client';
import { useState } from 'react';
import styles from './note.module.css';

export function Task(
  {
    task
  }: { task: Nota }
) {
  const [
            isEditing,
            setIsEditing
  ] = useState(
    false
  );

  const [
            message,
            setMessage
  ] = useState(
    ''
  );

  const {
    inputNota, setInputNota
  } = useNotaContext();
  let taskContent;

  async function onCreate(
    formData: FormData
  ) {
    const res = await editNota(
      formData
    );
    setMessage(
      res.message
    );
    setIsEditing(
      false
    );
  }

  if ( isEditing ) {
    taskContent = (
      <form action={onCreate}>
        <label className={styles.switchBox}>
          <input
            className={styles.inputElement}
            checked={inputNota.done}
            name={'done'}
            onChange={(
              e
            ) => {
              setInputNota(
                {
                  ...task,
                  done: e.target.checked,
                }
              );
            }}
            type="checkbox"
          />
          <span className={styles.slider}></span>
        </label>

        <input
          value={inputNota.text}
          type={'text'}
          name={'text'}
          onChange={(
            e
          ) => {
            setInputNota(
              {
                ...task,
                text: e.target.value,
              }
            );
          }}
        />
        <button type="submit">Save</button>
      </form>
    );
  } else {
    taskContent = (
      <>
        <label className={styles.switchBox}>
          <input
            className={styles.inputElement}
            defaultChecked={task.done}
            type="checkbox"
          />
          <span className={styles.slider}></span>
        </label>

        {task.text}
      </>
    );
  }

  return (
    <div className={styles.taskContainer}>
      <sub>{task.id.toString()}</sub>
      {taskContent}
      <p>{message}</p>
      <button
        type="button"
        onClick={() => {
          setIsEditing(
            true
          );
          setInputNota(
            {
              ...task,
            }
          );
        }}
      >
        Edit
      </button>
    </div>
  );
}
