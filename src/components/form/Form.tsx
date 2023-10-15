'use client';
import form from 'components/form/form.module.css';
import { MonCarpeta } from '#@/lib/types/carpetas';
import React, { useEffect } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import typography from '#@/styles/fonts/typography.module.scss';
import { DateInputSection } from './date-section';
import ObligacionesComponent from './field-array-section';
import VencimientoPagareSection from './vencimiento-pagare-section';
import { divider } from '#@/app/Carpetas/@right/Nueva/styles.module.css';
import { InputSection } from './input-section';
import { SelectSection } from './select-section';
import { NumberSection } from './number-section';
import { IntCarpetaElementSchema } from '#@/lib/types/zod/carpeta';

export const Form = (
  {
    carpeta
  }: { carpeta: MonCarpeta }
) => {
  const {
    demanda, numero, category, tipoProceso, deudor
  } = carpeta;

  const {
    handleSubmit, reset, setError
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
      _id,
      ...mutated
    } = newCarpeta;

    const parsed = IntCarpetaElementSchema.safeParse(
      mutated
    );

    if ( !parsed.success ) {
      alert(
        JSON.stringify(
          parsed
        )
      );

      throw new Error(
        'error al hacer el parse'
      );
    }

    const postCarpeta = await fetch(
      `/api/Carpeta/${ numero }`, {
        method : 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          parsed.data
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
      `el estatus de la operacion post en Form arrojó: ${ postCarpeta.status }`
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
        <section className={ form.sectionColumn }>
          <SelectSection
            name={'category'}
            title={'Grupo al que pertenece'}
            initialValue={category}
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
            initialValue={tipoProceso}
            title={'Proceso del Tipo'}
            options={[
              'SINGULAR',
              'HIPOTECARIO',
              'PRENDARIO'
            ]}
          />

          <section className={form.sectionRow}>
            <NumberSection
              name={'numero'}
              title={'Numero'}
              rls={{
                required: true,
              }}
              type={'number'}
            />

            { deudor.cedula && (
              <NumberSection
                name={'deudor.cedula'}
                title={'Cédula de Ciudadanía'}
                type={'number'}
                rls={{
                  required: true,
                }}
              />
            )}
          </section>
          <section className={form.sectionRow}>
            <InputSection
              name={'deudor.primerNombre'}
              title={'Primer Nombre'}
              type={'text'}
              rls={{
                required: true,
              }}
            />
            <InputSection
              key={'segundoNombre'}
              name={'deudor.segundoNombre'}
              title={'Segundo Nombre'}
              type={'text'}
            />
          </section>
          <section className={form.sectionRow}>
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
            />
          </section>

          <section className={form.sectionRow}>
            <InputSection
              name={'deudor.direccion'}
              title={'Dirección'}
              type={'text'}
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
          </section>
          <section className={form.sectionRow}>
            <NumberSection
              name={'deudor.tel.celular'}
              title={'celular'}
              type={'tel'}
            />
            <NumberSection
              name={'deudor.tel.fijo'}
              title={'fijo'}
              type={'tel'}
            />

          </section>
        </section>
        <div className={divider}></div>
        <section className={form.sectionColumn}>
          <NumberSection
            name={'demanda.capitalAdeudado'}
            title={'Capital en mora'}
            type={'number'}
            rls={{
              required: true,
            }}
          />
          {demanda.departamento
            ? (
                <SelectSection
                  name={'demanda.departamento'}
                  options={[
                    'ARAUCA',
                    'ARMENIA',
                    'B/QUILLA',
                    'BOGOTÁ',
                    'B/MANGA',
                    'BOYACA',
                    'CALI',
                    'CARTAGENA',
                    'CÚCUTA',
                    'FLORENCIA',
                    'IBAGUÉ',
                    'LETICIA',
                    'MANIZALES',
                    'MEDELLÍN',
                    'MITÚ',
                    'MOCOA',
                    'MONTERÍA',
                    'NEIVA',
                    'PASTO',
                    'PEREIRA',
                    'POPAYÁN',
                    'P/CARREÑO',
                    'P/INÍRIDA',
                    'QUIBDÓ',
                    'RIOHACHA',
                    'SAN ANDRÉS',
                    'S/GUAVIARE',
                    'SANTA MARTA',
                    'SINCELEJO',
                    'TOLIMA',
                    'CUNDINAMARCA',
                    'TUNJA',
                    'V/DUPAR',
                    'V/VICENCIO',
                    'YOPAL',
                  ]}
                  title={'Departamento'}
                  initialValue={demanda.departamento}
                />
              )
            : (
                <SelectSection
                  name={'demanda.departamento'}
                  options={[
                    'ARAUCA',
                    'ARMENIA',
                    'B/QUILLA',
                    'BOGOTÁ',
                    'B/MANGA',
                    'BOYACA',
                    'CALI',
                    'CARTAGENA',
                    'CÚCUTA',
                    'FLORENCIA',
                    'IBAGUÉ',
                    'LETICIA',
                    'MANIZALES',
                    'MEDELLÍN',
                    'MITÚ',
                    'MOCOA',
                    'MONTERÍA',
                    'NEIVA',
                    'PASTO',
                    'PEREIRA',
                    'POPAYÁN',
                    'P/CARREÑO',
                    'P/INÍRIDA',
                    'QUIBDÓ',
                    'RIOHACHA',
                    'SAN ANDRÉS',
                    'S/GUAVIARE',
                    'SANTA MARTA',
                    'SINCELEJO',
                    'TOLIMA',
                    'CUNDINAMARCA',
                    'TUNJA',
                    'V/DUPAR',
                    'V/VICENCIO',
                    'YOPAL',
                  ]}
                  title={'Departamento'}
                />
              )}
          {demanda.entregaGarantiasAbogado
            ? (
                <DateInputSection
                  name={'demanda.entregaGarantiasAbogado'}
                  initialValue={demanda.entregaGarantiasAbogado}
                  title={'fecha de entrega de las garantias al abogado'}
                />
              )
            : (
                <DateInputSection
                  name={'demanda.entregaGarantiasAbogado'}
                  title={'fecha de entrega de las garantias al abogado'}
                />
              )}
          <InputSection
            name={'demanda.etapaProcesal'}
            title={'etapaprocesal'}
            type={'text'}
          />
          <InputSection
            name={'demanda.expediente'}
            title={'Expediente'}
            type={'text'}
          />
          {demanda.fechaPresentacion
            ? (
                <DateInputSection
                  name={'demanda.fechaPresentacion'}
                  initialValue={demanda.fechaPresentacion}
                  title={'fecha de presentacion de la demanda'}
                />
              )
            : (
                <DateInputSection
                  name={'demanda.fechaPresentacion'}
                  title={'fecha de presentacion de la demanda'}
                />
              )}

          <ObligacionesComponent />
          {demanda.vencimientoPagare
            ? (
                demanda.vencimientoPagare.map(
                  (
                    fechaVencimiento, index
                  ) => {
                    return (
                      <DateInputSection
                        key={index}
                        initialValue={fechaVencimiento}
                        name={`demanda.vencimientoPagare.${ index }`}
                        title={`Pagaré numero ${ index + 1 }`}
                      />
                    );
                  }
                )
              )
            : (
                <VencimientoPagareSection />
              )}
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
