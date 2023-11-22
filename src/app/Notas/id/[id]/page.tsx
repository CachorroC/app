import { getNotaById } from '#@/lib/project/utils/Notas/notas';
import { Edit } from '#@/components/Nota/Edit';
import { notFound } from 'next/navigation';

export default async function NuevaNotallaveProceso(
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
        ),

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
