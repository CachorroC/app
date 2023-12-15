
import { Deudor } from '#@/lib/types/carpetas';
import typography from '#@/styles/fonts/typography.module.css';

export function NombreComponent(
  {
    deudor
  }: {deudor: Deudor}
) {
      const nombres = deudor.segundoNombre
        ? deudor.primerNombre + ' ' + deudor.segundoNombre
        : deudor.primerNombre;

      const apellidos = deudor.segundoApellido
        ? deudor.primerApellido + ' ' + deudor.segundoApellido
        : deudor.primerApellido;

      const rawName = nombres + ' ' + apellidos;

      return (
        <h4
          key={deudor.cedula}
          className={typography.displayLarge}
        >
          {rawName}
        </h4>
      );
}
