import { Despachos } from '../project/utils/Procesos/despachos';
import { Juzgado } from '../types/carpetas';
import { intProceso } from '../types/procesos';

export class NewJuzgado implements Juzgado {
  constructor(
    proceso: intProceso 
  ) {
            const matchedDespacho = Despachos.find(
              (
                despacho: { nombre: string } 
              ) => {
                        const nDesp = despacho.nombre
                              .toLowerCase()
                              .normalize(
                                'NFD' 
                              )
                              .replace(
                                /\p{Diacritic}/gu, '' 
                              )
                              .trim();

                        const pDesp = proceso.despacho
                              .toLowerCase()
                              .normalize(
                                'NFD' 
                              )
                              .replace(
                                /\p{Diacritic}/gu, '' 
                              )
                              .trim();

                        const indexOfDesp = nDesp.indexOf(
                          pDesp 
                        );

                        if ( indexOfDesp >= 0 ) {
                          console.log(
                            `procesos despacho is in despachos ${ indexOfDesp + 1 }` 
                          );
                        }

                        return nDesp === pDesp;
              } 
            );

            const nameN = matchedDespacho
              ? matchedDespacho.nombre
              : proceso.despacho;

            const matchedId = nameN.match(
              /\d+/g 
            );

            this.id = Number(
              matchedId?.toString() 
            );
            ( this.tipo = matchedDespacho
              ? matchedDespacho.nombre
              : proceso.despacho ),
            ( this.url = matchedDespacho
              ? `https://www.ramajudicial.gov.co${ matchedDespacho.url }`
              : `https://www.ramajudicial.gov.co${ proceso.despacho
                    .replaceAll(
                      ' ', '-' 
                    )
                    .toLowerCase() }` );
  }
  id: number;
  tipo: string;
  url: string;
}
