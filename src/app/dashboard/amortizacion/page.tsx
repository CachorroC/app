import type { Metadata } from 'next';
import { Suspense } from 'react';
import layout from '#@/styles/layout.module.css';
import { AmortizacionForm } from './amortizacion-form';

export const metadata: Metadata = {
  title: 'Calculadora de amortización UVR | R&S Asesoría Jurídica',
  description:
    'Calcule la cuota, los intereses y el plan de pagos de un crédito hipotecario en UVR, y descargue el plan completo en Excel.',
};

export default function AmortizacionPage() {
  return (
    <div className={layout.left}>
      <Suspense fallback={null}>
        <AmortizacionForm />
      </Suspense>
    </div>
  );
}
