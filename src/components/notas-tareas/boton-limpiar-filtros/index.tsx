'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { Route } from 'next';
import { Button } from '#@/components/ds/button';

export const BotonLimpiarFiltros = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      variant="tonal"
      icon={<span className="material-symbols-rounded" aria-hidden="true">filter_alt_off</span>}
      onClick={() => {
        router.replace(
          pathname as Route, {
            scroll: false 
          } 
        );
      }}
    >
      Limpiar filtros
    </Button>
  );
};
