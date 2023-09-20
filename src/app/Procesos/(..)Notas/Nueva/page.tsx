
import Modal from '#@/components/Modal';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import { useSelectedLayoutSegments } from 'next/navigation';

export default function Page() {

  const segments = useSelectedLayoutSegments();

  const llaveProceso = segments[ 0 ].length === 23;
  let newNote;

  if ( llaveProceso ) {
    newNote = (
      <NuevaNota llaveProceso={segments[ 0 ]} />
    );
  } else {
    newNote = ( <NuevaNota llaveProceso={segments.toString()}/> );
  }

  return (
    <Modal>
      {newNote}
    </Modal>
  );
}
