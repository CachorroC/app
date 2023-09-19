'use client';
import { createNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AddTask(
            {
              id 
            }: { id: number } 
) {
  const pathname = usePathname();

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
                date: e.target.value,
              } 
            );
          }}
          value={inputNota.date}
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
