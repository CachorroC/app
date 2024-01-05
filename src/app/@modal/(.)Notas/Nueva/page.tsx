import { NuevaNotaFormProvider } from '#@/app/context/nueva-nota-form-context';
import Modal from '#@/components/Modal';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import layout from '#@/styles/layout.module.scss';
import typography from '#@/styles/fonts/typography.module.css';

export default function PhotoModal() {
      return (
        <Modal>
          <NuevaNotaFormProvider>
            <div className={layout.top}>
              <h1 className={typography.displayLarge}>Nueva Nota</h1>
            </div>
            <div className={layout.left}>
              <NuevaNota />
            </div>
          </NuevaNotaFormProvider>
        </Modal>
      );
}
