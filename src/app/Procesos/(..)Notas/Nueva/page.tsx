
import { usePathname } from 'next/navigation';
import Modal from '#@/components/Modal';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';

export default function Page() {

  const pathname = usePathname();

  return (
    <Modal>
      <NuevaNota />
    </Modal>
  );
}