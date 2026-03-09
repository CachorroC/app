'use client';
import { useCarpetaSort } from '#@/app/Context/carpetas-sort-context';
import { Suspense, useCallback, useState } from 'react';
import { ClientCardRow } from '#@/components/Card/client-card';
import { Route } from 'next';
import { CopyButton } from '#@/components/Buttons/copy-buttons';
import { RevisadoCheckBox } from '#@/app/Carpetas/revisado-checkbox';
import { Loader } from '#@/components/Loader/main-loader';
import { TableRowCarpetaSortingButton } from '../../../app/Carpetas/@right/carpetasButtonsSort';
import { ActuacionTableComponent,
  ActuacionTableErrorComponent, } from '#@/components/Actuaciones/actuacion-table-component';
import OutputDateHelper from '#@/lib/project/output-date-helper';
import { JuzgadoComponent,
  JuzgadoErrorComponent, } from '#@/components/Proceso/juzgado-component';
import styles from './styles.module.css';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  DataGridPro,
  GridColDef,
  useGridApiContext,
  GridRowParams,
  GRID_DETAIL_PANEL_TOGGLE_FIELD,
  useGridSelector,
  gridDimensionsSelector,
} from '@mui/x-data-grid-pro';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import ForwardIcon from '@mui/icons-material/Forward';
import ReplyIcon from '@mui/icons-material/Reply';
import Link from '@mui/material/Link';

function ExpandableCell({ value}: GridRenderCellParams) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {expanded ? value : value.actuacion.slice(0, 200)}&nbsp;
      {value.actuacion.length > 200 && (
        <Link
          type="button"
          component="button"
          sx={{ fontSize: 'inherit', letterSpacing: 'inherit' }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'view less' : 'view more'}
        </Link>
      )}
    </div>
  );
}
export function CarpetasTable() {
  const {
    carpetas
  } = useCarpetaSort();
  const columns: GridColDef<( typeof rows )[number]>[] = [
  {
    field     : 'numero',
    headerName: 'Numero',
    sortable   : true,
    type      : 'number',
    width     : 90
  },
  {
    field     : 'nombre',
    headerName: 'Nombre',
    sortable   : true,
    width     : 110,
    editable  : true,
  },
  {
    field     : 'category',
    headerName: 'Categoria',
    sortable   : true,
    width     : 110,
    editable  : true,
  },
  {
    field     : 'ultimaActuacion',
    headerName: 'Actuaciones',
    width     : 150,
    editable: true,
    renderCell: (params: GridRenderCellParams) => <ExpandableCell { ...params } />,
  },
  {
    field      : 'revisado',
    headerName : 'Revisado',
    description: 'ya se revisó el proceso?',
    sortable   : false,
    width      : 80,

    }, {
    field     : 'expediente',
    headerName: 'Expediente',
    width     : 150,
    editable  : true,
    },
  {field     : 'fecha',
    headerName: 'Fecha Ultima Actuacion',
    width     : 150,
    editable  : true,
    }, {
    field     : 'ciudad',
    headerName: 'Ciudad',
    width     : 110,
    editable  : true,
    }, {
    field     : 'juzgado',
    headerName: 'Juzgado',
    width     : 110,
    editable  : true,
  }
];


  const rows = carpetas.map( ( carpeta ) => {
          const {
            ultimaActuacion,
            numero,
            nombre,
            id,
            category,
            fecha,
            llaveProceso,
            revisado,
            juzgado, ciudad
          } = carpeta;

          const words = nombre
            .split( ' ' )
            .map( ( palabra ) => {
              return (
                palabra.charAt( 0 )
                  .toUpperCase()
                + palabra.toLowerCase()
                  .substring( 1 )
              );
            } )
            .join( ' ' );

    return {
      id: numero,
      numero,
      nombre: words,
      category,
      ultimaActuacion,
      revisado,
      expediente:llaveProceso,
      fecha,
      ciudad,
      juzgado
          }
        } )


function DetailPanelContent({ row: rowProp }: { row: ( typeof rows )[number] } ) {
  const apiRef = useGridApiContext();
  const width = useGridSelector(apiRef, gridDimensionsSelector).viewportInnerSize
    .width;

  return (
    <Stack
      sx={{
        py: 2,
        height: '100%',
        boxSizing: 'border-box',
        position: 'sticky',
        left: 0,
        width,
      }}
      direction="column"
    >
      <Paper sx={{ flex: 1, mx: 'auto', width: '90%', p: 2 }}>
        <Stack direction="column" spacing={1}>
          <Typography variant="h5">{`Subject: ${rowProp.ultimaActuacion?.actuacion}`}</Typography>
          <Typography variant="caption"><OutputDateHelper incomingDate={rowProp.fecha} /></Typography>
          <Typography variant="subtitle2">{`Anotacion: ${rowProp.ultimaActuacion?.anotacion}`}</Typography>

          <Typography variant="body2">
            {
              rowProp.ultimaActuacion?.anotacion
              ? `Anotacion: ${rowProp.ultimaActuacion.anotacion}`
                : 'No hay anotaciones disponibles.'
            }
          </Typography>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <ButtonGroup variant="text" sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button sx={{ px: 2 }} startIcon={<ReplyIcon />}>
            Reply
          </Button>
          <Button sx={{ px: 2 }} startIcon={<ForwardIcon />}>
            Forward
          </Button>
          <Button sx={{ px: 2 }} color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </ButtonGroup>
      </Paper>
    </Stack>
  );
}

  const getDetailPanelContent = useCallback(
    ({ row }: GridRowParams) => <DetailPanelContent row={row} />,
    [],
  );

  const getDetailPanelHeight = React.useCallback(() => 'auto', []);
  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGridPro
          autoHeight
          rows={rows}
          columns={columns}
          initialState={ {
            sorting: {
      sortModel: [{ field: 'fecha', sort: 'desc' }],
    },
            pinnedColumns: {
              left: [GRID_DETAIL_PANEL_TOGGLE_FIELD],
            },
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          getDetailPanelHeight={getDetailPanelHeight}
          getDetailPanelContent={getDetailPanelContent}
          sx={{
            '& .MuiDataGrid-detailPanel': {
              overflow: 'visible',
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    <table>
      <thead>
        <tr>
          <Suspense fallback={<Loader />}>
            <TableRowCarpetaSortingButton sortKey={'numero'} />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <TableRowCarpetaSortingButton sortKey={'nombre'} />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <TableRowCarpetaSortingButton sortKey={'category'} />
          </Suspense>
          <th
            scope="col"
            className={styles.highlight}
          >
            Actuaciones
          </th>
          <th
            scope="col"
            className={styles.highlight}
          >
            Revisado
          </th>
          <th
            scope="col"
            className={styles.highlight}
          >
            expediente
          </th>
          <th
            scope="col"
            className={styles.highlight}
          >
            Fecha de ultima Actuacion
          </th>
          <th
            scope="col"
            className={styles.highlight}
          >
            ciudad
          </th>
          <th
            scope="col"
            className={styles.highlight}
          >
            Juzgado
          </th>
        </tr>
      </thead>
      <tbody>
        {carpetas.map( ( carpeta ) => {
          const {
            ultimaActuacion,
            numero,
            nombre,
            id,
            category,
            fecha,
            llaveProceso,
            revisado,
            juzgado,
          } = carpeta;

          const words = nombre
            .split( ' ' )
            .map( ( palabra ) => {
              return (
                palabra.charAt( 0 )
                  .toUpperCase()
                + palabra.toLowerCase()
                  .substring( 1 )
              );
            } )
            .join( ' ' );

          return (
            <ClientCardRow
              key={numero}
              rowHref={`/Carpeta/${ numero }` as Route}
              carpeta={carpeta}
            >
              <td data-label="nombre">{words}</td>

              <td data-label="categoria">{category}</td>

              {ultimaActuacion
                ? (
                    <ActuacionTableComponent
                      key={numero}
                      numero={numero}
                      title={ultimaActuacion.actuacion}
                      content={ultimaActuacion.anotacion}
                      idProceso={ultimaActuacion.idProceso}
                    />
                  )
                : (
                    <ActuacionTableErrorComponent />
                  )}

              <td data-label="revisado">
                <RevisadoCheckBox
                  numero={numero}
                  id={id}
                  initialRevisadoState={revisado}
                />
              </td>
              <td data-label="expediente">
                <CopyButton
                  copyTxt={llaveProceso}
                  name={'expediente'}
                />
              </td>
              <td data-label="fecha">
                <OutputDateHelper incomingDate={fecha} />
              </td>
              <td data-label="ciudad">{carpeta.demanda.municipio}</td>
              <td data-label="juzgado">
                {juzgado
                  ? (
                      <JuzgadoComponent
                        key={numero}
                        juzgado={juzgado}
                      />
                    )
                  : (
                      <JuzgadoErrorComponent />
                    )}
              </td>
            </ClientCardRow>
          );
        } )}
      </tbody>
    </table>

    </>
  );
}
