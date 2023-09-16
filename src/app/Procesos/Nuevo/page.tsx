import { NuevoProceso } from '#@/components/form/nuevo-proceso';
import { getDespachos } from '#@/lib/Procesos';

export default async function PageNuevoProceso() {
  const despachos = await getDespachos();

  return <NuevoProceso despachos={despachos} />;
}
