'use client';

import { useController, useFieldArray, useFormContext } from 'react-hook-form';
import { Icon } from '#@/components/ui';
import type { FieldDef } from '#@/memoriales/manifests/types';
import { useAutofillContext } from '../memorial-form/autofill-context';
import { Button } from '../ui/button';
import { IconButton } from '../ui/icon-button';
import { Switch } from '../ui/switch';
import { TextField } from '../ui/text-field';
import textFieldStyles from '../ui/text-field/text-field.module.css';
import fieldStyles from './field.module.css';
import { LookupTextField } from './lookup-text-field';

/**
 * Shared prop shape for `Field` and its internal per-type renderers
 * (`ScalarField`, `TextareaField`, `SelectField`, `BooleanField`, `StringListField`).
 */
interface FieldProps {
  field    : FieldDef;
  name     : string;
  disabled?: boolean;
}

/** Maps a scalar `FieldDef['type']` to its native HTML `<input type>` attribute; used by `ScalarField`. */
const INPUT_TYPE: Partial<Record<FieldDef['type'], string>> = {
  number  : 'number',
  currency: 'number',
  date    : 'date',
};

/**
 * Routes a manifest-driven `FieldDef` to the concrete input renderer for its type.
 *
 * Renders `LookupTextField` when this field is the active autofill trigger,
 * otherwise dispatches on `field.type` (stringList/boolean/textarea/select),
 * falling back to `ScalarField` for plain scalar types (text/number/currency/date).
 *
 * @param props - See {@link FieldProps}.
 * @returns The input element appropriate for this field's type.
 */
export function Field( {
  field, name, disabled 
}: FieldProps ) {
  const autofill = useAutofillContext();

  if ( autofill && name === autofill.triggerField ) {
    return (
      <LookupTextField
        field={field}
        name={name}
        disabled={disabled}
        options={autofill.options}
        loading={autofill.loading}
        onSelect={autofill.applyCarpeta}
      />
    );
  }

  if ( field.type === 'stringList' ) {
    return (
      <StringListField
        field={field}
        name={name}
        disabled={disabled}
      />
    );
  }

  if ( field.type === 'boolean' ) {
    return (
      <BooleanField
        field={field}
        name={name}
        disabled={disabled}
      />
    );
  }

  if ( field.type === 'textarea' ) {
    return (
      <TextareaField
        field={field}
        name={name}
        disabled={disabled}
      />
    );
  }

  if ( field.type === 'select' ) {
    return (
      <SelectField
        field={field}
        name={name}
        disabled={disabled}
      />
    );
  }

  return (
    <ScalarField
      field={field}
      name={name}
      disabled={disabled}
    />
  );
}

/**
 * Renders a single-line `TextField` bound to react-hook-form via `useController`
 * for scalar field types (text/number/currency/date), notifying the autofill
 * context of manual edits so autofill won't later overwrite them.
 *
 * @param props - See {@link FieldProps}.
 */
function ScalarField( {
  field, name, disabled 
}: FieldProps ) {
  const {
    control 
  } = useFormContext();
  const {
    field: rhf, fieldState 
  } = useController( {
    control,
    name,
  } );
  const autofill = useAutofillContext();

  return (
    <TextField
      id={`f-${ name }`}
      label={field.label}
      type={INPUT_TYPE[ field.type ] ?? 'text'}
      placeholder={field.placeholder}
      requiredMark={field.required}
      disabled={disabled}
      error={fieldState.error?.message}
      helperText={field.helpText}
      leadingIcon={field.type === 'currency'
        ? '$'
        : undefined}
      value={( rhf.value as string | number | undefined ) ?? ''}
      onChange={( event ) => {
        rhf.onChange( event );
        autofill?.notifyManualEdit( name );
      }}
      onBlur={rhf.onBlur}
      name={rhf.name}
      ref={rhf.ref}
    />
  );
}

/**
 * Renders a multi-line `<textarea>` bound to react-hook-form via `useController`,
 * with label, required marker, error message, and help text, notifying the
 * autofill context of manual edits.
 *
 * @param props - See {@link FieldProps}.
 */
function TextareaField( {
  field, name, disabled 
}: FieldProps ) {
  const {
    control 
  } = useFormContext();
  const {
    field: rhf, fieldState 
  } = useController( {
    control,
    name,
  } );
  const autofill = useAutofillContext();
  const id = `f-${ name }`;
  const errorId = fieldState.error
    ? `${ id }-error`
    : undefined;

  return (
    <div className={textFieldStyles.field}>
      <label
        htmlFor={id}
        className={`${ textFieldStyles.label } ${
          fieldState.error
            ? textFieldStyles.labelError
            : ''
        }`}
      >
        {field.label}
        {field.required
          ? (
              <span className={textFieldStyles.requiredMark}> *</span>
            )
          : null}
      </label>
      <textarea
        id={id}
        className={textFieldStyles.textarea}
        placeholder={field.placeholder}
        disabled={disabled}
        aria-invalid={!!fieldState.error}
        aria-describedby={errorId}
        rows={3}
        value={( rhf.value as string | undefined ) ?? ''}
        onChange={( event ) => {
          rhf.onChange( event );
          autofill?.notifyManualEdit( name );
        }}
        onBlur={rhf.onBlur}
        name={rhf.name}
        ref={rhf.ref}
      />
      {fieldState.error
        ? (
            <div
              id={errorId}
              className={textFieldStyles.error}
            >
              {fieldState.error.message}
            </div>
          )
        : null}
      {!fieldState.error && field.helpText
        ? (
            <div className={textFieldStyles.helper}>{field.helpText}</div>
          )
        : null}
    </div>
  );
}

/**
 * Renders a native `<select>` populated from `field.options`, bound to
 * react-hook-form via `useController`, notifying the autofill context of
 * manual edits.
 *
 * @param props - See {@link FieldProps}.
 */
function SelectField( {
  field, name, disabled 
}: FieldProps ) {
  const {
    control 
  } = useFormContext();
  const {
    field: rhf, fieldState 
  } = useController( {
    control,
    name,
  } );
  const autofill = useAutofillContext();
  const id = `f-${ name }`;
  const errorId = fieldState.error
    ? `${ id }-error`
    : undefined;

  return (
    <div className={textFieldStyles.field}>
      <label
        htmlFor={id}
        className={`${ textFieldStyles.label } ${
          fieldState.error
            ? textFieldStyles.labelError
            : ''
        }`}
      >
        {field.label}
        {field.required
          ? (
              <span className={textFieldStyles.requiredMark}> *</span>
            )
          : null}
      </label>
      <select
        id={id}
        className={textFieldStyles.select}
        disabled={disabled}
        aria-invalid={!!fieldState.error}
        aria-describedby={errorId}
        value={( rhf.value as string | undefined ) ?? ''}
        onChange={( event ) => {
          rhf.onChange( event );
          autofill?.notifyManualEdit( name );
        }}
        onBlur={rhf.onBlur}
        name={rhf.name}
        ref={rhf.ref}
      >
        <option
          value=""
          disabled
        >
          Seleccione una opción…
        </option>
        {( field.options ?? [] ).map( ( option ) => {
          return (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          );
        } )}
      </select>
      {fieldState.error
        ? (
            <div
              id={errorId}
              className={textFieldStyles.error}
            >
              {fieldState.error.message}
            </div>
          )
        : null}
    </div>
  );
}

/**
 * Renders a `Switch` plus its label for boolean fields — typically a gate
 * field (e.g. "has anexos") that toggles visibility of a related stringList
 * field in `Fieldset`.
 *
 * @param props - See {@link FieldProps}.
 */
function BooleanField( {
  field, name, disabled 
}: FieldProps ) {
  const {
    control 
  } = useFormContext();
  const {
    field: rhf 
  } = useController( {
    control,
    name,
  } );
  const id = `f-${ name }`;

  return (
    <div className={fieldStyles.booleanRow}>
      <Switch
        id={id}
        checked={!!rhf.value}
        onChange={rhf.onChange}
        onBlur={rhf.onBlur}
        name={rhf.name}
        ref={rhf.ref}
        disabled={disabled}
        aria-label={field.label}
      />
      <label
        htmlFor={id}
        className={fieldStyles.booleanLabel}
      >
        {field.label}
      </label>
    </div>
  );
}

/**
 * Renders a dynamic list of text inputs (via `useFieldArray`) for `stringList`
 * fields, such as attachment/anexo names — one row per entry with a delete
 * `IconButton`, plus an "Agregar anexo" `Button` to append a new row.
 *
 * @param props - See {@link FieldProps}.
 */
function StringListField( {
  field, name, disabled 
}: FieldProps ) {
  const {
    control, register 
  } = useFormContext();
  const {
    fields, append, remove 
  } = useFieldArray( {
    control,
    name,
  } );

  return (
    <div className={fieldStyles.stringList}>
      <div className={fieldStyles.stringListLabel}>{field.label}</div>
      {field.helpText
        ? (
            <div className={textFieldStyles.helper}>{field.helpText}</div>
          )
        : null}
      {fields.map( (
        row, index 
      ) => {
        return (
          <div
            key={row.id}
            className={fieldStyles.stringListRow}
          >
            <input
              className={fieldStyles.stringListInput}
              placeholder="Nombre del documento anexo"
              disabled={disabled}
              {...register( `${ name }.${ index }.value` )}
            />
            <IconButton
              aria-label="Eliminar anexo"
              disabled={disabled}
              onClick={() => {
                return remove( index );
              }}
            >
              <Icon
                name="delete"
                size={20}
              />
            </IconButton>
          </div>
        );
      } )}
      <Button
        type="button"
        variant="text"
        size="small"
        disabled={disabled}
        icon={
          <Icon
            name="add"
            size={18}
          />
        }
        onClick={() => {
          return append( {
            value: '',
          } );
        }}
      >
        Agregar anexo
      </Button>
    </div>
  );
}
