import { Loader } from '#@/components/Loader/main-loader';
import { ModalNote } from '#@/components/Modal';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import { Suspense } from 'react';
import { NuevaNotaFormProvider } from '../Notas/nueva-nota-form-context';

export default function ModalPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ModalNote>
        <NuevaNotaFormProvider>
          <NuevaNota />
        </NuevaNotaFormProvider>
      </ModalNote>
    </Suspense>
  );
}
