'use client';
import { NuevaCarpeta } from '#@/lib/types/carpetas';
import {   SubmitHandler,
  useFieldArray,
  useFormContext, } from 'react-hook-form';
import form from 'components/form/form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { InputSection } from './InputSection';
import { SelectSection } from './SelectSection';
import { DateInputSection } from './DateInputSection';
import { useCarpetaFormContext } from '#@/app/context/carpeta-form-context';



export default function NewNuevoProceso(
  {
    nextNumber
  }: {nextNumber: number}
) {

  const {
    setValue,
    handleSubmit,
    formState: {
      errors,
      dirtyFields,
      submitCount,
      isSubmitting,
      isSubmitSuccessful,
      isLoading
    }
  } = useFormContext<NuevaCarpeta>();
  setValue(
    'numero', nextNumber
  );

  const {
    nuevaCarpeta, setNuevaCarpeta
  } = useCarpetaFormContext();

  const onSubmit: SubmitHandler<NuevaCarpeta> = async (
    data
  ) => {
    alert(
      JSON.stringify(
        data
      )
    );

    const newCarpeta: NuevaCarpeta = {
      ...data
    };

    const postNewNote = await fetch(
      '/api/Carpetas/Nueva', {
        method : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          newCarpeta
        ),
      }
    );



    const nAlert = await postNewNote.json();

    alert(
      JSON.stringify(
        nAlert
      )
    );
  };

  return (
    <>
      <div className={form.container}>
        <form
          className={form.form}
          onSubmit={handleSubmit(
            onSubmit
          )}
        >
          <section className={form.section}>
            <section className={form.section}>
              <h3 className={ typography.displaySmall }>{ 'Deudor' }</h3>
              <InputSection name={ 'numero' } title={ 'Carpeta número' } type={ 'number' } />
              <input type='number' name='numero' defaultValue={nextNumber} />
              <InputSection
                name={'deudor.primerNombre'}
                title={'Primer Nombre'}
                type={'text'}
              />
              <InputSection
                key={'deudor.segundoNombre'}
                name={'deudor.segundoNombre'}
                title={'Segundo Nombre'}
                type={'text'}
                rls={{
                  required: false,
                }}
              />
              <InputSection
                name={'deudor.primerApellido'}
                title={'Primer Apellido'}
                type={'text'}
              />
              <InputSection
                name={'deudor.segundoApellido'}
                title={'Segundo Apellido'}
                type={'text'}
                rls={{
                  required: false,
                }}
              />
              <InputSection
                name={'deudor.cedula'}
                title={'Cédula de Ciudadanía'}
                type={'number'}
              />
              <InputSection
                name={'deudor.direccion'}
                title={'Dirección'}
                type={'textarea'}
                rls={{
                  required: false,
                }}
              />
              <InputSection
                name={'deudor.email'}
                title={'Correo Electrónico'}
                type={'email'}
                rls={{
                  required: false,
                  pattern : /^\S+@\S+$/i,
                }}
              />
              <section className={form.section}>
                <InputSection
                  name={'deudor.tel.celular'}
                  title={'celular'}
                  type={'tel'}
                />
                <InputSection
                  name={'deudor.tel.fijo'}
                  title={'fijo'}
                  type={'tel'}
                />
              </section>
            </section>


            <SelectSection
              name={'category'}
              title={'Grupo al que pertenece'}
              options={[
                'Bancolombia',
                'Insolvencia',
                'Reintegra',
                'LiosJuridicos',
                'Terminados',
              ]}
            />

            <section className={form.section}>
              <InputSection
                name={'demanda.capitalAdeudado'}
                title={'Capital Adeudado'}
                type={'number'}
                rls={{
                  required: true,
                }}
              />
              <DateInputSection name={ 'demanda.entregaGarantiasAbogado' } title={ 'entrega de garantias' } />

              <InputSection
                name={'demanda.obligacion.A'}
                title={'Obligacion'}
                type={'text'}
              />
              <InputSection
                name={'demanda.obligacion.B'}
                title={'Obligacion'}
                type={'text'}
              />

              <VencimientoPagareSection />
            </section>
          </section>
          <button
            type="submit"
            className={form.button}
          >
            <sub className={typography.labelSmall}>Enviar</sub>
            <span className="material-symbols-outlined">send</span>
          </button>
          <section className={form.section}>
            <section className={form.section}>
              <pre>
                {JSON.stringify(
                  {
                    errors,
                  },
                  null,
                  2,
                )}
              </pre>
            </section>
            <section className={form.section}>
              <pre>
                {JSON.stringify(
                  {
                    dirtyFields,
                  },
                  null,
                  2,
                )}
              </pre>
            </section>
            <section className={form.section}>
              <pre>
                {JSON.stringify(
                  {
                    submitCount,
                  },
                  null,
                  2,
                )}
              </pre>
            </section>
            <section className={form.section}>
              <pre>
                {JSON.stringify(
                  {
                    isSubmitting,
                  },
                  null,
                  2,
                )}
              </pre>
            </section>
            <section className={form.section}>
              <pre>
                {JSON.stringify(
                  {
                    isSubmitSuccessful,
                  },
                  null,
                  2,
                )}
              </pre>
            </section>
            <section className={form.section}>
              <pre>
                {JSON.stringify(
                  {
                    isLoading,
                  },
                  null,
                  2,
                )}
              </pre>
            </section>

          </section>
        </form>
      </div>

    </>
  );
}



export function VencimientoPagareSection () {

  const {
    control, register, getValues, setValue
  } = useFormContext();

  const {
    fields, append, remove, prepend
  } = useFieldArray(
    {
      control,
      name: 'demanda.vencimientoPagare'
    }
  );
  return (
    <>
      <ul>
        {fields.map(
          (
            item, index
          ) => {
            return (
              <li key={item.id}>
                <input type='date' {...register(
                  `demanda.vencimientoPagare.${ index }`
                )} />

                <button type="button" onClick={() => {
                  return remove(
                    index
                  );
                }}>
                Delete
                </button>
              </li>
            );
          }
        )}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append(
              {
                name: 'append'
              }
            );
          }}
        >
          append
        </button>

        <button
          type="button"
          onClick={() => {
            setValue(
              'test', [
                ...( getValues().test || [] ),
                {
                  name       : 'append',
                  nestedArray: [
                    {
                      field1: 'append',
                      field2: 'append'
                    }
                  ]
                }
              ]
            );
          }}
        >
          Append Nested
        </button>

        <button
          type="button"
          onClick={() => {
            prepend(
              {
                name: 'append'
              }
            );
          }}
        >
          prepend
        </button>

        <button
          type="button"
          onClick={() => {
            setValue(
              'test', [
                {
                  name       : 'append',
                  nestedArray: [
                    {
                      field1: 'Prepend',
                      field2: 'Prepend'
                    }
                  ]
                },
                ...( getValues().test || [] )
              ]
            );
          }}
        >
          prepend Nested
        </button>
      </section>

    </>

  );
}