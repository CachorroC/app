
import { prisma } from '#@/lib/connection/prisma';
import { Route } from 'next';
import Link from 'next/link';

export async function NotasList (
  {
    carpetaNumero
  }: { carpetaNumero?: number }
) {
  let notas;

  if ( carpetaNumero ) {
    notas = await prisma.nota.findMany(
      {
        where: {
          carpetaNumero: carpetaNumero
        }
      }
    );
  } else {
    notas = await prisma.nota.findMany();
  }

  return ( <>
    {notas.map(
      (
        nota
      ) => {
        return (
          <Link key={ nota.id } href={ `/Notas/id/${ nota.id }/Editar`as Route } style={{
            padding: '.5rem'
          }}>
            <sub>{ nota.text }</sub>
          </Link>
        );
      }
    )}
  </> );
}