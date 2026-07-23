import { getNotas } from '#@/lib/project/utils/Notas/getNotas';
import { Route } from 'next';
import Link from 'next/link';

export async function NotasLinkList( {
  carpetaNumero,
}: {
  carpetaNumero?: number;
} ) {
  const notas = await getNotas( carpetaNumero );

  return (
    <>
      {notas.map( ( nota ) => {
        const editarHref: Route<`/dashboard/Notas/id/${string}/Editar`> = `/dashboard/Notas/id/${ nota.id }/Editar`;

        return (
          <Link
            key={nota.id}
            href={editarHref}
            style={{
              padding: '.5rem',
            }}
          >
            <sub>{nota.text}</sub>
          </Link>
        );
      } )}
    </>
  );
}
