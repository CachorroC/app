import { NotaComponent } from '#@/components/Nota/server';
import getNotas from '#@/lib/project/getNotas';
import layout from '#@/styles/layout.module.css';
import Link from 'next/link';
import typography from '#@/styles/fonts/typography.module.scss';
import styles from '#@/components/Buttons/buttons.module.css';
import type { Route } from 'next';

export default async function Page() {
  const notas = await getNotas();

  return (
    <>
      <div className={ layout.top }>
        <h1 className={typography.displayLarge}>{'Notas'}</h1>
        <Link
          className={styles.button}
          href={'/Notas/Nueva' as Route }
        >
          <p className={styles.text}>{'Nueva Nota'}</p>
          <span className={`material-symbols-outlined ${ styles.icon }`}>
          note_alt
          </span>
        </Link>

      </div>
      {notas.map(
        (
          nota
        ) => {
          return (
            <NotaComponent
              key={nota._id}
              notaRaw={nota}
            />
          );
        }
      )}
    </>
  );
}
