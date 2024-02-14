import { fixFechas, fixMoney } from '#@/lib/project/helper';
import { MonCarpeta } from '#@/lib/types/carpetas';
import typography from '#@/styles/fonts/typography.module.css';
import Link from 'next/link';
import layout from '#@/styles/layout.module.css';
import { JuzgadoComponent } from '#@/components/Proceso/juzgado-component';
import { Loader } from '#@/components/Loader';
import { Suspense } from 'react';
import { ProcesoCard } from '#@/components/Proceso/server-components';
import { Route } from 'next';
import button from '#@/components/Buttons/buttons.module.css';
import ActuacionLoader from '#@/components/Card/actuacion-loader';
import { FechaActuacionComponent } from '#@/app/Carpetas/UltimasActuaciones/actuaciones';
import { ChipButton } from '#@/components/Chip';
import chip from '#@/components/Chip/styles.module.css';
import { ProcesoCardLoader } from '#@/components/Proceso/proceso-card-loader';

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

      return (
        <>
          {procesos.length > 0
        && procesos.map(
          (
            proceso 
          ) => {
                    const {
                      sujetosProcesales, idProceso 
                    } = proceso;

                    const mapperObject = new Map();

                    const newSujetos = sujetosProcesales.split(
                      '|' 
                    );

                    for ( const demandadoODemandante of newSujetos ) {
                      const splitter = demandadoODemandante.split(
                        ':' 
                      );
                      console.log(
                        splitter 
                      );

                      const fixer = splitter.map(
                        (
                          value 
                        ) => {
                                  return value.trim();
                        } 
                      );
                      mapperObject.set(
                        fixer[ 0 ], fixer[ 1 ] 
                      );
                    }

                    return (
                      <Suspense
                        fallback={<ProcesoCardLoader />}
                        key={idProceso}
                      >
                        <ProcesoCard
                          key={proceso.idProceso}
                          proceso={proceso}
                        >
                          <div className={layout.segmentColumn}>
                            <Suspense fallback={<Loader />}>
                              <JuzgadoComponent
                                key={proceso.juzgado.url}
                                juzgado={proceso.juzgado}
                              />
                            </Suspense>

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
                          <Suspense fallback={<ActuacionLoader />}>
                            <FechaActuacionComponent
                              key={idProceso}
                              idProceso={idProceso}
                              index={numero}
                            />
                          </Suspense>
                        </ProcesoCard>
                      </Suspense>
                    );
          } 
        )}
          <div className={layout.sectionColumn}>
            <h2 className={typography.titleMedium}>{`Carpeta número ${ numero }`}</h2>
            {fecha && (
              <h5 className={typography.labelLarge}>{`actualizado el ${ fixFechas(
                fecha,
              ) }`}</h5>
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
                            <p
                              key={index}
                              className={typography.labelMedium}
                            >
                              {fixFechas(
                                pagare 
                              )}
                            </p>
                          );
                } 
              )}
            </>
          )}

          {demanda?.entregaGarantiasAbogado && (
            <p className={typography.labelSmall}>
              {fixFechas(
                demanda.entregaGarantiasAbogado 
              )}
            </p>
          )}

          {demanda?.capitalAdeudado
        && fixMoney(
          {
            valor: Number(
              demanda.capitalAdeudado 
            ),
          } 
        )}
        </>
      );
}
