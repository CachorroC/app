import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import { NuevaNotaFormProvider } from '#@/app/context/nueva-nota-form-context';
import ModalDialog from '#@/app/hooks/modal-state';

export default function Page() {
      return (
        <ModalDialog>
          <NuevaNotaFormProvider>
            <div className={layout.top}>
              <h1 className={typography.displayLarge}>Nueva Nota</h1>
            </div>
            <div className={layout.left}>
              <NuevaNota />
            </div>
          </NuevaNotaFormProvider>
        </ModalDialog>
      );
}
