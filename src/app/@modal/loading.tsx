import { Loader } from '#@/components/Loader';
import Modal from '#@/components/Modal';
import { ProcesosCardSkeleton } from '#@/components/Proceso/skeleton';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';

export default function Loading() {
      return (
        <Modal>
          <h4 className={typography.titleLarge}>Cargando</h4>
          <section className={layout.sectionColumn}>
            <Loader />
            <Loader />
            <Loader />
            <ProcesosCardSkeleton />
          </section>
        </Modal>
      );
}
