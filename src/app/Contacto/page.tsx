'use client';
import { ContactoForm, RawContactoFormValues } from '#@/lib/types/contacto';
import form from 'components/form/form.module.css';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import checkbox from 'components/form/checkbox/styles.module.css';
import { useContactContext } from '../context/main-context';
import layout from '#@/styles/layout.module.css';

export default function Page() {
  const {
    register, handleSubmit
  } = useForm<RawContactoFormValues>(
    {
      defaultValues: {
        nombre    : ' ',
        grupo     : 'otros',
        newsLetter: false,
        email     : ' ',
        telefono  : 1,
        comentario: 'Este es el espacio para registrar información adicional',
      },
    }
  );

  const {
    contactoForm, setContactoForm
  } = useContactContext();

  const onSubmit: SubmitHandler<RawContactoFormValues> = async (
    data
  ) => {
    const newData: ContactoForm = {
      ...data,
      telefono: Number(
        data.telefono
      ),
      fecha: new Date(),
    };
    setContactoForm(
      {
        ...contactoForm,
        ...newData,
      }
    );

    try {
      const postData = await fetch(
        '/api?destino=contacto', {
          method : 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            newData
          ),
        }
      );

      if ( !postData.ok ) {
        throw new Error(
          `${ postData.status }: ${ postData.statusText }`
        );
      }

      const msg = await postData.json();
      alert(
        JSON.stringify(
          msg
        )
      );

      console.log(
        `mensaje en app/Contacto/Page: ${ JSON.stringify(
          msg, null, 2
        ) }`

      );
    } catch ( e ) {
      alert(
        'se ha creado un error al enviar tu formulario, por favor verifica la información e intenta nuevamente',
      );
    }
  };

  return (
    <div className={form.container}>
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className={form.form}
      >
        <section className={layout.segmentRow}>
          <label
            htmlFor={'nombre'}
            className={form.label}
          >
            Nombre y Apellido
          </label>
          <input
            type="text"
            className={form.textArea}
            placeholder="Nombre y Apellido"
            {...register(
              'nombre', {
                required: true,
              }
            )}
          />
        </section>{' '}
        <section className={layout.segmentRow}>
          <label
            htmlFor={'email'}
            className={form.label}
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            className={form.textArea}
            placeholder="correo electrónico"
            {...register(
              'email', {
                required: false,
                pattern : /^\S+@\S+$/i,
              }
            )}
          />
        </section>
        <section className={layout.segmentRow}>
          <label
            htmlFor={'telefono'}
            className={form.label}
          >
            telefono de contacto
          </label>
          <input
            type="tel"
            className={form.textArea}
            placeholder="telefono de contacto"
            {...register(
              'telefono', {
                required: false,
              }
            )}
          />
        </section>
        <section className={layout.segmentRow}>
          <label
            htmlFor={'newsLetter'}
            className={form.label}
          >{`¿ Desea recibir noticias e
          informacion trimestral junto
          a la respuesta de su requerimiento ?`}</label>
          <section className={layout.segmentRow}>
            <p className={form.label}>Sí</p>
            <label className={checkbox.switchBox}>
              <input
                className={checkbox.inputElement}
                {...register(
                  'newsLetter'
                )}
                type="checkbox"
              />
              <span className={checkbox.slider}></span>
            </label>
          </section>
          <section className={layout.segmentRow}>
            <label
              htmlFor={'comentario'}
              className={form.label}
            >
              {'Escriba su informacion'}
            </label>
            <input
              type={'text'}
              className={form.textArea}
              {...register(
                'comentario', {
                  required: true,
                }
              )}
            />
          </section>
        </section>
        <select
          className={form.selectArea}
          {...register(
            'grupo', {
              required: true,
            }
          )}
        >
          <option value="Abogado">Abogado</option>
          <option value="Demandado">Demandado</option>
          <option value="Aliado">Aliado estratégico</option>
          <option value="otros">otros</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
}
