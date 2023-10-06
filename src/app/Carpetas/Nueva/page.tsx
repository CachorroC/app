import NewNuevoProceso from '#@/components/form/newNuevoProceso';
import getCarpetas from '#@/lib/project/getCarpetas';

export default async function Page () {
  const carpetas = await getCarpetas();

  const carpetasLength = carpetas.length;

  const nextNumber = carpetasLength + 1;
  return (
    <NewNuevoProceso key={nextNumber} nextNumber={nextNumber}/>
  );
}