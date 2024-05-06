import { ProcesoDetalleComponent } from '#@/components/Proceso/proceso-detalles-component';
import { getProcesosByllaveProceso } from '#@/lib/project/utils/Procesos';

export default async function Page (
  {
    params
  }: { params: { llaveProceso: string } }
) {
      const procesos= await getProcesosByllaveProceso(
        params.llaveProceso
      );
      return (
        <>
          { procesos.map(
            (
              proceso
            ) => {
                      return <ProcesoDetalleComponent key={proceso.idProceso} idProceso={ proceso.idProceso } />;
            }
          )}
        </>
      );
}