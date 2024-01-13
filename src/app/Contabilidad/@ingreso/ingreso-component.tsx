'use client';

import { InputDateHelper } from '#@/lib/project/date-helper';
import { intFactura } from '#@/lib/types/contabilidad';
import layout from '#@/styles/layout.module.css';
import { useState } from 'react';

export function IngresoComponent ()
{
  const [ ingresoState, setIngresoState ] = useState<intFactura>( {
    fecha: new Date(),
    nit: 100000000,
    dv: 0,
    razonSocial: '',
    ubicacion: '',
    ciudad: 'Bogota',
    concepto: 'sinEspecificar',
    valor: 0,
    iva: 0,
    impuestoConsumo: 0,
    icu: 0,
    total: 0
  } );

  async function createIngresoInDatabase ( formData: FormData )
  {

  }
  return (
    <form action={ createIngresoInDatabase }>
      <fieldset className={ layout.sectionColumn }>
        <legend>Establecimiento</legend>
        <div className={ layout.sectionRow }>
          <label htmlFor={ 'fecha' }>fecha</label>
          <input name={ 'fecha' } type={ 'date' } value={ InputDateHelper( ingresoState.fecha ) } onChange={ ( e ) =>
          {
            return setIngresoState( {
              ...ingresoState,
              fecha: new Date( e.target.value )
            } )
          } } />
        </div>
      </fieldset>

    </form>
  )
}