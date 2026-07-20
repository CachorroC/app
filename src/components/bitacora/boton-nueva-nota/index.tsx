'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';
import { Button } from '#@/components/ds/button';
import { crearNota } from '#@/lib/bitacora/actions';

export const BotonNuevaNota = () => {
  const router = useRouter();
  const [
    pendiente,
    iniciarTransicion 
  ] = useTransition();

  const crear = () => {
    iniciarTransicion( async () => {
      const {
        id 
      } = await crearNota( {
        titulo: 'Nota sin título' 
      } );

      router.push( `/bitacora/${ id }` as Route );
    } );
  };

  return (
    <Button
      variant="filled"
      disabled={pendiente}
      icon={<span className="material-symbols-rounded" aria-hidden="true">add</span>}
      onClick={crear}
    >
      Nueva nota
    </Button>
  );
};
