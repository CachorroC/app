'use client';
import { useCarpetaSort } from '#@/app/context/carpetas-sort-context';
import styles from 'components/Card/card.module.css';
import { Card } from '#@/components/Card';
import { fixFechas } from '#@/lib/project/helper';
import card from 'components/Card/card.module.css';
import typography from '#@/styles/fonts/typography.module.scss';


export default function CarpetasList(
  {
    path,
  }: {
  path: string;
}
) {


  const  carpetasReduced= useCarpetaSort();



  return <>

    { carpetasReduced.map(

      (
        proceso
      ) => {
        const {
          ultimaActuacion
        } = proceso;



        return (
          <Card key={ proceso._id } path={path} carpeta={ proceso } >
            { ultimaActuacion && (
              <div className={styles.section}>
                {ultimaActuacion.actuacion && (
                  <h5 className={` ${ card.actuacion } ${ typography.titleSmall }`}>
                    {`ultima actuacion registrada en el servidor: ${ ultimaActuacion.actuacion }`}                  </h5>
                )}
                {ultimaActuacion.anotacion && (
                  <p className={` ${ card.anotacion } ${ typography.labelSmall }`}>
                    {ultimaActuacion.anotacion}
                  </p>
                )}
                <sub className={card.date}>
                  {fixFechas(
                    ultimaActuacion.fechaActuacion
                  )}
                </sub>
              </div>
            )}
          </Card>
        );

      }
    )
    }</>;
}
