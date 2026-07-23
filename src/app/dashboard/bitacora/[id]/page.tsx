import { notFound } from 'next/navigation';
import { EditorNota } from '#@/components/bitacora/editor-nota';
import { listarCarpetasParaCombobox, listarUsuariosDisponibles, obtenerNota } from '#@/lib/bitacora/queries';
import styles from '../pagina.module.css';

export default async function PaginaNota( {
  params
}: { params: Promise<{ id: string }> } ) {
  const {
    id
  } = await params;
  const [
    nota,
    casos,
    personal
  ] = await Promise.all( [
    obtenerNota( id ),
    listarCarpetasParaCombobox(),
    listarUsuariosDisponibles( [] ),
  ] );

  if ( !nota ) {
    notFound();
  }

  return (
    <div className={styles.pagina}>
      <EditorNota nota={nota} casos={casos} personal={personal} />
    </div>
  );
}
