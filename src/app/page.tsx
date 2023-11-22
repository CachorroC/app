import layout from '#@/styles/layout.module.css';
import Link from 'next/link';
import typography from '#@/styles/fonts/typography.module.css';
import type { Route } from 'next';
import { Calendar } from '#@/components/Calendar/main';


export default function Page () {
      return (
        <>
          <div className={layout.top}>
            <h1 className={typography.displayLarge}>
              {'R&S Asesoría Jurídica S.A.S'}
            </h1>
          </div>
          <div className={layout.leftGrid}>
            <Link
              className={layout.button}
              href={'/Carpetas/UltimasActuaciones'}
            >
              <span className="material-symbols-outlined">pace</span>
              <h1 className={typography.headlineMedium}>{'Ultimas Actuaciones'}</h1>
            </Link>
            <Link
              className={layout.button}
              href={'/Notas' as Route}
            >
              <span className="material-symbols-outlined">note</span>
              <h1 className={typography.headlineMedium}>{'Notas'}</h1>
            </Link>
            <Link
              className={layout.button}
              href={'/Carpetas' as Route}
            >
              <span className="material-symbols-outlined">folder_open</span>
              <h1 className={typography.headlineMedium}>{'Carpetas'}</h1>
            </Link>
            <Link
              className={layout.button}
              href={'/Tareas' as Route}
            >
              <span className="material-symbols-outlined">api</span>
              <h1 className={typography.headlineMedium}>{'Tareas'}</h1>
            </Link>

            <Link
              className={layout.button}
              href={'/Costos'}
            >
              <span className="material-symbols-outlined">folder_open</span>
              <h1 className={typography.headlineMedium}>{'Costos'}</h1>
            </Link>
            <Link
              className={layout.button}
              href={'/Contacto' as Route}
            >
              <span className="material-symbols-outlined">folder_open</span>
              <h1 className={typography.headlineMedium}>{'Contacto'}</h1>
            </Link>
            <Link
              className={layout.button}
              href={'/QuienesSomos'}
            >
              <span className="material-symbols-outlined">folder_open</span>
              <h1 className={typography.headlineMedium}>{'Quienes Somos'}</h1>
            </Link>
          </div>
          <div className={ layout.right }>
            <Calendar />
          </div>
        </>
      );
}
