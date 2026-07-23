'use client';

import { useEffect } from 'react';
import { Button } from '#@/components/ds/button';
import { EstadoVacio } from '#@/components/notas-tareas/estado-vacio';
import styles from './pagina.module.css';

export default function ErrorNotas( {
  error, reset 
}: { error: Error & { digest?: string }; reset: () => void } ) {
  useEffect(
    () => {
      console.error( error );
    }, [
      error 
    ] 
  );

  return (
    <div className={styles.pagina}>
      <EstadoVacio
        tono="error"
        icono="cloud_off"
        titulo="No se pudieron cargar las notas"
        mensaje="Ocurrió un problema al consultar la información. Intenta de nuevo en unos segundos."
        accion={<Button variant="tonal" onClick={reset}>Reintentar</Button>}
      />
    </div>
  );
}
