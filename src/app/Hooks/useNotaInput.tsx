import { useState } from 'react';

export function useFormInput( initialValue: string ) {
  const [
    value,
    setValue
  ] = useState( initialValue );

  function handleChange( e: any ) {
    setValue( e.target.value );
  }

  const inputProps = {
    value   : value,
    onChange: handleChange,
  };

  return inputProps;
}
