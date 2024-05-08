'use client';
import layout from '#@/styles/layout.module.css';

import { useNuevaFacturaContext } from './nueva-factura-context-provider';

export function NuevaFacturaOutput() {
      const {
        valorState 
      } = useNuevaFacturaContext();
      return (
        <section className={layout.segmentRow}>
          <pre
            style={{
              width     : '100%',
              whiteSpace: 'break-spaces',
              wordWrap  : 'break-word',
            }}
          >
            {JSON.stringify(
              valorState, null, 2 
            )}
          </pre>
        </section>
      );
}
