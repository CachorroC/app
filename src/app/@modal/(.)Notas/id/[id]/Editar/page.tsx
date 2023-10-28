import Modal from '#@/components/Modal';
import { Edit } from '#@/components/Nota/Edit';
import { prisma } from '#@/lib/connection/prisma';
import { notFound } from 'next/navigation';

export default async function Page (
  {
    params
  }: { params: { id: string } }
) {
  const nota = await prisma.nota.findFirst(
    {
      where: {
        id: Number(
          params.id
        )
      }
    }
  );

  if ( !nota ) {
    return notFound();
  }

  return (
    <Modal>
      <Edit
        key={params.id}
        nota={nota}
      />
    </Modal>
  );
}