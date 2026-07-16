'use client';

import { createContext, useCallback, useContext, useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { MemorialTemplate } from '#@/memoriales/manifests/types';
import type { CarpetaLookup } from '#@/memoriales/lib/carpeta-lookup';
import { useCarpetasLookup } from '#@/memoriales/lib/use-carpetas-lookup';
import { getPath } from '#@/memoriales/lib/get-path';

/**
 * Shape of the memorial-form autofill context — the manifest's designated
 * lookup trigger field, the fetched lookup `options`, their `loading` state,
 * `applyCarpeta` to push a selected case folder's data into the form,
 * `notifyManualEdit` to mark a field as user-edited (so autofill won't
 * overwrite it), and `resetEdited` to clear that edited-set on form reset.
 */
export interface AutofillContextValue {
  triggerField    : string;
  options         : CarpetaLookup[];
  loading         : boolean;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  applyCarpeta    : ( carpeta: CarpetaLookup ) => void;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  notifyManualEdit: ( path: string ) => void;
  resetEdited     : () => void;
}

/** React context carrying the active `AutofillContextValue`, or `null` when the template has no autofill config. */
const AutofillContext = createContext<AutofillContextValue | null>( null );

/** Reads the current `AutofillContextValue`; returns `null` when no `AutofillContextProvider` is active or the template has no autofill config. */
export function useAutofillContext(): AutofillContextValue | null {
  return useContext( AutofillContext );
}

/** Re-export of `AutofillContext.Provider`, used by `MemorialForm` to expose the autofill state to its fields. */
export const AutofillContextProvider = AutofillContext.Provider;

/** No-ops when the template has no `autofill` config, so callers can always read the context safely. */
export function useAutofill(
  template: MemorialTemplate,
  methods: UseFormReturn<Record<string, unknown>>,
): AutofillContextValue | null {
  const {
    autofill 
  } = template;
  const enabled = !!autofill;
  const {
    data, loading 
  } = useCarpetasLookup( enabled );
  const editedRef = useRef<Set<string>>( new Set() );

  const notifyManualEdit = useCallback(
    ( path: string ) => {
      editedRef.current.add( path );
    }, [] 
  );

  const resetEdited = useCallback(
    () => {
      editedRef.current.clear();
    }, [] 
  );

  const applyCarpeta = useCallback(
    ( carpeta: CarpetaLookup ) => {
      if ( !autofill ) {
        return;
      }

      for ( const [
        formPath,
        sourcePath
      ] of Object.entries( autofill.fieldMap ) ) {
        if ( editedRef.current.has( formPath ) ) {
          continue;
        }

        const value = getPath(
          carpeta as unknown as Record<string, unknown>,
          sourcePath,
        );

        if ( value === undefined || value === null || value === '' ) {
          continue;
        }

        methods.setValue(
          formPath, value, {
            shouldDirty: true,
          } 
        );
      }
    },
    [
      autofill,
      methods
    ],
  );

  if ( !autofill ) {
    return null;
  }

  return {
    triggerField: autofill.triggerField,
    options     : data,
    loading,
    applyCarpeta,
    notifyManualEdit,
    resetEdited,
  };
}
