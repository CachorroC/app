import { Despachos } from '../project/utils/Procesos/despachos';
import { Juzgado } from '../types/carpetas';
import { extrapolateTipoToCorrectType } from '../project/utils/despacho-name-transformer';

export class NewJuzgado implements Juzgado {
  private numericId: number;
  constructor(
    constructorString: string
  ) {
    const matchedValues = constructorString.match(
      /JUZGADO (\d+) ([A-Z\sñúóéíá]+) DE ([.A-Z\sñúóéíáü-]+)/im,
    );
    this.url = '';

    if ( !matchedValues ) {
      this.id = constructorString.trim()
        .slice(
          7, 9
        )
        .padStart(
          3, '000'
        );
      this.tipo = constructorString.trim()
        .slice(
          9
        );

    } else {
      const [
        fullQuery,
        id,
        tipo,
        ciudad
      ] = matchedValues;
      console.log(
        fullQuery
      );
      this.id = id.padStart(
        3, '000'
      );
      this.tipo = tipo;
      this.ciudad = ciudad;
    }



    this.numericId = Number(
      this.id
    );
    console.log(
      this.numericId
    );
    console.log(
      this.id
    );

    const [
      matchedDespacho
    ] = Despachos.filter(
      (
        despacho
      ) => {
        const normalizedIteratedName = despacho.nombre
          .toLowerCase()
          .normalize(
            'NFD'
          )
          .replaceAll(
            /\p{Diacritic}/gu, ''
          )
          .trim();

        const normalizedName = constructorString.toLowerCase()
          .normalize(
            'NFD'
          )
          .replaceAll(
            /\p{Diacritic}/gu, ''
          )
          .trim();


        const indexOfDespacho = normalizedIteratedName.indexOf(
          normalizedName
        );

        const includesDespacho = normalizedIteratedName.includes(
          normalizedName
        );

        const includesBuilded = normalizedIteratedName.includes(
          `${ this.numericId } ${ this.tipo }`.toLowerCase()
            .normalize(
              'NFD'
            )
            .replaceAll(
              /\p{Diacritic}/gu, ''
            )
            .trim()
        );

        if (  indexOfDespacho !== -1 || includesDespacho||includesBuilded  ) {
          console.log(
            `${ includesDespacho }: ${ normalizedIteratedName } === ${ normalizedName }: ${ normalizedIteratedName === normalizedName }`
          );
          return true;
        }

        return normalizedIteratedName === normalizedName;
      }
    );

    if ( matchedDespacho ) {
      this.url = `https://www.ramajudicial.gov.co${ matchedDespacho.url }`;


      const regexNameMatch = matchedDespacho.nombre.match(
        /JUZGADO (\d+) ([A-Z\sñúóéíá]+) de ([.A-Z\sñúóéíá-]+)/mi
      );


      if ( regexNameMatch ) {
        const [
          longName,
          id,
          tipo,
          ciudad
        ] = regexNameMatch;
        console.log(
          longName
        );
        this.id = id;
        this.tipo = tipo;
        this.ciudad = ciudad;
      } else {
        this.tipo = matchedDespacho.nombre;
        this.ciudad = matchedDespacho.especialidad;
      }


    }
  }
  static fromShortName (
    {
      ciudad, juzgadoRaw
    }: { ciudad: string;  juzgadoRaw: string}
  ): NewJuzgado {
    let newTipo, newId;
    newTipo = juzgadoRaw;


    const matchedRegexNumberAndLetters = juzgadoRaw.match(
      /(\d+)(\s?)([A-Zñúáéóí\s-]+)/im,
    );


    if ( matchedRegexNumberAndLetters ) {
      const asAnArray = Array.from(
        matchedRegexNumberAndLetters
      );

      const [
        fullArray,
        rawId,
        space,
        rawTipo
      ] = asAnArray;
      console.log(
        fullArray + space
      );
      newId = rawId.padStart(
        3, '000'
      );
      newTipo = extrapolateTipoToCorrectType(
        rawTipo
      );


    }

    return new NewJuzgado(
      `JUZGADO ${ newId } ${ newTipo } DE ${ ciudad.toUpperCase()
        .normalize(
          'NFD'
        )
        .replaceAll(
          /\p{Diacritic}/gu, ''
        )
        .trim() }`
    );

  }
  id: string;
  ciudad: string = 'Bogotá';
  tipo: string;
  url: string;
}
