import typography from '#@/styles/fonts/typography.module.css';
import Link from 'next/link';
import { buttonEnabled } from '../Buttons/filled.module.css';
import { Route } from 'next';

export function ActuacionTableComponent (
  {
    numero, title, content, idProceso
  }: {
    numero: number;
    title: string;content: string | null; idProceso: number
  }
) {
      return (
        <td>
          <h2 className={ typography.titleMedium }>
            {title}
          </h2>

          { content && (
            <span className={typography.labelSmall}>
              {content}
            </span>
          ) }
          <div>
            <Link className={buttonEnabled} href={`/Carpeta/${ numero }/ultimasActuaciones/${ idProceso }` as Route}>
            mostras más
            </Link>
          </div>
        </td>
      );
}

export function ActuacionTableErrorComponent () {
      return (
        <td>
          <h5 className={typography.headlineSmall} style={{
            backgroundColor: 'var(--error-container)',
            color          : 'var(--on-error-container)',
            borderBottom   : 'solud 0.2rem var(--error)'
          } }>
    Sin actuaciones
          </h5>
          <span className={typography.labelSmall}>
    Esta carpeta no tiene registros en la Rama Judicial
          </span>
        </td>
      );
}