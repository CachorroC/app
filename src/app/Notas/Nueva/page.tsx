import { getNotaById } from '#@/lib/project/notas';
import { Edit } from '#@/components/Nota/Edit';
import typography from '#@/styles/fonts/typography.module.scss';
import layout from '#@/styles/layout.module.css';
import getNotas from '#@/lib/project/getNotas';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';

export default async function NuevaNotallaveProceso(
  {
    params: {
      id 
    },
    searchParams,
  }: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
} 
) {
  let notaScope;
  let notaNumber;

  const {
    llaveProceso 
  } = searchParams;

  const isNuevaNota = id === 'Nueva';

  const notas = await getNotas();

  const totalNotas = notas.length;

  const nuevoCod = 1 + totalNotas;

  if ( isNuevaNota ) {
    notaNumber = nuevoCod;

    notaScope = (
      <NuevaNota
        key={id}
        cod={nuevoCod}
        llaveProceso={llaveProceso}
      />
    );
  } else {
    const nota = await getNotaById(
      {
        id: id,
      } 
    );
    notaNumber = nota
      ? nota.cod
      : nuevoCod;
    notaScope = nota && (
      <Edit
        key={id}
        nota={nota}
      />
    );
  }

  return (
    <>
      <div className={layout.top}>
        <h1
          className={typography.displayLarge}
        >{`Nota numero: ${ notaNumber }`}</h1>
      </div>
      <div className={layout.left}>{notaScope}</div>
    </>
  );
}
