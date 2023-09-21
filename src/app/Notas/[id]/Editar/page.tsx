import { Edit } from 'components/Nota/Edit';
import { getNotaById } from '#@/lib/project/notas';
import note from 'components/Nota/note.module.css';
import { notFound } from 'next/navigation';

export default async function page(
  {
    params,
  }: {
  params: {
    id: string;
  };
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

    <Edit
      key={nota.id}
      nota={nota}
    />

  );
}
