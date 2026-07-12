'use client';

import { useEffect, useState } from 'react';
import { getCarpetasLookup } from '#@/memoriales/actions/get-carpetas-lookup';
import type { CarpetaLookup } from './carpeta-lookup';

let cachedPromise: Promise<CarpetaLookup[]> | null = null;

function fetchCarpetasLookup(): Promise<CarpetaLookup[]> {
  cachedPromise ??= getCarpetasLookup();

  return cachedPromise;
}

interface UseCarpetasLookupResult {
  data   : CarpetaLookup[];
  loading: boolean;
}

/** Fetches (and session-caches) the debtor-name lookup list. No-op while `enabled` is false. */
export function useCarpetasLookup( enabled: boolean ): UseCarpetasLookupResult {
  const [
    data,
    setData
  ] = useState<CarpetaLookup[]>( [] );
  const [
    loading,
    setLoading
  ] = useState( false );

  useEffect(
    () => {
      if ( !enabled ) {
        return undefined;
      }

      let cancelled = false;

      setLoading( true );
      fetchCarpetasLookup()
        .then( ( result ) => {
          if ( !cancelled ) {
            setData( result );
          }
        } )
        .catch( () => {
          if ( !cancelled ) {
            setData( [] );
          }
        } )
        .finally( () => {
          if ( !cancelled ) {
            setLoading( false );
          }
        } );

      return () => {
        cancelled = true;
      };
    }, [
      enabled
    ] 
  );

  return {
    data,
    loading,
  };
}
