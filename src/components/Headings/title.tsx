'use client';
import { usePathname } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';

export default function Title( {
  helper 
}: { helper?: string } ) {
  const pathname = usePathname();

  const today = new Date();

  const days = [
    'mimingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];

  const txt = helper
    ? helper
    : days[ today.getDay() ] + ' ' + fixFechas( today.toString() );

  return (
    <h1 className={typography.titleSmall}>
      {pathname === '/'
        ? txt
        : pathname}
    </h1>
  );
}
