import { NuevaNotaFormProvider } from '#@/app/context/nueva-nota-form-context';
import { Loader } from '#@/components/Loader';
import Modal from '#@/components/Modal';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import { Suspense } from 'react';

export default function Page() {

  return (
    <Modal>
      <Suspense fallback={<Loader />}>
        <NuevaNotaFormProvider>
          <NuevaNota />
        </NuevaNotaFormProvider>
      </Suspense>
    </Modal>
  );
}
