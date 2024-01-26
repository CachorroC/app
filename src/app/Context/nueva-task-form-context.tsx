
'use client';
import { NewTask } from '#@/lib/types/tareas';
import { ReactNode, createContext, useState, Dispatch, SetStateAction, useContext, } from 'react';
import { FormProvider, useForm } from 'react-hook-form';


const NuevaTaskContext = createContext<{taskFormState: NewTask, setTaskFormState: Dispatch<SetStateAction<NewTask>>}| null>(
  null
);

export function NuevaTaskFormProvider(
  {
    children
  }: { children: ReactNode }
) {
      const newDater = new Date();



      const newNota: NewTask
        = {
          text         : '',
          done         : false,
          content      : [ '' ],
          carpetaNumero: null,
          dueDate      : new Date(
            newDater.getFullYear(), newDater.getMonth(), newDater.getDate()
          ),
        };


      const [ taskFormState, setTaskFormState ] = useState<NewTask>(
        newNota
      );


      const nuevaNotaMethods = useForm<NewTask>(
        {
          defaultValues   : taskFormState,
          shouldFocusError: true,
          criteriaMode    : 'all',
        }
      );


      return (
        <NuevaTaskContext.Provider value={{
          taskFormState,
          setTaskFormState
        } }>
          <FormProvider {...nuevaNotaMethods}>
            { children }
          </FormProvider>
        </NuevaTaskContext.Provider>
      );
}



export function useNuevaTaskContext () {
      const context = useContext(
        NuevaTaskContext
      );

      if ( !context ) {
        throw new Error(
          'Nueva intTask context must be used within a nueva factura provider'
        );

      }

      return context;
}
