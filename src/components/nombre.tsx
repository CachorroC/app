
import typography from '#@/styles/fonts/typography.module.css';

function capitalizeFirstLetter(
  string : string
) {
      return string.charAt(
        0
      )
            .toUpperCase() + string.slice(
        1
      )
            .toLowerCase();
}

export function NombreComponent(
  {
    primerNombre, segundoNombre, primerApellido, segundoApellido
  }: { primerNombre: string; primerApellido: string; segundoNombre: string | null; segundoApellido: string | null}
) {
      const nombres = segundoNombre
        ? capitalizeFirstLetter(
          primerNombre
        )+ ' ' + capitalizeFirstLetter(
          segundoNombre
        )
        : capitalizeFirstLetter(
          primerNombre
        );

      const apellidos = segundoApellido
        ? capitalizeFirstLetter(
          primerApellido
        ) + ' ' + capitalizeFirstLetter(
          segundoApellido
        )
        : capitalizeFirstLetter(
          primerApellido
        );

      const rawName = nombres + ' ' + apellidos;

      return (
        <h4
          className={typography.displayLarge}
        >
          {rawName}
        </h4>
      );
}
