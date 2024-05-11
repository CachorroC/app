import { NuevaNotaFormProvider } from '#@/app/Notas/nueva-nota-form-context';
import { ModalNote } from '#@/components/Modal';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';

export default function PhotoModal() {
  return (
    <ModalNote>
      <NuevaNotaFormProvider>
        <NuevaNota />
      </NuevaNotaFormProvider>
    </ModalNote>
  );
}
