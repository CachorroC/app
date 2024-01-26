import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';
import { IngresoComponent } from '../ingreso-component';


export default async function Default () {
      const carpetas = await getCarpetas();
      return (
        <IngresoComponent carpetas={ [ ...carpetas ].sort(
          (
            a, b
          ) => {

                    const x = a.nombre;

                    const y = b.nombre;

                    if ( x < y ) {
                      return -1;
                    }

                    if ( x > y ) {
                      return 1;
                    }

                    return 0;
          }
        )}/>
      );
}