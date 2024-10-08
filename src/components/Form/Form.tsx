'use client';

import { MonCarpeta } from '#@/lib/types/carpetas';
import { IntCarpetaElementSchema } from '#@/lib/types/zod/carpeta';
import { useFormContext, SubmitHandler } from 'react-hook-form';
import form from 'components/Form/form.module.css';
import { divider } from '#@/app/Carpetas/@right/Nueva/styles.module.css';
import { DateInputSection } from './date-section';
import { ObligacionesComponent } from './field-array-section';
import { InputSection } from './input-section';
import { NumberSection } from './number-section';
import { SelectSection } from './select-section';
import { VencimientoPagareSection } from './vencimiento-pagare-section';
import typography from '#@/styles/fonts/typography.module.css';
import { CheckboxHasProperty } from './checkboxHasProperty';
import { useCarpetaFormContext } from '../../app/Context/carpeta-form-context';

export const Form = () => {
  const {
    carpetaFormState 
  } = useCarpetaFormContext();

  const {
    demanda, numero, category, tipoProceso, deudor 
  } = carpetaFormState;

  const {
    handleSubmit, setError 
  } = useFormContext<MonCarpeta>();

  const onSubmit: SubmitHandler<MonCarpeta> = async ( data: MonCarpeta ) => {
    const newCarpeta = {
      ...carpetaFormState,
      ...data,
    };

    const parsed = IntCarpetaElementSchema.safeParse( newCarpeta );

    if ( !parsed.success ) {
      alert( JSON.stringify( parsed ) );

      throw new Error( 'error al hacer el parse' );
    }

    const postCarpeta = await fetch(
      `https://app.rsasesorjuridico.com/api/Carpeta/${ numero }`,
      {
        method : 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify( parsed.data ),
      },
    );

    alert( JSON.stringify(
      postCarpeta.status, null, 2 
    ) );

    if ( postCarpeta.status > 200 ) {
      setError(
        'root.serverError', {
          type: postCarpeta.statusText,
        } 
      );
    }

    const updatedCarpeta = ( await postCarpeta.json() ) as MonCarpeta;

    alert( JSON.stringify(
      updatedCarpeta, null, 2 
    ) );
    console.log( `el estatus de la operacion post en Form arrojó: ${ postCarpeta.status }`, );
  };

  return (
    <div className={form.container}>
      <form
        className={form.segmentColumn}
        onSubmit={handleSubmit( onSubmit )}
      >
        <section className={form.segmentColumn}>
          <section className={form.segmentRow}>
            <fieldset>
              <legend>Deudor</legend>
              <NumberSection
                name={'numero'}
                title={'Numero'}
                rls={{
                  required: true,
                }}
                type={'number'}
              />
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
            </fieldset>
          </section>

          <section className={form.segmentRow}>
            <SelectSection
              name={'tipoProceso'}
              initialValue={tipoProceso}
              title={'Proceso del Tipo'}
              options={[
                'SINGULAR',
                'HIPOTECARIO',
                'ACUMULADO',
                'PRENDARIO'
              ]}
            />
            {deudor?.cedula && (
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
          <section className={form.segmentRow}>
            <InputSection
              name={'deudor.primerNombre'}
              title={'Primer Nombre'}
              type={'text'}
              rls={{
                required: true,
              }}
            />
            {deudor?.segundoNombre && (
              <InputSection
                key={'segundoNombre'}
                name={'deudor.segundoNombre'}
                title={'Segundo Nombre'}
                type={'text'}
              />
            )}
          </section>
          <section className={form.segmentRow}>
            <InputSection
              name={'deudor.primerApellido'}
              title={'Primer Apellido'}
              type={'text'}
              rls={{
                required: true,
              }}
            />
            {deudor?.segundoApellido && (
              <InputSection
                name={'deudor.segundoApellido'}
                title={'Segundo Apellido'}
                type={'text'}
              />
            )}
          </section>

          <section className={form.segmentRow}>
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
          <section className={form.segmentRow}>
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
        <section className={form.segmentColumn}>
          <NumberSection
            name={'demanda.capitalAdeudado'}
            title={'Capital en mora'}
            type={'number'}
            rls={{
              required: true,
            }}
          />
          {demanda?.departamento
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
                    'ATLANTICO',
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
          {demanda?.entregaGarantiasAbogado
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
            name={'demanda.llaveProceso'}
            title={'Expediente'}
            type={'text'}
          />
          {demanda?.fechaPresentacion
            ? (
                demanda.fechaPresentacion.map( (
                  fechaP, index 
                ) => {
                  return (
                    <DateInputSection
                      key={index}
                      name={`demanda.fechaPresentacion.${ index }`}
                      initialValue={fechaP}
                      title={'fecha de presentacion de la demanda'}
                    />
                  );
                } )
              )
            : (
                <DateInputSection
                  key="newFechaPresentacion"
                  name={'demanda.fechaPresentacion.0'}
                  title={'fecha de presentacion de la demanda'}
                />
              )}

          <ObligacionesComponent />
          {demanda?.vencimientoPagare
            ? (
                demanda.vencimientoPagare.map( (
                  fechaVencimiento, index 
                ) => {
                  return (
                    <DateInputSection
                      key={index}
                      name={`demanda.vencimientoPagare.${ index }`}
                      title={`Pagaré numero ${ index + 1 }`}
                    />
                  );
                } )
              )
            : (
                <VencimientoPagareSection />
              )}
        </section>
        <section className={form.segmentRow}>
          <CheckboxHasProperty keyOfCarpeta={'fecha'} />
          <CheckboxHasProperty keyOfCarpeta={'llaveProceso'} />
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
