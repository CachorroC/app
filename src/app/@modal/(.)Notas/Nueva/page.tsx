import { NuevaNotaFormProvider } from '#@/app/Notas/nueva-nota-form-context';
import Modal from '#@/components/Modal';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';

export default function PhotoModal() {
      return (
        <Modal>
          <NuevaNotaFormProvider>
            <NuevaNota />
          </NuevaNotaFormProvider>
        </Modal>
      );
}
