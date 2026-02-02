import typography from '#@/styles/fonts/typography.module.css';
import { fixFechas } from '#@/lib/project/helper';

export const Name = ( {
  helper 
}: { helper?: string } ) => {
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

  return (
    <h1 className={typography.headlineSmall}>
      {helper?.toLocaleLowerCase()
        ?? `${ days[ today.getDay() ] }, ${ fixFechas( today.toString() ) }`}
    </h1>
  );
};
