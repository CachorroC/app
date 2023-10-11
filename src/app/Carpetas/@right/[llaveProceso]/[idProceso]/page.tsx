import { NotaComponent } from '#@/components/Nota/server';
import { getNotasByllaveProceso } from '#@/lib/project/notas';

export default async function Page(
  {
    params,
  }: {
  params: { llaveProceso: string };
} 
) {
  const notas = await getNotasByllaveProceso(
    {
      llaveProceso: params.llaveProceso,
    } 
  );

  return (
    <>
      {notas.map(
        (
          nota 
        ) => {
          return (
            <NotaComponent
              key={nota._id}
              notaRaw={nota}
            />
          );
        } 
      )}
    </>
  );
}
