
import Link from 'next/link';
import styles from './buttons.module.css';
import type { Route } from 'next';

export function EditCarpeta (
  {
    numero
  }: { numero: number }
) {
  return (
    <Link className={ styles.buttonEdit } href={`/Carpeta/${ numero }/Editar` as Route} >
      <span className='material-symbols-outlined' >edit</span>
    </Link>
  );
}