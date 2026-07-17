'use client';

import { ChangeEvent, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Icon } from '#@/components/ui';
import { ComboboxOptions } from '#@/components/ui/combobox/combobox-options';
import { useCombobox, ComboboxOption } from '#@/app/Hooks/useCombobox';
import type { FieldDef } from '#@/memoriales/manifests/types';
import type { CarpetaLookup } from '#@/memoriales/lib/carpeta-lookup';
import { TextField } from '../ui/text-field';

/**
 * Pairs a raw `CarpetaLookup` with a computed, human-readable `label` for
 * display as a combobox option — see `buildLabeledOptions`.
 */
interface LabeledCarpeta extends ComboboxOption {
  carpeta: CarpetaLookup;
  label  : string;
}

/** Duplicate or empty debtor names need a disambiguated label, so every option has a unique, non-empty display string. */
function buildLabeledOptions( options: CarpetaLookup[] ): LabeledCarpeta[] {
  const nameCounts = new Map<string, number>();

  for ( const carpeta of options ) {
    if ( !carpeta.deudorNombre ) {
      continue;
    }

    nameCounts.set(
      carpeta.deudorNombre, ( nameCounts.get( carpeta.deudorNombre ) ?? 0 ) + 1 
    );
  }

  return options.map( ( carpeta ) => {
    if ( !carpeta.deudorNombre ) {
      return {
        id   : carpeta.numero,
        carpeta,
        label: `Carpeta ${ carpeta.numero }`,
      };
    }

    const isDuplicate = ( nameCounts.get( carpeta.deudorNombre ) ?? 0 ) > 1;

    return {
      id   : carpeta.numero,
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
 * Renders a `TextField` paired with a custom combobox dropdown (`useCombobox` +
 * `ComboboxOptions`) of case-folder options for the manifest's autofill trigger
 * field — a mobile-keyboard-safe replacement for native `<datalist>`.
 *
 * When the user picks one of the labeled options, sets the RHF field to the
 * matching debtor's name and fires `onSelect(carpeta)` so the autofill
 * context can populate other fields; otherwise passes the raw change
 * straight through to react-hook-form.
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
  const labeledOptions = useMemo(
    () => {
      return buildLabeledOptions( options );
    }, [
      options
    ] 
  );
  const inputValue = ( rhf.value as string | undefined ) ?? '';

  const combobox = useCombobox( {
    options : labeledOptions,
    inputValue,
    onSelect: ( entry ) => {
      rhf.onChange( entry.carpeta.deudorNombre );
      onSelect( entry.carpeta );
    },
  } );

  function handleChange( event: ChangeEvent<HTMLInputElement> ) {
    rhf.onChange( event );
    combobox.open();
  }

  function handleBlur() {
    rhf.onBlur();
    combobox.handleInputBlur();
  }

  return (
    <div
      ref={combobox.wrapperRef}
      style={{
        position: 'relative',
      }}
    >
      <TextField
        id={`f-${ name }`}
        label={field.label}
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
        value={inputValue}
        onChange={handleChange}
        onFocus={combobox.open}
        onKeyDown={combobox.handleInputKeyDown}
        onBlur={handleBlur}
        name={rhf.name}
        ref={rhf.ref}
        autoComplete="off"
      />
      <ComboboxOptions
        isOpen={combobox.isOpen}
        options={combobox.filteredOptions}
        highlightedIndex={combobox.highlightedIndex}
        panelStyle={combobox.panelStyle}
        getOptionProps={combobox.getOptionProps}
      />
    </div>
  );
}
