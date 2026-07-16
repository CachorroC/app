'use client';

import { ChangeEvent, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Icon } from '#@/components/ui';
import type { FieldDef } from '#@/memoriales/manifests/types';
import type { CarpetaLookup } from '#@/memoriales/lib/carpeta-lookup';
import { TextField } from '../ui/text-field';

/**
 * Pairs a raw `CarpetaLookup` with a computed, human-readable `label` for
 * display as a `<datalist>` option — see `buildLabeledOptions`.
 */
interface LabeledCarpeta {
  carpeta: CarpetaLookup;
  label  : string;
}

/** Native `<datalist>` collapses options with duplicate or empty `value`s, so every entry needs a unique, non-empty label. */
function buildLabeledOptions( options: CarpetaLookup[] ): LabeledCarpeta[] {
  const nameCounts = new Map<string, number>();

  for ( const carpeta of options ) {
    if ( !carpeta.deudorNombre ) continue;
    nameCounts.set( carpeta.deudorNombre, ( nameCounts.get( carpeta.deudorNombre ) ?? 0 ) + 1 );
  }

  return options.map( ( carpeta ) => {
    if ( !carpeta.deudorNombre ) {
      return {
        carpeta,
        label: `Carpeta ${ carpeta.numero }`,
      };
    }

    const isDuplicate = ( nameCounts.get( carpeta.deudorNombre ) ?? 0 ) > 1;

    return {
      carpeta,
      label: isDuplicate
        ? `${ carpeta.deudorNombre } (Carpeta ${ carpeta.numero })`
        : carpeta.deudorNombre,
    };
  } );
}

/**
 * Props for `LookupTextField` — the autofill-trigger field's input, its
 * lookup options (case folders), loading state, and the callback fired when
 * the user picks a matching option to trigger autofill.
 */
interface LookupTextFieldProps {
  field    : FieldDef;
  name     : string;
  disabled?: boolean;
  options  : CarpetaLookup[];
  loading  : boolean;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  onSelect : ( carpeta: CarpetaLookup ) => void;
}

/**
 * Renders a `TextField` paired with a `<datalist>` of case-folder options
 * for the manifest's autofill trigger field.
 *
 * When the typed value matches one of the labeled options, sets the RHF
 * field to the matching debtor's name and fires `onSelect(carpeta)` so the
 * autofill context can populate other fields; otherwise passes the raw
 * change straight through to react-hook-form.
 *
 * @param props - See {@link LookupTextFieldProps}.
 */
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
  const labeledOptions = useMemo( () => buildLabeledOptions( options ), [options] );

  function handleChange( event: ChangeEvent<HTMLInputElement> ) {
    const match = labeledOptions.find( ( entry ) => {
      return entry.label === event.target.value;
    } );

    if ( match ) {
      rhf.onChange( match.carpeta.deudorNombre );
      onSelect( match.carpeta );
      return;
    }

    rhf.onChange( event );
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
        {labeledOptions.map( ( entry ) => {
          return (
            <option
              key={entry.carpeta.numero}
              value={entry.label}
            />
          );
        } )}
      </datalist>
    </>
  );
}
