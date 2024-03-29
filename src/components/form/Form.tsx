'use client';
import { InputSection } from 'components/form/InputSection';
import { SelectSection } from 'components/form/SelectSection';
import form from 'components/form/form.module.css';
import {   MonCarpeta } from '#@/lib/types/carpetas';
import React, { useEffect } from 'react';
import { SubmitHandler,
  useFormContext, } from 'react-hook-form';
import typography from '#@/styles/fonts/typography.module.scss';
import { DateInputSection } from './DateInputSection';

export const Form = (
  {
    carpeta
  }: { carpeta: MonCarpeta }
) => {
  const {
    handleSubmit,
    reset,
    setError,
  } = useFormContext<MonCarpeta>();

  const onSubmit: SubmitHandler<MonCarpeta> = async (
    data: MonCarpeta
  ) => {
    const newCarpeta = {
      ...carpeta,
      ...data,
    };

    const {
      // eslint-disable-next-line no-unused-vars
      _id, ...mutated
    } = newCarpeta;

    const postCarpeta = await fetch(
      '/api/Carpetas', {
        method : 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          mutated
        ),
      }
    );
    alert(
      JSON.stringify(
        postCarpeta.status
      )
    );

    if ( postCarpeta.status > 200 ) {
      setError(
        'root.serverError', {
          type: postCarpeta.statusText,
        }
      );
    }

    const updatedCarpeta = ( await postCarpeta.json() ) as MonCarpeta;
    alert(
      JSON.stringify(
        updatedCarpeta
      )
    );
    console.log(
      postCarpeta.status
    );
  };

  useEffect(
    () => {
      reset(
        carpeta
      );
    }, [
      reset,
      carpeta
    ]
  );

  return (

    <div className={form.container}>
      <form
        className={form.form}
        onSubmit={handleSubmit(
          onSubmit
        )}
      >

        <section className={form.section}>
          <h3 className={typography.displaySmall}>{'Deudor'}</h3>
          <InputSection
            name={'deudor.primerNombre'}
            title={'Primer Nombre'}
            type={'text'}
            rls={{
              required: true,
            }}
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
            rls={{
              required: true,
            }}
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
            rls={{
              required: true,
            }}
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

        <InputSection
          name={'numero'}
          title={'Carpeta Numero'}
          rls={{
            required: true,
          }}
          type={'number'}
        />
        <InputSection
          name={'llaveProceso'}
          title={'Expediente'}
          rls={{
            required: true,
            pattern : /\d{23}/g,
          }}
          type={'text'}
        />

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

        <SelectSection
          name={'tipoProceso'}
          title={'Proceso del Tipo'}
          options={[
            'SINGULAR',
            'HIPOTECARIO',
            'PRENDARIO'
          ]}
        />
        <section className={form.section}>
          <InputSection
            name={'demanda.radicado'}
            title={'Radicado'}
            type={'text'}
            rls={{
              required: true,
              pattern : /\d{4}\s-\s\d{5}/g,
            }}
          />
          <InputSection
            name={'demanda.capitalAdeudado'}
            title={'Capital Adeudado'}
            type={'number'}
            rls={{
              required: true,
            }}
          />
          <InputSection
            name={'demanda.entregagarantiasAbogado'}
            title={'Entrega de Garantias'}
            type={'date'}
          />
          {carpeta.demanda.entregagarantiasAbogado && ( <DateInputSection name={ 'demanda.entregagarantiasAbogado'} initialValue={carpeta.demanda.entregagarantiasAbogado} title={'fecha de entrega de las garantias al abogado'}/> )}
          <InputSection
            name={'demanda.etapaProcesal'}
            title={'etapa procesal'}
            type={'text'}
          />
          <InputSection
            name={'demanda.fechaPresentacion'}
            title={'fecha de presentacion de la demanda'}
            type={'date'}
          />
          {carpeta.demanda.fechaPresentacion && ( <DateInputSection name={ 'demanda.fechaPresentacion' }initialValue={
            carpeta.demanda.fechaPresentacion
          } title={'fecha de presentacion de la demanda'}/> )}
          <InputSection
            name={'demanda.municipio'}
            title={'Municipio'}
            type={'textarea'}
          />
          <InputSection
            name={'demanda.obligacion.1'}
            title={'Obligacion'}
            type={'text'}
          />
          <InputSection
            name={'demanda.obligacion.2'}
            title={'Obligacion'}
            type={'text'}
          />
          <InputSection
            name={'demanda.vencimientoPagare'}
            title={'Vencimiento del pagaré'}
            type={'date'}
          />
        </section>

        <button
          type="submit"
          className={form.button}
        >
          <sub className={typography.labelSmall}>Enviar</sub>
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>

  );
};
