'use client';

import { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Icon } from '#@/components/ui';
import type { FieldDef } from '#@/memoriales/manifests/types';
import type { CarpetaLookup } from '#@/memoriales/lib/carpeta-lookup';
import { TextField } from '../ui/text-field';

interface LookupTextFieldProps {
  field    : FieldDef;
  name     : string;
  disabled?: boolean;
  options  : CarpetaLookup[];
  loading  : boolean;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  onSelect : ( carpeta: CarpetaLookup ) => void;
}

export function LookupTextField( {
  field,
  name,
  disabled,
  options,
  loading,
  onSelect,
}: LookupTextFieldProps ) {
  const {
    control 
  } = useFormContext();
  const {
    field: rhf, fieldState 
  } = useController( {
    control,
    name,
  } );
  const listId = `dl-${ name }`;

  function handleChange( event: ChangeEvent<HTMLInputElement> ) {
    rhf.onChange( event );

    const match = options.find( ( carpeta ) => {
      return carpeta.deudorNombre === event.target.value;
    } );

    if ( match ) {
      onSelect( match );
    }
  }

  return (
    <>
      <TextField
        id={`f-${ name }`}
        label={field.label}
        list={listId}
        placeholder={field.placeholder}
        requiredMark={field.required}
        disabled={disabled}
        error={fieldState.error?.message}
        helperText={
          loading
            ? 'Cargando carpetas…'
            : ( field.helpText
              ?? 'Escriba para buscar entre las carpetas registradas' )
        }
        leadingIcon={
          <Icon
            name="person_search"
            size={20}
          />
        }
        value={( rhf.value as string | undefined ) ?? ''}
        onChange={handleChange}
        onBlur={rhf.onBlur}
        name={rhf.name}
        ref={rhf.ref}
      />
      <datalist id={listId}>
        {options.map( ( carpeta ) => {
          return (
            <option
              key={carpeta.numero}
              value={carpeta.deudorNombre}
            />
          );
        } )}
      </datalist>
    </>
  );
}
