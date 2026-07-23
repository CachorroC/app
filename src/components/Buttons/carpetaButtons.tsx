import Link from 'next/link';
import styles from './buttons.module.css';
import type { Route } from 'next';

const NUEVA_NOTA_HREF: Route = '/dashboard/Notas/Nueva';

export function EditCarpeta( {
  numero
}: { numero: number } ) {
  const editarHref: Route<`/dashboard/Carpeta/${number}/Editar`> = `/dashboard/Carpeta/${ numero }/Editar`;

  return (
    <>
      <Link
        className={styles.buttonEdit}
        href={editarHref}
      >
        <span className="material-symbols-outlined">edit</span>
      </Link>
      <Link href={NUEVA_NOTA_HREF}>
        <span className="material-symbols-outlined">note_add</span>
      </Link>
    </>
  );
}
