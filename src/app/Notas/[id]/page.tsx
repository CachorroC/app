import { NewNota } from 'components/Nota/client';
import { Notas } from 'components/Nota/server';
import layout from '#@/styles/layout.module.css';
import { getNotaById } from '#@/lib/project/notas';
import { notFound } from 'next/navigation';

export default async function NuevaNotallaveProceso(
  {
    params,
  }: {
  params: { id: string };
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
    <>

      <NewNota key={params.id} llaveProceso={nota.llaveProceso} />

    </>
  );
}
