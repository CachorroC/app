'use client';
import { ReactNode, useRef } from 'react';
import { useCarpetaFormContext } from '../../app/Context/carpeta-form-context';
import { editDemandaInPrisma } from '#@/app/Carpeta/[numero]/actions';

export function CarpetaForm(
  {
    children 
  }: { children: ReactNode } 
) {
  const formRef = useRef(
    null 
  );

  const {
    carpetaFormState 
  } = useCarpetaFormContext();

  async function editCarpetaInDatabase() {
    if ( !carpetaFormState.demanda ) {
      return;
    }

    const editer = await editDemandaInPrisma(
      carpetaFormState.demanda 
    );

    if ( editer.success ) {
      alert(
        `se ingresó exitosamente la edición a la base de datos: ${ editer.data }`,
      );
    } else {
      alert(
        `falló la sincronizacion con la base de datos: ${ editer.data }` 
      );
    }
  }

  return (
    <form
      action={editCarpetaInDatabase}
      ref={formRef}
    >
      {children}
    </form>
  );
}
