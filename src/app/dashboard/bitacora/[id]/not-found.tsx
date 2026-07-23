import Link from 'next/link';
import type { Route } from 'next';
import { EstadoVacio } from '#@/components/notas-tareas/estado-vacio';
import { Button } from '#@/components/ds/button';
import styles from '../pagina.module.css';

export default function NotaNoEncontrada() {
  return (
    <div className={styles.pagina}>
      <EstadoVacio
        icono="note_alt"
        titulo="Nota no encontrada"
        mensaje="Puede que haya sido archivada o que el enlace ya no sea válido."
        accion={(
          <Link href={'/bitacora' as Route} style={{
            textDecoration: 'none' 
          }}
          >
            <Button variant="tonal">Volver a Notas</Button>
          </Link>
        )}
      />
    </div>
  );
}
