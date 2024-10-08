import { useCallback, useEffect, useState } from 'react';

export function useMediaQuery( query: string ): boolean {
  const getMatches = ( query: string ): boolean => {
    //NOTE: Prevents SSR issues
    if ( typeof window !== 'undefined' ) {
      return window.matchMedia( query ).matches;
    }

    return false;
  };

  const [
    matches,
    setMatches
  ] = useState<boolean>( getMatches( query ) );

  /*   function handleChange() {
    setMatches(
      getMatches(
        query
      )
    );
  }
 */
  const handleChange = useCallback(
    () => {
      setMatches( getMatches( query ) );
    }, [
      query
    ] 
  );

  useEffect(
    () => {
      const matchMedia = window.matchMedia( query );

      //NOTE: Triggered at the first client-side load and if query changes
      handleChange();
      matchMedia.addEventListener(
        'change', handleChange 
      );

      return () => {
        matchMedia.removeEventListener(
          'change', handleChange 
        );
      };
    }, [
      handleChange,
      query
    ] 
  );

  return matches;
}
