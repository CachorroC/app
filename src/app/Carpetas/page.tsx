import {  NewCarpetasList } from '#@/components/Carpetas/client/carpetasList';
import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';

export default async function Page() {
      const carpetas = await getCarpetas();
      return (
        <NewCarpetasList
          carpetas={carpetas}
        />
      );
}
