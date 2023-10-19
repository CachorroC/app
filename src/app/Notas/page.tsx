
import { notasCollection } from '#@/lib/connection/mongodb';
import { notasConvert } from '#@/lib/types/notas';
import { NotaComponent } from 'components/Nota/server';

async function getData () {
  const collection = await notasCollection();

  const notasRaw = await collection.find()
    .toArray();

  const notas = notasConvert.toMonNotas(
    notasRaw
  );

  return notas;
}

export default async function Page() {
  const notas = await getData();

  return (  <>
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
  </> );
}