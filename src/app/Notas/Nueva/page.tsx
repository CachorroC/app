
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';
import { NuevaNota } from '#@/components/Nota/client/nueva-nota';
import { NuevaNotaFormProvider } from '#@/app/context/nueva-nota-form-context';

export default async function Page () {




      return (
        <>
          <NuevaNotaFormProvider>
            <div className={layout.top}>
              <h1
                className={typography.displayLarge}
              >Nueva Nota</h1>
            </div>
            <div className={ layout.left }>
              <NuevaNota />
            </div>
          </NuevaNotaFormProvider>
        </>
      );
}
