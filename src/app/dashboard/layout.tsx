import layout from '#@/styles/layout.module.css';
import { ReactNode, Suspense } from 'react';
import { NavBar } from '#@/components/layout/NavBar';
import { IdentityBadge } from '#@/components/layout/identity-badge';
import { Loader } from '#@/components/Loader/main-loader';

export default function DashboardLayout( {
  children,
  modal,
}: {
  children: ReactNode;
  modal   : ReactNode;
} ) {
  return (
    <div className={ layout.container }>
      <Suspense fallback={<Loader />}>
        <Suspense
          fallback={
            <nav>
              Cargando menú... <Loader />
            </nav>
          }
        >
          <NavBar />
        </Suspense>
        <Suspense fallback={null}>
          <IdentityBadge />
        </Suspense>
      </Suspense>
      <Suspense fallback={<Loader />}>
        {children}
      </Suspense>
      <Suspense fallback={null}>
        {modal}
      </Suspense>
    </div>
  );
}
