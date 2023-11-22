import { Loader } from '#@/components/Loader';
import typography from '#@/styles/fonts/typography.module.css';

export default function Loading() {
      return ( <><h4 className={typography.displayMedium}>Cargando</h4><Loader/></> );
}
