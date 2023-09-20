import layout from '#@/styles/layout.module.css';
import Link from 'next/link';
import typography from '#@/styles/fonts/typography.module.css';
import { Metadata } from 'next';
import type { Route } from 'next';

export const metadata: Metadata = {
                title: 'Procesos',
};

export default function Page() {
  return (
    <>
      <Link
        className={layout.link}
        href={'/Procesos' as Route}
      >
        <span className="material-symbols-outlined">gavel</span>
        <h1 className={typography.displayMedium}>{'Procesos'}</h1>
      </Link>
      <Link
        className={layout.link}
        href={'/Notas' as Route}
      >
        <span className="material-symbols-outlined">note</span>
        <h1 className={typography.displayMedium}>{'Notas'}</h1>
      </Link>
      <Link
        className={layout.link}
        href={'/Carpetas'}
      >
        <span className="material-symbols-outlined">folder_open</span>
        <h1 className={typography.displayMedium}>{'Carpetas'}</h1>
      </Link>
      <Link
        className={layout.link}
        href={'/Tareas'}
      >
        <span className="material-symbols-outlined">api</span>
        <h1 className={typography.displayMedium}>{'Tareas'}</h1>
      </Link>
      <Link
        className={layout.link}
        href={'/Notas/NuevaNota'}
      >
        <span className="material-symbols-outlined">note_add</span>
        <h1 className={typography.displayMedium}>{'Nueva Nota'}</h1>
      </Link>
      <Link
        className={layout.link}
        href={'/Costos'}
      >
        <span className="material-symbols-outlined">folder_open</span>
        <h1 className={typography.displayMedium}>{'Costos'}</h1>
      </Link>
      <Link
        className={layout.link}
        href={'/Contacto' as Route}
      >
        <span className="material-symbols-outlined">folder_open</span>
        <h1 className={typography.displayMedium}>{'Contacto'}</h1>
      </Link>
      <Link
        className={layout.link}
        href={'/QuienesSomos'}
      >
        <span className="material-symbols-outlined">folder_open</span>
        <h1 className={typography.displayMedium}>{'Quienes Somos'}</h1>
      </Link>
      <Link
        className={layout.link}
        href={'/Procesos/Nuevo'}
      >
        <span className="material-symbols-outlined">add</span>
        <h1 className={typography.displayMedium}>{'NuevoProceso'}</h1>
      </Link>
      <Link
        className={layout.link}
        href={'/Carpetas'}
      >
        <span className="material-symbols-outlined">person_pin</span>
        <h1 className={typography.displayMedium}>{'Demandados'}</h1>
      </Link>
    </>
  );
}
