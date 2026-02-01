'use client';
import { useTable } from '#@/app/Context/TableContext';
import { MonCarpeta } from '#@/lib/types/carpetas';
import React from 'react';
import { MultiSelectFilter } from './MultiselectFilter';

const categorias = [
  'Terminados',
  'LiosJuridicos',
  'Bancolombia',
  'Reintegra',
  'Insolvencia',
  'SinEspecificar',
];

const ciudades = [
  'GIRARDOT',
  'BOGOTA',
  'CAJICA',
  'GUASCA',
  'SIBATE',
  'FACATATIVA',
  'VIANI',
  'SOACHA',
  'CHIA',
  'FUSAGASUGA',
  'GAMA',
  'GUADUAS',
  'TABIO',
  'ANAPOIMA',
  'CHOCONTA',
  'ZIPAQUIRA',
  'MADRID',
  'EL COLEGIO',
  'TOCANCIPA',
  'FUNZA',
  'MOSQUERA',
  'LA CALERA',
  'VIOTA',
  'MELGAR',
  'LA MESA',
  'TENJO',
  'SOPO',
  'PENSILVANIA',
  'SESQUILE',
  'FUNZA ',
  'ARBELAEZ',
  'COTA',
  'UMBITA',
  'CAPARRAPI',
  'APULO',
  'SAN JUAN DE RIOSECO',
  'SOACHA ',
  'MANTA',
  'UBATE',
  'BARRANQUILLA',
  'TUNJA',
  'GUATAVITA',
  'VILLETA',
  'MADIRD',
  'SUESCA',
  'RICAURTE'
];

export const PaginationControls = () => {
  const {
    dispatch,
    totalPages,
    totalItems, state
  } = useTable<MonCarpeta>(); // using <any> because pagination doesn't care about the data shape

  return (
    <div style={{
      display   : 'flex',
      gap       : '10px',
      marginTop : '10px',
      alignItems: 'center'
    }}
    >
      <select
        value={state.itemsPerPage}
        onChange={(
          e
        ) => {
          return dispatch(
            {
              type   : 'SET_ITEMS_PER_PAGE',
              payload: Number(
                e.target.value
              )
            }
          );

        }}
      >
        <option value={2}>Show 2</option>
        <option value={5}>Show 5</option>
        <option value={10}>Show 10</option>
      </select>

      <button
        onClick={ () => {
          return dispatch(
            {
              type   : 'SET_PAGE',
              payload: state.currentPage - 1
            }
          );
        }}
        disabled={state.currentPage === 1}
      >
        Previous
      </button>

      <span>
        Page {state.currentPage} of {totalPages} ({totalItems} items)
      </span>
      <input value={ state.currentPage } onChange={ (
        e
      ) => {
        return dispatch(
          {
            type   : 'SET_PAGE',
            payload: Number(
              e.target.value
            )
          }
        );
      }}
      />

      <button
        onClick={ () => {
          return dispatch(
            {
              type   : 'SET_PAGE',
              payload: state.currentPage + 1
            }
          );
        }}
        disabled={state.currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};


export const FilterControls = () => {
  const {
    state, dispatch, isSearching
  } = useTable<MonCarpeta>();

  // Helper to handle filter changes cleanly
  const toggleBooleanFilter = (
    key: keyof MonCarpeta, value: boolean
  ) => {
    // Check if the filter is already active with this value
    if ( state.filters[ key ] === value ) {
      dispatch(
        {
          type   : 'CLEAR_FILTER',
          payload: key
        }
      );
    } else {
      dispatch(
        {
          type   : 'SET_FILTER',
          payload: {
            key,
            value
          }
        }
      );
    }
  };

  return (
    <div style={{
      display     : 'flex',
      gap         : '20px',
      marginBottom: '20px',
      alignItems  : 'center'
    }}
    >

      {/* 1. Global Search */}
      <input
        type="text"
        placeholder="Global search..."
        value={state.searchQuery}
        onChange={(
          e
        ) => {
          return dispatch(
            {
              type   : 'SET_SEARCH',
              payload: e.target.value
            }
          );
        }}
        style={{
          padding: '8px'
        }}
      />

      {/* 2. Boolean Filter: "Is Terminado?" */}
      <label style={{
        cursor    : 'pointer',
        display   : 'flex',
        alignItems: 'center',
        gap       : '5px'
      }}
      >
        <input
          type="checkbox"
          checked={state.filters.terminado === true}
          onChange={() => {
            return toggleBooleanFilter(
              'terminado', true
            );
          }}
        />
        Show Only Finished (Boolean)
      </label>



      <select
        value={state.filters.ciudad || ''}
        onChange={(
          e
        ) => {
          const val = e.target.value;

          if ( val === '' ) {
            dispatch(
              {
                type   : 'CLEAR_FILTER',
                payload: 'ciudad'
              }
            );
          } else {
            dispatch(
              {
                type   : 'SET_FILTER',
                payload: {
                  key  : 'ciudad',
                  value: val
                }
              }
            );
          }
        }}
        style={{
          padding: '8px'
        }}
      >
        { ciudades.map(
          (
            ciudad
          ) => {
            return (
              <option key={ciudad} value={ciudad}>{ciudad}</option>
            );
          }
        )}
      </select>
      <MultiSelectFilter filterKey={ 'category' } options={ categorias } label={ 'Categories' } />
      <MultiSelectFilter filterKey={ 'ciudad' } options={ ciudades } label={ 'Cities' } />
      {/* 3. Dropdown Filter: "Category" */}
      <select
        value={state.filters.category || ''}
        onChange={(
          e
        ) => {
          const val = e.target.value;

          if ( val === '' ) {
            dispatch(
              {
                type   : 'CLEAR_FILTER',
                payload: 'category'
              }
            );
          } else {
            dispatch(
              {
                type   : 'SET_FILTER',
                payload: {
                  key  : 'category',
                  value: val
                }
              }
            );
          }
        }}
        style={{
          padding: '8px'
        }}
      >
        <option value="">All Categories</option>
        <option value="Terminados">Terminados</option>
        <option value="LiosJuridicos">Lios Juridicos</option>
        <option value="Bancolombia">Bancolombia</option>
        <option value="Reintegra">Reintegra</option>
        <option value="Insolvencia">Insolvencia</option>
        <option value="SinEspecificar">SinEspecificar</option>
      </select>

      {/* 4. Reset Button */}
      {( Object.keys(
        state.filters
      ).length > 0 || state.searchQuery ) && (
        <button onClick={() => {
          // You might want a RESET_ALL action in reducer for this
          dispatch(
            {
              type   : 'SET_SEARCH',
              payload: ''
            }
          );
          dispatch(
            {
              type   : 'CLEAR_FILTER',
              payload: 'terminado'
            }
          );
          dispatch(
            {
              type   : 'CLEAR_FILTER',
              payload: 'category'
            }
          );
        }} style={{
          color: 'red'
        }}
        >
          Clear All
        </button>
      )}

      {isSearching && <span>Processing...</span>}
    </div>
  );
};