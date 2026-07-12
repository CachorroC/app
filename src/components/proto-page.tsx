import fetchActuaciones from '#@/lib/project/utils/Actuaciones';
import { getTop5LatestActuaciones } from '#@/lib/project/utils/Actuaciones/get-5-latest';
import { IntCarpeta } from '#@/lib/types/carpetas';
import { appContainer,
  chip,
  dashboardGrid,
  filled,
  headerCard,
  headerInfo,
  headerMeta,
  statusTerminado,
  timeline, } from '#@/styles/proto-styles.module.css';
import { Suspense } from 'react';
import { Loader } from './Loader/main-loader';
import { Card } from './Proto/card';
import CardHeader from './Proto/card-header';
import DataRow from './Proto/data-row';
import TimelineItem from './Proto/timeline-item';
import TaskRow from './Proto/task-row';
import { fetchNotasByNumero } from '#@/lib/project/utils/Notas/fetcher';

async function ActuacionesList( {
  idProceso,
  carpetaNumero,
}: {
  idProceso    : string;
  carpetaNumero: number;
} ) {
  const actuaciones = await fetchActuaciones(
    idProceso, carpetaNumero 
  );
  const fiveLatest = getTop5LatestActuaciones( actuaciones );

  return (
    <div className={timeline}>
      {fiveLatest.map( (
        act, index 
      ) => {
        if ( index >= 1 ) {
          return (
            <TimelineItem
              key={act.idRegActuacion}
              date={act.fechaActuacion}
              contentTitle={act.actuacion}
              contentStyle={{
                backgroundColor: 'var(--surface-variant)',
                color          : 'var(--on-surface-variant)',
              }}
              contentDescription={act.anotacion}
            />
          );
        }

        return (
          <TimelineItem
            key={act.idRegActuacion}
            date={act.fechaActuacion}
            contentTitle={act.actuacion}
            contentDescription={act.anotacion}
          />
        );
      } )}
    </div>
  );
}

async function NotesList( {
  idCarpeta 
}: { idCarpeta: number } ) {
  const notas = await fetchNotasByNumero( idCarpeta );

  return notas.map( ( nota ) => {
    return (
      <TaskRow
        key={nota.id}
        title={nota.text}
        dueDate={nota.dueDate}
        completed={nota.completed}
      />
    );
  } );
}

export default function ProtoPage( {
  carpeta 
}: { carpeta: IntCarpeta } ) {
  return (
    <>
      <div className={appContainer}>
        <header className={headerCard}>
          <div className={headerInfo}>
            <div
              style={{
                fontSize     : '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom : '8px',
              }}
            >
              Carpeta #{carpeta.numero}
            </div>
            <h1>{carpeta.nombre}</h1>
            <p>Llave Proceso: {carpeta.llaveProceso}</p>

            <div className={headerMeta}>
              <span className={`${ chip } ${ filled }`}>{carpeta.category}</span>
              <span className={chip}>{carpeta.tipoProceso}</span>
              <span
                className={`${ chip } ${ carpeta.category === 'Terminados' && statusTerminado }`}
              >
                {carpeta.category === 'Terminados'
                  ? 'Finalizado'
                  : 'En Proceso'}
              </span>
            </div>
          </div>

          <div
            style={{
              textAlign: 'right',
            }}
          >
            <p
              style={{
                fontSize: '0.8rem',
                opacity : 0.8,
              }}
            >
              Última actualización
            </p>
            <strong>{carpeta.fecha?.toLocaleDateString( 'es-ES' )}</strong>
          </div>
        </header>

        <div className={dashboardGrid}>
          <div
            style={{
              display      : 'flex',
              flexDirection: 'column',
              gap          : '24px',
            }}
          >
            <Card>
              <CardHeader
                title={'Deudor Principal'}
                icon={'👤'}
              />
              <DataRow
                label={'Nombre'}
                value={carpeta.nombre}
              />
              <DataRow
                label={'Cédula'}
                value={carpeta.deudor?.cedula}
              />
              <DataRow
                label={'Teléfono'}
                value={carpeta.deudor?.telCelular}
              />
              <DataRow
                label={'Email'}
                value={carpeta.deudor?.email}
              />
            </Card>

            <Card>
              <CardHeader
                title={'Detalles Judiciales'}
                icon={'⚖️'}
              />
              <DataRow
                label={'Juzgado'}
                value={`JUZGADO ${ carpeta.juzgado?.id } ${ carpeta.juzgado?.tipo } DE ${ carpeta.juzgado?.ciudad }`}
              />
              <DataRow
                label={'Ciudad'}
                value={carpeta.demanda.departamento}
              />
              <DataRow
                label={'Radicado'}
                value={carpeta.demanda.radicado}
              />
              <DataRow
                label={'Capital Adeudado'}
                value={carpeta.demanda.capitalAdeudado}
                money={true}
              />
            </Card>

            <Card>
              <CardHeader
                title={'Tareas Pendientes'}
                icon={'✅'}
              />
              <Suspense fallback={<Loader />}>
                <NotesList idCarpeta={carpeta.numero} />
              </Suspense>
            </Card>
          </div>

          <div
            style={{
              display      : 'flex',
              flexDirection: 'column',
              gap          : 24,
            }}
          >
            <Card
              style={{
                backgroundColor: 'var(--tertiary-container)',
                color          : 'var(--on-tertiary-container)',
              }}
            >
              <CardHeader
                title={'Facturación'}
                icon={'💲'}
              />
              <DataRow
                style={{
                  borderColor: 'rgba(0,0,0,0.1)',
                }}
                labelStyle={{
                  color  : 'inherit',
                  opacity: 0.8,
                }}
                label={'Capital Adeudado'}
                value={carpeta.demanda.capitalAdeudado}
                money={true}
              />
            </Card>

            <Card>
              <Suspense
                fallback={
                  <>
                    <CardHeader
                      title={'Cargando Actuaciones'}
                      icon={'cached'}
                    />{' '}
                    <Loader />
                  </>
                }
              >
                <CardHeader
                  title="Actuaciones Recientes"
                  icon="📅"
                />
                {carpeta.idProcesos
                  && carpeta.idProcesos.map( ( idProceso ) => {
                    return (
                      <ActuacionesList
                        key={idProceso}
                        idProceso={idProceso}
                        carpetaNumero={carpeta.numero}
                      />
                    );
                  } )}
              </Suspense>
            </Card>

            <Card
              style={{
                borderStyle: 'dashed',
              }}
            >
              <CardHeader
                title={'Notas Rápidas'}
                icon={'note'}
                titleStyle={{
                  fontSize: '1rem',
                }}
              />
              <p
                style={{
                  fontSize: '0.9rem',
                  color   : 'var(--on-surface-variant)',
                }}
              >
                Cliente indicó que cambiará de dirección el próximo mes.
                Pendiente actualizar base de datos.
              </p>
            </Card>
          </div>
        </div>
      </div>

      <div
        className="fab"
        title="Nueva Actuación"
      >
        +
      </div>
    </>
  );
}
