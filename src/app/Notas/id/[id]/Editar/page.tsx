import { getNotaById } from '#@/lib/project/notas';
import { notFound } from 'next/navigation';
import { Edit } from '#@/components/Nota/Edit';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';

export default async function NuevaNotallaveProceso(
  {
    params,
  }: {
  params: { id: string };
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
    <>
      <div className={layout.top}>
        <h1
          className={typography.displayLarge}
        >{`Nota numero: ${ nota.cod }`}</h1>
      </div>
      <div className={layout.left}>
        <Edit
          key={params.id}
          nota={nota}
        />
      </div>
    </>
  );
}
