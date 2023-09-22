import { Edit } from 'components/Nota/Edit';
import { getNotaById } from '#@/lib/project/notas';
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
      id: params.id
    }
  );

  if ( !nota ) {
    return notFound();
  }

  return (

    <Edit
      key={nota._id}
      nota={nota}
    />

  );
}
