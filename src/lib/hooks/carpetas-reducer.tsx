import { MonCarpeta } from '../types/carpetas';

export default function carpetasReducer(
  carpetas: MonCarpeta[], action: { type: string; }
) {
  switch ( action.type ) {
      case 'fecha': {

        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            if ( !a.fecha || a.fecha === undefined ) {
              return 1;
            }

            if ( !b.fecha || b.fecha === undefined ) {
              return -1;
            }

            const x = a.fecha.toISOString();

            const y = b.fecha.toISOString();

            if ( x < y ) {
              return 1;
            }

            if ( x > y ) {
              return -1;
            }

            return 0;
          }
        );

      }

      case 'numero': {

        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            const x = a.numero;

            const y = b.numero;

            if ( x < y ) {
              return 1;
            }

            if ( x > y ) {
              return -1;
            }

            return 0;
          }
        );
      }

      case 'nombre': {

        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            const x = a.nombre;

            const y = b.nombre;

            if ( x < y ) {
              return 1;
            }

            if ( x > y ) {
              return -1;
            }

            return 0;
          }
        );
      }

      case 'primerNombre': {


        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            const x = a.deudor.primerNombre;

            const y = b.deudor.primerNombre;

            if ( x < y ) {
              return 1;
            }

            if ( x > y ) {
              return -1;
            }

            return 0;
          }
        );
      }

      case 'primerApellido': {


        return [
          ...carpetas
        ].sort(
          (
            a, b
          ) => {
            const x = a.deudor.primerApellido;

            const y = b.deudor.primerApellido;

            if ( x < y ) {
              return 1;
            }

            if ( x > y ) {
              return -1;
            }

            return 0;
          }
        );
      }

      default: {
        throw Error(
          'Unknown action: ' + action.type
        );
      }
  }
}
