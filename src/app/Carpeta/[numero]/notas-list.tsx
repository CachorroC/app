
import { getNotas } from '#@/lib/project/utils/Notas/getNotas';
import { Route } from 'next';
import Link from 'next/link';

export async function NotasLinkList (
  {
    carpetaNumero
  }: { carpetaNumero?: number }
) {
      const notas = await getNotas(
        carpetaNumero
      );
      return (
        <>
          {notas.map(
            (
              nota
            ) => {
                      return (
                        <Link key={ nota.id } href={ `/Notas/id/${ nota.id }/Editar`as Route } style={{
                          padding: '.5rem'
                        }}>
                          <sub>{ nota.title }</sub>
                        </Link>
                      );
            }
          )}
        </> );
}