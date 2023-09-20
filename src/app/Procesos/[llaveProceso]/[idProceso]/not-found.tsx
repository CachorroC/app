import button from 'components/Buttons/buttons.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import type { Route } from 'next';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
                      backgroundColor: 'var(--error-container)',
                      color          : 'var(--on-error-container)',
      }}
    >
      <h2 className={typography.displaySmall}>{'No hay actuaciones'}</h2>
      <p className={typography.bodyMedium}>
        {
          'Por el momento no pudimos encontrar actuaciones vinculadas a este idProceso, te invitamos a corregir el error o a intentar de nuevo más tarde.'
        }
      </p>
      <Link
        className={button.button}
        href={'/' as Route}
      >
        <span className={`material-symbols-outlined ${ button.icon }`}>home</span>
        <p className={typography.labelMedium}>{'Inicio'}</p>
      </Link>
    </div>
  );
}
