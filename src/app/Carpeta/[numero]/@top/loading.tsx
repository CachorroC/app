import { Loader } from '#@/components/Loader/main-loader';
import typography from '#@/styles/fonts/typography.module.css';

export default function Loading() {
  return (
    <>
      <h4 className={typography.displayMedium}>Cargando</h4>
      <Loader />
    </>
  );
}
