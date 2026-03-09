'use client';
import { ChangeEvent, useState } from 'react';
import { useNuevaNotaContext } from './nueva-nota-form-context';

export const ParseContentNota = ( {
  value = [] 
}: { value: string[] } ) => {
  const [
    text,
    setText
  ] = useState<string>( value.join( '\n' ) );

  const {
    notaFormState, setNotaFormState 
  } = useNuevaNotaContext();

  const handleChange = ( e: ChangeEvent<HTMLTextAreaElement> ) => {
    const {
      value 
    } = e.target;

    setText( value );
    setNotaFormState( {
      ...notaFormState,
      content: value.split( '\n' ),
    } );
  };

  return (
    <textarea
      onChange={handleChange}
      name={'content'}
      value={text}
    />
  );
};
