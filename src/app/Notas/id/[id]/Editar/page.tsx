import { getNotaById } from '#@/lib/project/utils/Notas/notas';
import { notFound } from 'next/navigation';
import { Edit } from '#@/components/Nota/Edit';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';

export default async function NuevaNotallaveProceso(
  {
    params
  }: {
    params: Promise<{ id: number }>;
  } 
) {
  const {
    id 
  } = await params;

  const nota = await getNotaById(
    id 
  );

  if ( !nota ) {
    return notFound();
  }

  return (
    <>
      <div className={layout.top}>
        <h1 className={typography.displayLarge}>{`Nota numero: ${ nota.id }`}</h1>
      </div>
      <div className={layout.left}>
        <Edit
          key={id}
          nota={nota}
        />
      </div>
    </>
  );
}
