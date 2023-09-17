import { Edit } from 'components/Nota/Edit';
import { getNotaById } from '#@/lib/project/notas';
import note from 'components/Nota/note.module.css';
import { Fragment } from 'react';
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
      id: params.id,
    }
  );

  if ( !nota ) {
    return notFound();
  }

  return (
    <div className={note.container}>
      <div className={note.nota}>
        <Edit
          key={nota.nota}
          nota={nota}
        />


      </div>
    </div>
  );
}
