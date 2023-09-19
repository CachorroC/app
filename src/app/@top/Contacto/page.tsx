import Checkbox from 'components/form/checkbox/client';
import typography from '#@/styles/fonts/typography.module.scss';

export default function Page() {
  return (
    <>
      <h1 className={typography.displayLarge}>{'Contáctenos:'}</h1>
      <Checkbox />
    </>
  );
}
