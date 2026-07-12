import CarpetasDashboard from '@/components/dashboard/CarpetasDashboard';
import { CARPETAS } from '@/lib/mockData';

// Server component: in a real app, fetch carpetas (with relations) here:
//   const carpetas = await prisma.carpeta.findMany({ include: { deudor: true, demanda: true, actuaciones: true, procesos: true, facturas: true, notas: true, tareas: true } });
export default function CarpetasPage() {
  return <CarpetasDashboard initialCarpetas={CARPETAS} />;
}
