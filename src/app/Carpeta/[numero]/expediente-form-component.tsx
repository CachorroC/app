'use client';

import layout from '#@/styles/layout.module.css';
import { useEffect, useState } from 'react';
import { editllaveProceso } from './actions';
import { entidadesJudiciales } from '#@/lib/data/keybuilder';

export function ExpedienteFormComponent( {
  initialLLave,
  numero,
  id
}: {
  initialLLave: string;
    numero: number;
  id: number
} ) {
  const [
    departamentoState,
    setDepartamentoState
  ] = useState( '00' );

  const [
    municipioState,
    setMunicipioState
  ] = useState( '000' );

  const [
    entidadState,
    setEntidadState
  ] = useState( '00' );

  const [
    especialidadState,
    setEspecialidadState
  ] = useState( '00' );

  const [
    despachoState,
    setDespachoState
  ] = useState( '000' );

  const [
    anoState,
    setAnoState
  ] = useState( String( new Date()
    .getFullYear() ) );

  const [
    codigoState,
    setCodigoState
  ] = useState( '00000' );

  const [
    recursoState,
    setRecursoState
  ] = useState( '00' );

  async function editKey() {
    const editor = await editllaveProceso(
      numero, id,
      `${ departamentoState }${ municipioState }${ entidadState }${ especialidadState }${ despachoState }${ anoState }${ codigoState }${ recursoState }`,
    );

    if ( editor.success ) {
      alert( `se cambió bien la llave del proceso: ${ editor.llaveProceso }` );
    } else {
      alert( `hubo un error ${ editor.llaveProceso }` );
    }
  }

  useEffect(
    () => {
      const matcher = initialLLave.matchAll( /(\d{2})(\d{3})(\d{2})(\d{2})(\d{3})(\d{4})(\d{5})(\d+)/gm, );

      for ( const matched of matcher ) {
        const [
          total,
          deparamento,
          ciudad,
          entidad,
          especialidad,
          despacho,
          ano,
          codigoProceso,
          recurso,
        ] = matched;

        setDepartamentoState( deparamento );
        setMunicipioState( ciudad );
        setEntidadState( entidad );
        setEspecialidadState( especialidad );

        setDespachoState( despacho );
        setAnoState( ano );
        setCodigoState( codigoProceso );
        setRecursoState( recurso );
        console.log( total );

        console.log( matched );
      }
    }, [
      initialLLave
    ]
  );

  const selectedEntidad = entidadesJudiciales.find( ( entidad ) => {
    if ( entidad.codigo === entidadState ) {
      return true;
    }

    return false;
  } );

  return (
    <form action={editKey}>
      <pre>{`${ departamentoState }${ municipioState }${ entidadState }${ especialidadState }${ despachoState }${ anoState }${ codigoState }${ recursoState }`}</pre>

      <div className={layout.segmentColumn}>
        <label htmlFor="departamento">Departamento</label>
        <input
          type="text"
          value={departamentoState}
          name="departamento"
          onChange={( e ) => {
            return setDepartamentoState( e.target.value );
          }}
        />
        <label htmlFor="municipio">municipio</label>
        <input
          type="text"
          value={municipioState}
          name="municipio"
          onChange={( e ) => {
            return setMunicipioState( e.target.value );
          }}
        />
        <label htmlFor="entidad">Entidad</label>
        <input
          type="text"
          value={entidadState}
          name="entidad"
          onChange={( e ) => {
            return setEntidadState( e.target.value );
          }}
        />
        <label htmlFor="especialidad">Especialidad</label>
        <input
          type="text"
          value={especialidadState}
          name="especialidad"
          onChange={( e ) => {
            return setEspecialidadState( e.target.value );
          }}
        />
        <label htmlFor="especialidad">especialidad</label>
        <select
          value={entidadState}
          onChange={( e ) => {
            return setEntidadState( e.target.value );
          }}
        >
          {entidadesJudiciales.map( ( entidad ) => {
            return (
              <option
                key={entidad.codigo}
                value={entidad.codigo}
              >
                {entidad.nombre}
              </option>
            );
          } )}
        </select>
        {selectedEntidad && (
          <select
            value={especialidadState}
            onChange={( e ) => {
              return setEspecialidadState( e.target.value );
            }}
          >
            {selectedEntidad.especialidades.map( ( entidad ) => {
              return (
                <option
                  key={entidad.codigo}
                  value={entidad.codigo}
                >
                  {entidad.nombre}
                </option>
              );
            } )}
          </select>
        )}
        <input
          type="text"
          pattern="/(\d{2})/gm"
          value={despachoState}
          name="despacho"
          onChange={( e ) => {
            return setDespachoState( e.target.value );
          }}
        />
        <input
          type="text"
          value={anoState}
          pattern="\d{4}"
          title="año expresado en cuatro digitos"
          name="ano"
          onChange={( e ) => {
            return setAnoState( e.target.value );
          }}
        />
        <input
          type="text"
          value={codigoState}
          name="codigo"
          onChange={( e ) => {
            return setCodigoState( e.target.value );
          }}
        />
        <input
          value={recursoState}
          name="recurso"
          onChange={( e ) => {
            return setRecursoState( e.target.value );
          }}
        />
        <button type="submit">
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </form>
  );
}
