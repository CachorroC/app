'use client';
import { Tarea } from '#@/lib/types/tareas';
import React from 'react';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';

const defaultValues: DefaultValues<Tarea> = {
  date   : new Date(),
  text   : '',
  done   : false,
  abogado: 'Camilo',
};

export function NuevaTarea() {
  const {
    register,
    handleSubmit,
    formState: {
      dirtyFields,

      errors,
    },
  } = useForm<Tarea>(
    {
      defaultValues,
    } 
  );

  const onSubmit: SubmitHandler<Tarea> = async (
    data 
  ) => {
    try {
      const postTarea = await fetch(
        '/api/Tareas', {
          method : 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(
            data 
          ),
        } 
      );

      const tareaWithId = ( await postTarea.json() ) as Tarea;
      alert(
        JSON.stringify(
          tareaWithId 
        ) 
      );

      return console.log(
        tareaWithId 
      );
    } catch ( e ) {
      alert(
        JSON.stringify(
          e 
        ) 
      );

      return console.log(
        e 
      );
    }
  };
  console.log(
    errors 
  );

  return (
    <form onSubmit={handleSubmit(
      onSubmit 
    )}>
      <textarea
        {...register(
          'text', {
            required: true,
          } 
        )}
      />
      <input
        type="date"
        placeholder="fecha"
        {...register(
          'date', {
            required: true,
          } 
        )}
      />
      <input type="checkbox" placeholder="done" {...register(
        'done' 
      )} />
      <select
        {...register(
          'abogado', {
            required: true,
          } 
        )}
      >
        <option value="Melissa">Melissa</option>
        <option value="Carmen">Carmen</option>
        <option value="Fernando">Fernando</option>
        <option value="Camilo">Camilo</option>
      </select>

      <input type="submit" />
    </form>
  );
}
