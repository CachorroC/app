'use client';
import { usePathname } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';

export default function Title(
            {
              helper 
            }: { helper?: string } 
) {
  const pathname = usePathname();

  const today = new Date();
  let day;

  switch ( today.getDay() ) {
          case 0:
            day = 'Mimingo';

            break;
          case 1:
            day = 'Lunes';

            break;
          case 2:
            day = 'Martes';

            break;
          case 3:
            day = 'Miércoles';

            break;
          case 4:
            day = 'Jueves';

            break;
          case 5:
            day = 'Viernes';

            break;
          case 6:
            day = 'Sábado';
  }

  const days = [
    'mimingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];

  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre ',
  ];

  const txt = helper
    ? helper
    : days[ today.getDay() ] + ' ' + fixFechas(
      today.toString() 
    );

  return (
    <h1 className={typography.titleMedium}>
      {pathname === '/'
        ? txt
        : pathname}
    </h1>
  );
}
