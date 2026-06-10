'use client';

import { NewTask } from '#@/lib/types/tareas';
import { SubmitHandler, useForm } from 'react-hook-form';

export function NuevaTarea( {
  carpetaNumero 
}: { carpetaNumero?: number } ) {
  const {
    register,
    handleSubmit,
  } = useForm<NewTask>( {
    defaultValues: {
      dueDate: new Date(),
      done   : false,
      content: [
        ''
      ],
      text         : '',
      carpetaNumero: carpetaNumero
        ? carpetaNumero
        : 0,
    },
  } );

  const onSubmit: SubmitHandler<NewTask> = ( _data ) => {
    // form submission handler — not yet implemented
  };

  return (
    <form onSubmit={handleSubmit( onSubmit )}>
      <input
        type="text"
        placeholder="text"
        {...register(
          'text', {
            required: true,
          } 
        )}
      />
      <input
        type="datetime"
        placeholder="dueDate"
        {...register(
          'dueDate', {
            required   : false,
            valueAsDate: true,
          } 
        )}
      />
      <input
        type="checkbox"
        placeholder="isComplete"
        {...register(
          'done', {} 
        )}
      />
      <input
        type="text"
        placeholder="subTarea.0.text"
        {...register(
          'content.0', {} 
        )}
      />
      <input
        type="checkbox"
        placeholder="subTarea.0.isComplete"
        {...register(
          'content.1', {} 
        )}
      />
      <input
        type="datetime"
        placeholder="subTarea.0.date"
        {...register(
          'content.2', {
            valueAsDate: true,
          } 
        )}
      />

      <input type="submit" />
    </form>
  );
}
