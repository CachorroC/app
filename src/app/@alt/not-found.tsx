import { button } from '#@/components/Buttons/buttons.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { Route } from 'next';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <h2 className={typography.displayMedium}>{'No encontrado'}</h2>
      <p className={typography.bodyLarge}>
        {'No pudimos localizar el recurso que consultaste'}
      </p>
      <Link
        href={'/' as Route}
        className={button}
      >
        {'Inicio'}
      </Link>
    </>
  );
}
