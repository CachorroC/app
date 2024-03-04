import { getNotaById } from '#@/lib/project/utils/Notas/notas';
import { Edit } from '#@/components/Nota/Edit';
import { notFound } from 'next/navigation';
import { getNotas } from '#@/lib/project/utils/Notas/getNotas';

//? Generate segments for [numero]

export async function generateStaticParams() {
      const carpetas = await getNotas();

      const flattenUp = carpetas.map(
        (
          carpeta
        ) => {
                  const {
                    id
                  } = carpeta;

                  return {
                    id: String(
                      id
                    ),
                  };
        }
      );

      const chunkSize = 20;

      const chunks = [];

      for ( let i = 0; i < flattenUp.length; i += chunkSize ) {
        const chunk = flattenUp.slice(
          i, i + chunkSize
        );
        chunks.push(
          chunk
        );
      }

      return chunks[ 0 ];
}

export default async function Page(
  {
    params: {
      id
    },
  }: {
    params: { id: string };
  }
) {
      const nota = await getNotaById(
        Number(
          id
        )
      );

      if ( !nota ) {
        return notFound();
      }

      return (
        <>
          <Edit
            key={id}
            nota={nota}
          />
        </>
      );
}
