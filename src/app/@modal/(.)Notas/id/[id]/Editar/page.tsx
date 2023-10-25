

import Modal from '#@/components/Modal';
import { Edit } from '#@/components/Nota/Edit';
import { getNotaById } from '#@/lib/project/notas';
import { notFound } from 'next/navigation';

export default async function Page (
  {
    params
  }: {params: {id: string}}
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
    <Modal>
      <Edit nota={ nota } />
    </Modal>
  );
}