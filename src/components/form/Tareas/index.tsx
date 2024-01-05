'use client';
import { IntTarea } from '#@/lib/types/tareas';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export function NuevaTarea() {
      const {
        register,
        handleSubmit,
        formState: {
          errors 
        },
      } = useForm<IntTarea>(
        {
          defaultValues: {
            text        : 'Nueva Tarea',
            id          : 0,
            creationDate: new Date(),
            dueDate     : new Date(),
            isComplete  : false,
            subTareas   : [ {
              text      : 'sub tarea',
              isComplete: false,
              date      : new Date(),
            }, ],
          },
        } 
      );

      const onSubmit: SubmitHandler<IntTarea> = async (
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

                  const tareaWithId = ( await postTarea.json() ) as IntTarea;
                  alert(
                    JSON.stringify(
                      tareaWithId 
                    ) 
                  );

                  return console.log(
                    `tarea with Id: ${ tareaWithId }` 
                  );
                } catch ( e ) {
                  alert(
                    JSON.stringify(
                      e 
                    ) 
                  );

                  return console.log(
                    `error en onSubmit NuevaTarea. ${ JSON.stringify(
                      e, null, 2 
                    ) }`,
                  );
                }
      };

      console.log(
        `errores en NuevaTarea. ${ JSON.stringify(
          errors, null, 2 
        ) }` 
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
              'dueDate', {
                required   : true,
                valueAsDate: true,
              } 
            )}
          />
          <input
            type="checkbox"
            placeholder="fecha de entrega // fecha final"
            {...register(
              'dueDate', {
                valueAsDate: true,
              } 
            )}
          />

          <input type="submit" />
        </form>
      );
}
