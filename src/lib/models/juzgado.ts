 
import { Despachos } from '../project/utils/Procesos/despachos';
import { Juzgado } from '../types/carpetas';
import { extrapolateTipoToCorrectType } from '../project/utils/despacho-name-transformer';
import { intProceso } from '../types/procesos';

export class JuzgadoClass implements Juzgado {
  constructor(
    {
      id,
      tipo,
      ciudad,
    }: {
      id: string;
      tipo: string;
      ciudad: string;
    } 
  ) {
    this.id = id.padStart(
      3, '000' 
    );
    this.tipo = tipo.toUpperCase()
      .trim();
    this.ciudad = ciudad.toUpperCase()
      .trim();

    const constructorString
      = `JUZGADO ${ this.id } ${ this.tipo } DE ${ this.ciudad }`
        .toUpperCase()
        .normalize(
          'NFD' 
        )
        .replaceAll(
          /\p{Diacritic}/gu, '' 
        )
        .trim();

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

        const normalizedName = constructorString
          .toLowerCase()
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

        if ( indexOfDespacho !== -1 ) {
          console.log(
            `Juzgado Class${ includesDespacho }: ${ normalizedIteratedName } === ${ normalizedName }: ${
              normalizedIteratedName === normalizedName
            }`, 
          );

          return true;
        }

        return normalizedIteratedName === normalizedName;
      } 
    );

    if ( matchedDespacho ) {
      this.url = `https://www.ramajudicial.gov.co${ matchedDespacho.url }`;

      const matchedDespachoParts = matchedDespacho.nombre.match(
        /JUZGADO (\d+) ([A-Z\sñúóéíá]+) DE ([.A-Z\sñúóéíá-]+)/im, 
      );

      if ( matchedDespachoParts ) {
        const [
          longName,
          newId,
          newTipo,
          newCiudad
        ] = matchedDespachoParts;

        this.id = newId;
        this.tipo = newTipo;
        this.ciudad = newCiudad;
      }
    } else {
      this.url = '';
    }
  }
  id: string;
  tipo: string;
  ciudad: string;
  url: string;

  static fromShortName(
    {
      ciudad,
      juzgadoRaw,
    }: {
      ciudad: string;
      juzgadoRaw: string;
    } 
  ) {
    let newTipo, newId;
    newTipo = juzgadoRaw;

    const matchedRegexNumberAndLetters = juzgadoRaw.match(
      /(\d+)(\s?)([A-Zñúáéóí\s-]+)/im, 
    );

    if ( !matchedRegexNumberAndLetters ) {
      return new JuzgadoClass(
        {
          id  : '',
          tipo: newTipo,
          ciudad,
        } 
      );
    }

    const asAnArray = Array.from(
      matchedRegexNumberAndLetters 
    );

    const [
      fullArray,
      rawId,
      space,
      rawTipo
    ] = asAnArray;

    newId = rawId.padStart(
      3, '000' 
    );
    newTipo = extrapolateTipoToCorrectType(
      rawTipo 
    );

    return new JuzgadoClass(
      {
        id  : newId,
        tipo: newTipo,
        ciudad,
      } 
    );
  }
  static fromLongName(
    despachoString: string 
  ) {
    const matchedDespachoParts = despachoString.match(
      /JUZGADO (\d+) ([A-Z\sñúóéíá]+) DE ([.A-Z\sñúóéíá-]+)/im, 
    );

    if ( !matchedDespachoParts ) {
      return new JuzgadoClass(
        {
          id    : '',
          tipo  : despachoString,
          ciudad: '',
        } 
      );
    }

    const [
      longName,
      id,
      tipo,
      ciudad
    ] = matchedDespachoParts;

    console.log(
      longName 
    );

    return new JuzgadoClass(
      {
        id,
        tipo,
        ciudad,
      } 
    );
  }
  static fromProceso(
    proceso: intProceso 
  ) {
    const matchedDespachoParts = proceso.despacho.match(
      /JUZGADO (\d+) ([A-Z\sñúóéíá]+) DE ([.A-Z\sñúóéíá-]+)/im, 
    );

    if ( !matchedDespachoParts ) {
      return new JuzgadoClass(
        {
          id    : '',
          tipo  : proceso.despacho,
          ciudad: proceso.departamento,
        } 
      );
    }

    const [
      longName,
      id,
      tipo,
      ciudad
    ] = matchedDespachoParts;

    console.log(
      longName 
    );

    return new JuzgadoClass(
      {
        id,
        tipo,
        ciudad,
      } 
    );
  }
}
