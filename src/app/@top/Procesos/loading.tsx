import { Loader } from '#@/components/Loader';
import typography from '#@/styles/fonts/typography.module.scss';

export default function MainRightLoadingProcesos() {
  return (
    <>
      <h1 className={typography.displayLarge}>Cargando</h1>
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
    </>
  );
}
