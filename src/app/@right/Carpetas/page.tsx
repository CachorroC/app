import { CarpetasSortButtons } from '#@/components/Carpetas/client/carpetasButtonsSort';


export default function Page () {
  const carpetaKeys = [
    'fecha',
    'nombre',
    'numero',
    'primerNombre',
    'primerApellido',
    'category',
    'categoryTag'
  ];

  return (
    <CarpetasSortButtons keys={carpetaKeys} />
  );
}