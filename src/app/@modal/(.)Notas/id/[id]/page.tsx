
import ModalDialog from '#@/app/hooks/modal-state';
import { NotaComponent } from '#@/components/Nota/server';
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
    <ModalDialog>
      <NotaComponent
        key={nota.id}
        notaRaw={nota}
      />
    </ModalDialog>
  );
}