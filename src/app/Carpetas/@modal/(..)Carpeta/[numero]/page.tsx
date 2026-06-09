import { AvailableProcesosByName } from "#@/components/available-procesos-by-name";
import { Loader } from "#@/components/Loader/main-loader";
import { getCarpetabyNumero } from "#@/lib/project/utils/Carpetas/carpetas";
import { notFound } from "next/navigation";
import { Suspense } from "react";
async function WithCarpeta ( { numero }: { numero: string; } ) {
    const carpeta = await getCarpetabyNumero( Number( numero ) );

    if ( !carpeta ) {
      return notFound();
    }
  return (
<Suspense fallback={<Loader />}>
            <AvailableProcesosByName nombre={carpeta.nombre} />
          </Suspense>
  )
}
export default async function page ( { params }: { params: Promise<{ numero: string; }>; } ) {
  const { numero } = await params;

  return (

    <Suspense fallback={<Loader/>}>
      <WithCarpeta numero={numero} />
      </Suspense>

  )
}
