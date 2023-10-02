
import Modal from '#@/components/Modal';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import getNotas from '#@/lib/project/getNotas';

export default async function Page (
  {
    searchParams
  }: { searchParams: { [ key: string ]: string | undefined; }; }
) {

  const {
    llaveProceso
  } = searchParams;

  const notas = await getNotas();

  const totalNotas = notas.length;

  const nuevoCod = 1 + totalNotas;

  return (
    <>
      <Modal>
        <NuevaNota cod={ nuevoCod } llaveProceso={ llaveProceso } />
      </Modal>

    </>
  );
}
