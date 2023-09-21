'use client';
import { createNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';

export default function AddTask() {
  const {
    inputNota, setInputNota
  } = useNotaContext();

  return (
    <form action={createNota}>
      <input
        placeholder="Add task"
        value={inputNota.text}
        type="text"
        name="text"
        onChange={(
          e
        ) => {
          return setInputNota(
            (
              nn
            ) => {
              return {
                ...nn,
                text: e.target.value,
              };
            }
          );
        }}
      />
      {inputNota.date && (
        <input
          placeholder={'fecha de entrega'}
          type={'date'}
          onChange={(
            e
          ) => {
            return setInputNota(
              {
                ...inputNota,
                date: new Date(
                  e.target.value
                ),
              }
            );
          }}
          value={inputNota.date.toString()}
        />
      )}
      <input
        type="checkbox"
        checked={inputNota.done ?? false}
        onChange={(
          e
        ) => {
          return setInputNota(
            {
              ...inputNota,
              done: e.target.checked,
            }
          );
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
}
