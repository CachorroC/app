
import { getNotaById } from '#@/lib/project/notas';
import { Edit } from '#@/components/Nota/Edit';
import typography from '#@/styles/fonts/typography.module.scss';
import layout from '#@/styles/layout.module.css';
import { notFound } from 'next/navigation';

export default async function NuevaNotallaveProceso(
  {
    params: {
      id
    },

  }: {
  params: { id: string };
}
) {
  let notaScope;
  let notaNumber;

  if ( id === 'Nueva' ) {
    notFound();
  }

  if ( id ) {
    const nota = await getNotaById(
      {
        id: id
      }
    );
    notaNumber= nota?.cod;
    notaScope = (
      nota && <Edit
        key={id}
        nota={nota}
      />
    );
  }

  return (
    <>
      <div className={ layout.top }>
        <h1 className={typography.displayLarge}>{`Nota numero: ${ notaNumber }`}</h1>
      </div>
      <div className={ layout.left }>
        {notaScope}
      </div>
    </>
  );
}
