'use client';
import { editNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';
import { useEffect, useState } from 'react';
import styles from './note.module.css';
import { monNota } from '#@/lib/types/notas';
import { type SubmitHandler,  useForm } from 'react-hook-form';

export function Task(
  {
    task
  }: { task: monNota }
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

  const {
    register, handleSubmit, setError, reset
  } = useForm<monNota>(
    {
      defaultValues: task
    }
  );

  let taskContent;

  const onSubmit: SubmitHandler<monNota> = async (
    inputNota
  ) => {
    const notaToSubmit = {
      ...task,
      ...inputNota
    };

    const postNota = await fetch(
      '/api/Notas', {
        method : 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          notaToSubmit
        )
      }
    );

    alert(
      JSON.stringify(
        postNota.status
      )
    );

    if ( postNota.status > 200 ) {
      setError(
        'root.serverError', {
          type: postNota.statusText,
        }
      );
    }

    const updatedCarpeta = ( await postNota.json() ) as monNota;
    alert(
      JSON.stringify(
        updatedCarpeta
      )
    );
    console.log(
      `el estatus de la operacion post en Form arrojó: ${ postNota.status }`
    );

  };

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
      <form action={onCreate} onSubmit={handleSubmit(
        onSubmit
      )}>
        {/*  <label className={styles.switchBox}>
          <input
            className={styles.inputElement}
            checked={inputNota.done}
            type="checkbox"
            { ...register(
              'done', {
                onChange: (
                  e
                ) => {
                  setInputNota(
                    {
                      ...task,
                      done: e.target.checked,
                    }
                  );
                }
              }
            )}
          />
          <span className={styles.slider}></span>
        </label>
 */}
        <input
          value={inputNota.text}
          type={'text'}
          { ...register(
            'text', {
              onChange: (
                e
              ) => {
                setInputNota(
                  {
                    ...task,
                    text: e.target.value,
                  }
                );
              }
            }
          )}
        />
        <button type="submit">Save</button>
      </form>
    );
  } else {
    taskContent = (
      <>
        {/*  <label className={styles.switchBox}>
          <input
            className={styles.inputElement}
            defaultChecked={task.done}
            type="checkbox"
          />
          <span className={styles.slider}></span>
        </label> */}

        {task.text}
      </>
    );
  }

  useEffect(
    () => {
      reset(
        task
      );
    }, [
      reset,
      task
    ]
  );
  return (
    <div className={styles.taskContainer}>
      <sub>{task._id}</sub>
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
