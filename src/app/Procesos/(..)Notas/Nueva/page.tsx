'use client';
import { createNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import form from 'components/form/form.module.css';
import ModalDialog from '#@/lib/hooks/modal-state';

export default function Page() {
  const [
    message,
    setMessage
  ] = useState<string>(
    ''
  );

  const {
    inputNota, setInputNota
  } = useNotaContext();

  async function onCreate(
    formData: FormData
  ) {
    const res = await createNota(
      formData
    );
    setMessage(
      res.message
    );
  }

  const pathname = usePathname();

  return (
    <ModalDialog>

      <form className={form.form} action={onCreate}>
        <input type="text" name="llaveProceso" value={ inputNota.llaveProceso } onChange={
          (
            e
          ) => {
            setInputNota(
              {
                ...inputNota,
                llaveProceso: e.target.value
              }
            );
          }
        }
        />
        <input type="text" name="nota" value={inputNota.nota} onChange={(
          e
        ) => {
          setInputNota(
            {
              ...inputNota,
              nota: e.target.value
            }
          );
        }}/>
        <input type="date" name="fecha" value={inputNota.fecha} onChange={(
          e
        ) => {
          setInputNota(
            {
              ...inputNota,
              fecha: e.target.value
            }
          );
        }}/>
        <input type='text' name='pathname' defaultValue={ pathname } />



        <button type="submit">Add</button>
        <p>{message}</p>
      </form>
    </ModalDialog>
  );
}