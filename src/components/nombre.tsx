
import typography from '#@/styles/fonts/typography.module.css';
import Link from 'next/link';

export function NombreComponent(
  {
    nombre, carpetaNumero
  }: {nombre: string; carpetaNumero: number}
) {
      const rawName = nombre.split(
        ' '
      )
            .map(
              (
                palabra
              ) => {


                        return palabra.charAt(
                          0
                        )
                              .toUpperCase() + palabra.toLowerCase()
                              .substring(
                                1
                              );
              }
            );

      return (
        <Link href={`/Carpeta/${ carpetaNumero }`}
          className={typography.displayLarge}
        >
          {rawName.join(
            ' '
          )}
        </Link>
      );
}
