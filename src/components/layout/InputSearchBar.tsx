'use client';
import searchbar from 'components/layout/search/input-search-bar.module.css';
import { useMemo, useState } from 'react';
import { useCarpetaSort,
  useCarpetaSortDispatch, } from '#@/app/Context/carpetas-sort-context';
import { useRouter } from 'next/navigation';
import { Route } from 'next';
import { useCombobox } from '#@/app/Hooks/useCombobox';
import { ComboboxOptions } from '#@/components/ui/combobox/combobox-options';

export const InputSearchBar = () => {
  const [
    newQueryState,
    setNewQueryState
  ] = useState( '' );

  const {
    completeCarpetas
  } = useCarpetaSort();
  const router = useRouter();

  const dispatchCarpetas = useCarpetaSortDispatch();

  const demandadosOptions = useMemo(
    () => {
      return completeCarpetas.map( ( carpeta ) => {
        return {
          id    : carpeta.numero,
          label : carpeta.nombre,
          numero: carpeta.numero,
        };
      } );
    }, [
      completeCarpetas
    ] 
  );

  const combobox = useCombobox( {
    options   : demandadosOptions,
    inputValue: newQueryState,
    onSelect  : ( option ) => {
      setNewQueryState( option.label );
      dispatchCarpetas( {
        type   : 'search',
        payload: option.label,
      } );
      const href: Route<`/dashboard/Carpeta/${number}`> = `/dashboard/Carpeta/${ option.numero }`;

      router.push( href );
    },
  } );

  return (
    <div
      ref={combobox.wrapperRef}
      className={searchbar.searchContainer}
    >
      <span
        className={`material-symbols-rounded ${ searchbar.leadingIcon }`}
        aria-hidden="true"
      >
        search
      </span>
      <input
        type={'text'}
        name={'query'}
        placeholder={'Buscar por nombre, número, radicado o cédula'}
        value={newQueryState}
        className={searchbar.input}
        autoComplete="off"
        onChange={( e ) => {
          dispatchCarpetas( {
            type   : 'search',
            payload: e.target.value,
          } );
          setNewQueryState( e.target.value );
          combobox.open();
        }}
        onFocus={combobox.open}
        onKeyDown={combobox.handleInputKeyDown}
        onBlur={combobox.handleInputBlur}
      />

      <button
        className={searchbar.icon}
        type="button"
        onClick={() => {
          setNewQueryState( '' );

          return dispatchCarpetas( {
            type: 'reset',
          } );
        }}
      >
        <span className="material-symbols-rounded">close</span>
      </button>
      <ComboboxOptions
        isOpen={combobox.isOpen}
        options={combobox.filteredOptions}
        highlightedIndex={combobox.highlightedIndex}
        panelStyle={combobox.panelStyle}
        getOptionProps={combobox.getOptionProps}
      />
    </div>
  );
};
