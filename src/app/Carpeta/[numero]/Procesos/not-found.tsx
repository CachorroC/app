import typography from '#@/styles/fonts/typography.module.css';

export default function NotFound () {
  return (
    <>
      <h4 className={ typography.titleLarge }>Nopudimos encontrar este proceso</h4>
      <p>En la base de datos de la rama judicial no aparece informacion acerca de este proceso</p></>
  );
}