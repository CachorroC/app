'use client';

import { IntTarea } from '#@/lib/types/tareas';
import { SubmitHandler, useForm } from 'react-hook-form';


export function NuevaTarea (
  {
    carpetaNumero
  }: {carpetaNumero?: number}
) {
      const    {
        register, handleSubmit, formState: {
          errors
        }
      } = useForm<IntTarea>(
        {
          defaultValues: {
            id          : 0,
            creationDate: new Date(),
            dueDate     : new Date(),
            carpetaId   : carpetaNumero
              ? carpetaNumero
              : 0,
            text      : 'Nueva Tarea',
            isComplete: false
          }
        }
      );

      const onSubmit: SubmitHandler<IntTarea> = data => {
                return console.log(
                  `SubmitHandler de Tareas NuevaTarea ${ data }`
                );
      };

      console.log(
        `errores de useForm en Nueva Tarea ${ errors }`
      );

      return (
        <form onSubmit={handleSubmit(
          onSubmit
        )}>
          <input type="text" placeholder="text" {...register(
            'text', {
              required: true
            }
          )} />
          <input type="datetime" placeholder="dueDate" {...register(
            'dueDate', {
              required   : false,
              valueAsDate: true
            }
          )} />
          <input type="checkbox" placeholder="isComplete" {...register(
            'isComplete', {}
          )} />
          <input type="text" placeholder="subTarea.0.text" {...register(
            'subTareas.0.text', {}
          )} />
          <input type="checkbox" placeholder="subTarea.0.isComplete" {...register(
            'subTareas.0.isComplete', {}
          )} />
          <input type="datetime" placeholder="subTarea.0.date" {...register(
            'subTareas.0.date', {
              valueAsDate: true
            }
          )} />

          <input type="submit" />
        </form>
      );
}