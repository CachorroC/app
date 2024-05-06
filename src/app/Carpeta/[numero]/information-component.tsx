
import { MonCarpeta } from '#@/lib/types/carpetas';
import typography from '#@/styles/fonts/typography.module.css';
import Link from 'next/link';
import layout from '#@/styles/layout.module.css';
import { JuzgadoComponent } from '#@/components/Proceso/juzgado-component';
import { Suspense } from 'react';
import { ProcesoCard } from '#@/components/Proceso/server-components';
import { Route } from 'next';
import button from '#@/components/Buttons/buttons.module.css';
import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { ChipButton } from '#@/components/Chip';
import chip from '#@/components/Chip/styles.module.css';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import MoneyFixer from '#@/lib/project/money-fixer';
import { Loader } from '#@/components/Loader/main-loader';

export default function InformationComponent(
  {
    carpeta,
  }: {
    carpeta: MonCarpeta;
  }
) {
      const {
        deudor,
        demanda,
        category,
        tipoProceso,
        procesos,
        numero,
        fecha,
        llaveProceso,
      } = carpeta;

      let content;

      if ( procesos.length > 0 ) {
        content
    = procesos.map(
            (
              proceso
            ) => {
                      const {
                        idProceso, juzgado
                      } = proceso;

                      return (

                        <ProcesoCard
                          key={idProceso}
                          proceso={proceso}
                        >
                          <div className={layout.segmentColumn}>
                            <JuzgadoComponent
                              key={juzgado.url}
                              juzgado={juzgado}
                            />

                            <Link
                              key={idProceso}
                              className={button.buttonPassiveCategory}
                              href={
                                `/Carpeta/${ numero }/ultimasActuaciones/${ idProceso }` as Route
                              }
                            >
                              <span
                                className={`material-symbols-outlined ${ button.icon }`}
                              >
              description
                              </span>
                              <span className={button.text}>
              Todas las actuaciones de este juzgado
                              </span>
                            </Link>
                          </div>
                          <Suspense fallback={<Loader />}>
                            <FechaActuacionComponent
                              key={idProceso}
                              idProceso={idProceso}
                            />
                          </Suspense>
                        </ProcesoCard>
                      );
            }
          );
      } else {
        content = <p>no hay procesos</p>;
      }

      return (
        <>
          {content}
          <div className={layout.sectionColumn}>
            <h2 className={typography.titleMedium}>{`Carpeta número ${ numero }`}</h2>
            {fecha && (
              <OutputDateHelper incomingDate={ fecha}  />
            )}
            <div className={layout.segmentColumn}>
              <div className={layout.segmentRowWrap}>
                <ChipButton
                  copyTxt={category}
                  icon={'category'}
                  name={'categoria'}
                />
                <ChipButton
                  copyTxt={tipoProceso}
                  icon={'checklist'}
                  name={'tipo de proceso'}
                />

                {deudor && (
                  <ChipButton
                    copyTxt={deudor.cedula}
                    icon={'how_to_reg'}
                    name={'cedula'}
                  />
                )}
                {demanda && (
                  <ChipButton
                    copyTxt={demanda.radicado ?? 'sin radicado'}
                    name={'radicado'}
                    icon={'description'}
                  />
                )}

                {deudor?.email && (
                  <Link
                    className={chip.chip}
                    href={`mailto:${ deudor.email }`}
                    target={'_blank'}
                  >
                    <span className={`material-symbols-outlined ${ chip.icon }`}>
                  mail
                    </span>
                    <span className={`${ typography.labelMedium } ${ chip.text }`}>
                      {'Correo Electrónico'}
                    </span>
                  </Link>
                )}
                {deudor?.telCelular && (
                  <Link
                    key={deudor.telCelular}
                    className={chip.chip}
                    target={'_blank'}
                    href={`tel:${ deudor.telCelular }`}
                  >
                    <span className={`material-symbols-outlined ${ chip.icon }`}>
                  phone_iphone
                    </span>
                    <span className={`${ typography.labelMedium } ${ chip.text }`}>
                      {deudor.telCelular}
                    </span>
                  </Link>
                )}
                {deudor?.telFijo && (
                  <Link
                    key={deudor.telFijo}
                    className={chip.chip}
                    href={`tel:${ deudor.telFijo }`}
                  >
                    <span className={`material-symbols-outlined ${ chip.icon }`}>
                  call
                    </span>
                    <span className={`${ typography.labelMedium } ${ chip.text }`}>
                      {deudor.telFijo}
                    </span>
                  </Link>
                )}
                <ChipButton
                  copyTxt={llaveProceso}
                  icon={'vpn_key'}
                  name={'expediente'}
                />
              </div>
            </div>
          </div>

          {demanda?.vencimientoPagare && (
            <>
              <h4 className={typography.titleSmall}>Pagarés</h4>
              {demanda.vencimientoPagare.map(
                (
                  pagare, index
                ) => {
                          return (
                            <OutputDateHelper incomingDate={ pagare }  key={index}/>
                          );
                }
              )}
            </>
          )}

          {demanda?.entregaGarantiasAbogado && (
            <OutputDateHelper incomingDate={demanda.entregaGarantiasAbogado }  />
          )}

          {demanda?.capitalAdeudado
        && <MoneyFixer valor={ Number(
          demanda.capitalAdeudado
        ) } className={ typography.labelSmall } />}
        </>
      );
}
