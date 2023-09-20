'use client';
import { useSelectedLayoutSegment, usePathname } from 'next/navigation';
import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';

export const Name = (
    {
                    helper 
    }: { helper?: string } 
) => {
      const pathname = usePathname();

      const segment = useSelectedLayoutSegment();

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

      return (
        <h1 className={typography.titleMedium}>
          {helper?.toLocaleLowerCase()
        ?? `${ days[ today.getDay() ] }, ${ fixFechas(
                    today.toString() 
        ) }`}
        </h1>
      );
};
