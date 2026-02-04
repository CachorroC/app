import layout from '#@/styles/layout.module.css';
import Link from 'next/link';
import typography from '#@/styles/fonts/typography.module.css';
import { Calendar } from '#@/components/Calendar/main';
import { Route } from 'next';
import PageClient from './client';
import { InstallPrompt,
  PushNotificationManager, } from './notification-components';
import NotificationButton from '#@/components/NotificationButton';

export default function Page() {
  return (
    <>
      <div className={layout.top}>
        <h1 className={typography.displayLarge}>
          {'R&S Asesoría Jurídica S.A.S'}
        </h1>
      </div>
      <div className={layout.leftGrid}>
        <div>
          <NotificationButton />
          <PushNotificationManager />
          <InstallPrompt />
        </div>
        <Link
          className={layout.button}
          href={'/Carpetas/UltimasActuaciones' as Route}
        >
          <span className="material-symbols-outlined">pace</span>
          <h1 className={typography.headlineMedium}>{'Ultimas Actuaciones'}</h1>
        </Link>
        <Link
          className={layout.button}
          href={'/Notas'}
        >
          <span className="material-symbols-outlined">note</span>
          <h1 className={typography.headlineMedium}>{'Notas'}</h1>
        </Link>
        <Link
          className={layout.button}
          href={'/Carpetas'}
        >
          <span className="material-symbols-outlined">folder_open</span>
          <h1 className={typography.headlineMedium}>{'Carpetas'}</h1>
        </Link>
        <Link
          className={layout.button}
          href={'/Carpetas_alt'}
        >
          <span className="material-symbols-outlined">folder_open</span>
          <h1 className={typography.headlineMedium}>{'Carpetas Alternativo'}</h1>
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
          href={'/Contacto'}
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
      <div className={layout.right}>
        <Calendar />
        <PageClient />
      </div>
    </>
  );
}
