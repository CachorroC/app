'use client';
import { useNuevaNotaContext } from '#@/app/Notas/nueva-nota-form-context';
import { ChangeEvent, useState } from 'react';
import styles from 'components/Form/form.module.css';

export const ParseContenidoArea = () => {

          const {
            notaFormState, setNotaFormState
          } = useNuevaNotaContext();

          const [ text, setText ] = useState<string>(
            notaFormState.content.join(
              '\n'
            )
          );

          const handleChange = (
            e: ChangeEvent<HTMLTextAreaElement>
          ) => {
                    const {
                      value
                    } = e.target;

                    setText(
                      value
                    );
                    setNotaFormState(
                      {
                        ...notaFormState,
                        content: value.split(
                          '\n'
                        )
                      }
                    );

          };

          return ( <>
            <label htmlFor='content'>Contenido</label>
            <textarea className={ styles.textArea } name='content' onChange={ handleChange } value={ text } />
          </> );
};
