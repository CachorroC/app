
import { getNotaById } from '#@/lib/project/notas';
import { notFound } from 'next/navigation';
import { Edit } from '#@/components/Nota/Edit';

export default async function NuevaNotallaveProceso(
            {
                            params,
            }: {
  params: { id: string };
}
) {
  const nota = await getNotaById(
              {
                              id: Number(
                                          params.id
                              ),
              }
  );

  if ( !nota ) {
    return notFound();
  }

  return (
    <>
      <Edit
        key={params.id}
        nota={nota}
      />
    </>
  );
}
