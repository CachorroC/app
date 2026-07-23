'use client';
import Image from 'next/image';
import styles from '#@/styles/layout.module.css';
import { useNavigationContext } from '#@/app/Context/navigation-context';
import { DrawerMenuButton, NewNoteButton } from '../Buttons/nav-buttons';
import { Drawer } from './Drawer';
import { NavLink } from './NavLink';
import { Loader } from '../Loader/main-loader';
import { Suspense } from 'react';
import navStyles from './navbar.module.css';

export const NavBar = () => {
  const {
    isNavOpen
  } = useNavigationContext();

  return (
    <div className={styles.header}>
      <Image
        src="/icon.png"
        alt="R&S Asesoría Jurídica"
        width={36}
        height={36}
        className={styles.navBrand}
        priority
      />

      <NavLink
        iconLabel={'home'}
        textLabel={'Inicio'}
        hrefLabel={'/dashboard' }
      />
      <NavLink
        iconLabel={'folder_open'}
        textLabel={'Carpetas'}
        hrefLabel={'/dashboard/Carpetas'}
      />
      <NavLink
        iconLabel={'notes'}
        textLabel={'Notas'}
        hrefLabel={'/dashboard/Notas'}
      />
      <NavLink
        iconLabel={'history_edu'}
        textLabel={'Memoriales'}
        hrefLabel={'/dashboard/memoriales' }
      />
      <NavLink
        iconLabel={'price_check'}
        textLabel={'Amortizac.'}
        hrefLabel={'/dashboard/amortizacion' }
      />

      <div className={styles.navSpacer} />

      <DrawerMenuButton />

      {isNavOpen && (
        <Suspense fallback={<Loader />}>
          <Drawer>
            <DrawerMenuButton />
            <NewNoteButton />
            <NavLink
              iconLabel={'history'}
              textLabel={'Últ. actuaciones'}
              hrefLabel={'/dashboard/Carpetas/UltimasActuaciones' }
            />
            <NavLink
              iconLabel={'create_new_folder'}
              textLabel={'Nueva Carpeta'}
              hrefLabel={'/dashboard/Carpetas/Nueva'}
            />
            <NavLink
              iconLabel={'note_add'}
              textLabel={'Nueva Nota'}
              hrefLabel={'/dashboard/Notas/Nueva'}
            />
            <NavLink
              iconLabel={'request_quote'}
              textLabel={'Costos'}
              hrefLabel={'/dashboard/Costos'}
            />
            <NavLink
              iconLabel={'contact_mail'}
              textLabel={'Contacto'}
              hrefLabel={'/dashboard/Contacto'}
            />
            <NavLink
              iconLabel={'groups'}
              textLabel={'Quiénes Somos'}
              hrefLabel={'/dashboard/QuienesSomos'}
            />

            {/* Rutas pages agregadas dinámicamente */}
            <NavLink
              iconLabel={'task'}
              textLabel={'Tareas'}
              hrefLabel={'/dashboard/tareas' }
            />
            <NavLink
              iconLabel={'category'}
              textLabel={'Categoría de Carpeta'}
              hrefLabel={'/dashboard/Carpetas/Categorias/Laboral' }
            />
            <NavLink
              iconLabel={'inventory'}
              textLabel={'Expediente de Carpeta'}
              hrefLabel={'/dashboard/Carpetas/Expediente/123' }
            />
            <NavLink
              iconLabel={'edit_note'}
              textLabel={'Editar Nota'}
              hrefLabel={'/dashboard/Notas/id/123/Editar' }
            />
            <NavLink
              iconLabel={'visibility'}
              textLabel={'Ver Nota'}
              hrefLabel={'/dashboard/Notas/id/123' }
            />
            <NavLink
              iconLabel={'calendar_month'}
              textLabel={'Notas por Fecha'}
              hrefLabel={'/dashboard/Notas/Fecha/2026/07/20' }
            />
            <NavLink
              iconLabel={'topic'}
              textLabel={'Carpetas Alt'}
              hrefLabel={'/dashboard/Carpetas_alt' }
            />
            <NavLink
              iconLabel={'folder_special'}
              textLabel={'Carpeta Alt (Id)'}
              hrefLabel={'/dashboard/Carpetas_alt/178' }
            />
            <NavLink
              iconLabel={'storage'}
              textLabel={'Base de Datos'}
              hrefLabel={'/dashboard/database' }
            />
            <NavLink
              iconLabel={'edit_document'}
              textLabel={'Editar Carpeta'}
              hrefLabel={'/dashboard/Carpeta/178/Editar' }
            />
            <NavLink
              iconLabel={'folder_shared'}
              textLabel={'Ver Carpeta'}
              hrefLabel={'/dashboard/Carpeta/178' }
            />
            <NavLink
              iconLabel={'update'}
              textLabel={'Actuaciones de Carpeta'}
              hrefLabel={'/dashboard/Carpeta/178/ultimasActuaciones' }
            />
            <NavLink
              iconLabel={'gavel'}
              textLabel={'Demanda de Carpeta'}
              hrefLabel={'/dashboard/Carpeta/178/Demanda' }
            />
            <NavLink
              iconLabel={'find_in_page'}
              textLabel={'Proceso de Actuaciones'}
              hrefLabel={'/dashboard/Carpeta/178/ultimasActuaciones/1234567' }
            />
            <NavLink
              iconLabel={'event'}
              textLabel={'Calendario por Fecha'}
              hrefLabel={'/dashboard/Calendario/Fecha/2026/07/20' }
            />
            <NavLink
              iconLabel={'account_balance'}
              textLabel={'Expediente Rama Judicial'}
              hrefLabel={'/dashboard/RamaJudicial/Expediente/11001400302320180012300' }
            />
            <NavLink
              iconLabel={'book'}
              textLabel={'Bitácora'}
              hrefLabel={'/dashboard/bitacora' }
            />
            <NavLink
              iconLabel={'menu_book'}
              textLabel={'Ver Bitácora'}
              hrefLabel={'/dashboard/bitacora/123' }
            />
            <NavLink
              iconLabel={'question_mark'}
              textLabel={'IDK'}
              hrefLabel={'/dashboard/idk' }
            />

            <hr className={navStyles.navSeparator} />

            {/* Rut.ts */}
            <NavLink
              iconLabel={'api'}
              textLabel={'API Ayudante'}
              hrefLabel={'/dashboard/Ayudante/Navidad/New' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Schema'}
              hrefLabel={'/api/schema' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Subscribe'}
              hrefLabel={'/api/subscribe' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Pruebas'}
              hrefLabel={'/api/Pruebas' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Carpetas'}
              hrefLabel={'/api/Carpetas' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Webhook'}
              hrefLabel={'/api/webhook' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Nueva Nota'}
              hrefLabel={'/api/Notas/Nueva' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Notas'}
              hrefLabel={'/api/Notas' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Reval. Notas'}
              hrefLabel={'/api/Notas/revalidate' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Nuevas Actuac.'}
              hrefLabel={'/api/addNewActuaciones' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Root'}
              hrefLabel={'/api' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Models'}
              hrefLabel={'/api/models/gpt-4' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Carpeta'}
              hrefLabel={'/api/Carpeta' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Unsubscribe'}
              hrefLabel={'/api/unsubscribe' }
            />
            <NavLink
              iconLabel={'api'}
              textLabel={'API Revalidate'}
              hrefLabel={'/api/revalidate' }
            />
            <NavLink
              iconLabel={'description'}
              textLabel={'Manifest'}
              hrefLabel={'/manifest.webmanifest' }
            />
          </Drawer>
        </Suspense>
      )}
    </div>
  );
};
