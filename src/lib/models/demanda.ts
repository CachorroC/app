
import { Despachos } from '../project/utils/Procesos/despachos';
import { Juzgado } from '../types/carpetas';
import { extrapolateTipoToCorrectType } from '../project/utils/despacho-name-transformer';

export class NewJuzgado implements Juzgado {
  constructor(
    rawJuzgado:string
  ) {
            this.id = rawJuzgado;
            this.tipo = rawJuzgado;
            this.ciudad = rawJuzgado;
            this.url = '';

            const matchLongName = rawJuzgado.match(
              /JUZGADO (\d+) ([A-Z\sñúóéíá]+) de ([A-Z\sñúóéíáü-]+)/mi
            );

            const matchShortNome = rawJuzgado.match(
              /(\d+)(\s?)([A-Zñúáéóí\s-]+) de ([A-Z\sñúóéíáü-]+)/im,
            );

            if ( matchShortNome ) {
              const [
                fullQuery,
                rawId,
                rawTipo,
                rawCiudad
              ] = matchShortNome;
              console.log(
                fullQuery
              );
              console.log(
                rawId
              );
              console.log(
                rawTipo
              );
              console.log(
                rawCiudad
              );
              this.id = rawId.padStart(
                3, '000'
              );
              this.tipo = extrapolateTipoToCorrectType(
                rawTipo
              ).tipo;
              this.ciudad = rawCiudad;
              this.url = `https://www.ramajudicial.gov.co/web/JUZGADO-${ this.id }-${ this.tipo.replaceAll(
                ' ', '-'
              ) }-DE-${ this.ciudad }`.toLocaleLowerCase()
                    .replaceAll(
                      ' ', '-'
                    ) ;
            } else if ( matchLongName ) {

              const [
                fullQuery,
                rawId,
                rawTipo,
                rawCiudad
              ] = matchLongName;

              console.log(
                fullQuery
              );
              console.log(
                rawTipo
              );
              console.log(
                rawCiudad
              );
              this.id = rawId.padStart(
                3, '000'
              );
              this.tipo = rawTipo;
              this.ciudad = rawCiudad;
              this.url = `https://www.ramajudicial.gov.co/web/JUZGADO-${ this.id }-${ this.tipo.replaceAll(
                ' ', '-'
              ) }-DE-${ this.ciudad }`.toLocaleLowerCase()
                    .replaceAll(
                      ' ', '-'
                    ) ;

            }


            const [ matchedDespacho ] = Despachos.filter(
              (
                despacho
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

                        const pDesp = matchLongName
                          ? rawJuzgado.toLowerCase()
                                .normalize(
                                  'NFD'
                                )
                                .replace(
                                  /\p{Diacritic}/gu, ''
                                )
                                .trim()
                          : extrapolateTipoToCorrectType(
                            rawJuzgado
                          ).completeValue.toLowerCase()
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

                        if ( indexOfDesp !==-1 ) {
                          console.log(
                            `procesos despacho is in despachos ${ indexOfDesp + 1 }`
                          );
                          return true;
                        }

                        return nDesp === pDesp;
              }
            );

            if ( matchedDespacho ) {
              const outputMatchregexName = matchedDespacho.nombre.match(
                /JUZGADO (\d+) ([A-Z\sñúóéíá]+) de ([A-Z\sñúóéíáü-]+)/mi
              );
              this.url = `https://www.ramajudicial.gov.co${ matchedDespacho.url }`;

              if ( outputMatchregexName ) {
                const [
                  longName,
                  id,
                  tipo,
                  ciudad
                ] = outputMatchregexName;
                this.id = id;
                this.tipo = tipo;
                this.ciudad = ciudad;
                console.log(
                  longName
                );
              }
            }
  }
  id: string;
  ciudad: string;
  tipo: string;
  url: string;
}
