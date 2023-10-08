'use client';
import { NuevaCarpeta } from '#@/lib/types/carpetas';
import {   SubmitHandler,

  useFormContext, } from 'react-hook-form';
import form from 'components/form/form.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { InputSection } from './InputSection';
import { SelectSection } from './SelectSection';
import { DateInputSection } from './DateInputSection';
import VencimientoPagareSection from './DateInputSection/vencimiento-pagare-section';


export default function NewNuevoProceso(
  {
    nextNumber
  }: {nextNumber: number}
) {

  const {
    setValue,
    handleSubmit,
  } = useFormContext<NuevaCarpeta>();
  setValue(
    'numero', nextNumber
  );

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
          <section className={ form.sectionRow }>
            <section className={ form.sectionRow }>

              <InputSection name={ 'numero' } title={ 'Número' } type={ 'number' } />
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

            </section>
            <section className={form.sectionColumn}>
              <h3 className={ typography.displaySmall }>{ 'Deudor' }</h3>

              <InputSection
                name={'deudor.primerNombre'}
                title={'Primer Nombre'}
                type={'text'}
              />
              <InputSection
                key={'segundoNombre'}
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
                  type={ 'tel' }
                  rls={{
                    required: false
                  }}
                />
                <InputSection
                  name={'deudor.tel.fijo'}
                  title={'fijo'}
                  type={ 'tel' }
                  rls={{
                    required: false
                  }}
                />
              </section>
            </section>


            <section className={ form.sectionColumn }>
              <h3 className={ typography.displaySmall }>{ 'Demanda' }</h3>
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
              <SelectSection name={ 'demanda.tipoProceso' } title={ 'Tipo de Proceso' } options={ [
                'SINGULAR',
                'HIPOTECARIO',
                'PRENDARIO',
                'ACUMULADO'
              ] } />

              <VencimientoPagareSection />
              <DateInputSection name={ 'demanda.fechaPresentacion' } title={ 'fecha de presentacion de la demanda' } />
            </section>
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

    </>
  );
}
