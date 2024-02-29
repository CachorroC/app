import layout from '#@/styles/layout.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { ActuacionLoader } from '../Card/actuacion-loader';

export const ProcesoCardLoader = () => {
          return (
            <div
              className={layout.sectionColumn}
              style={{
                opacity        : 0.38,
                backgroundColor: 'var(--surface-variant)',
              }}
            >
              <h1 className={typography.titleMedium}>Cargando</h1>
              <div className={layout.segmentRow}>
                <ActuacionLoader />
              </div>
            </div>
          );
};
