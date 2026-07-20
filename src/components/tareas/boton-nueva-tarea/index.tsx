'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '#@/components/ds/button';
import { crearTarea } from '#@/lib/tareas/actions';

export const BotonNuevaTarea = () => {
  const router = useRouter();
  const [
    pendiente,
    iniciarTransicion 
  ] = useTransition();

  const crear = () => {
    iniciarTransicion( async () => {
      await crearTarea( {
        titulo: 'Tarea sin título' 
      } );
      router.refresh();
    } );
  };

  return (
    <Button
      variant="filled"
      disabled={pendiente}
      icon={<span className="material-symbols-rounded" aria-hidden="true">add</span>}
      onClick={crear}
    >
      Nueva tarea
    </Button>
  );
};
