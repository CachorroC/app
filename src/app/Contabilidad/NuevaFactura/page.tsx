import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { IngresoComponent } from '../ingreso-component';

export default async function Default() {
      const carpetas = await getCarpetas();
      return (
        <IngresoComponent
          carpetas={carpetas}
        />
      );
}
