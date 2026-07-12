'use client';

import { FormProvider, useForm } from 'react-hook-form';
import type { MemorialTemplate } from '#@/memoriales/manifests/types';
import { buildSchema } from '#@/memoriales/lib/build-schema';
import { Fieldset } from '../fieldset';
import { SubmitBar } from '../submit-bar';
import { AutofillContextProvider, useAutofill } from './autofill-context';
import { assembleSubmitValues, defaultValuesForTemplate } from './values';
import styles from './memorial-form.module.css';

interface MemorialFormProps {
  template   : MemorialTemplate;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  onSubmit   : ( values: Record<string, unknown> ) => void | Promise<void>;
  disabled?  : boolean;
  submitLabel: string;
}

export function MemorialForm( {
  template,
  onSubmit,
  disabled = false,
  submitLabel,
}: MemorialFormProps ) {
  const methods = useForm( {
    defaultValues: defaultValuesForTemplate( template ),
  } );
  const autofill = useAutofill(
    template, methods 
  );

  async function handleValidSubmit( raw: Record<string, unknown> ) {
    const assembled = assembleSubmitValues(
      template, raw 
    );
    const parsed = buildSchema( template )
      .safeParse( assembled );

    if ( !parsed.success ) {
      let firstInvalidId: string | null = null;

      for ( const issue of parsed.error.issues ) {
        const path = issue.path.join( '.' );

        if ( !path ) {
          continue;
        }

        methods.setError(
          path, {
            type   : 'manual',
            message: issue.message,
          } 
        );

        if ( !firstInvalidId ) {
          firstInvalidId = `f-${ path }`;
        }
      }

      if ( firstInvalidId ) {
        const id = firstInvalidId;

        requestAnimationFrame( () => {
          return document.getElementById( id )
            ?.focus();
        } );
      }

      return;
    }

    await onSubmit( parsed.data );
  }

  return (
    <FormProvider {...methods}>
      <AutofillContextProvider value={autofill}>
        <form
          noValidate
          onSubmit={methods.handleSubmit( handleValidSubmit )}
          className={`${ styles.form } ${ disabled
            ? styles.formDisabled
            : '' }`}
        >
          {template.groups.map( ( group ) => {
            return (
              <Fieldset
                key={group.key ?? group.legend}
                group={group}
                pathPrefix={group.key}
                disabled={disabled}
              />
            );
          } )}
          <SubmitBar
            disabled={disabled}
            submitLabel={submitLabel}
            onReset={() => {
              autofill?.resetEdited();
              methods.reset( defaultValuesForTemplate( template ) );
            }}
          />
        </form>
      </AutofillContextProvider>
    </FormProvider>
  );
}
