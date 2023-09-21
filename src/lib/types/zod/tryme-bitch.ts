import * as z from 'zod';

export const CategorySchema = z.enum(
  [
            'Bancolombia',
            'Insolvencia',
            'LiosJuridicos',
            'Reintegra',
            'Terminados',
  ] 
);

export type Category = z.infer<typeof CategorySchema>;

export const DepartamentoSchema = z.enum(
  [
            'BOYACÁ',
            'CNDINAMARCA',
            'CUN DINAMARCA',
            'CUNDINAMARCA',
            'CUNDINNAMARCA',
            'CUNDINAMARCA ',
            'CUNDINNAMARCA ',
            'TOLIMA',
  ] 
);

export type Departamento = z.infer<typeof DepartamentoSchema>;

export const TipoProcesoSchema = z.enum(
  [
            'ACUMULADO',
            'HIPOTECARIA',
            'HIPOTECARIO',
            'PRENDARIO',
            'SINGULAR',
  ] 
);

export type TipoProceso = z.infer<typeof TipoProcesoSchema>;

export const CodReglaSchema = z.enum(
  [
            '00                              '
  ] 
);

export type CodRegla = z.infer<typeof CodReglaSchema>;

export const UltimaActuacionSchema = z.object(
  {
    idRegActuacion: z.coerce.number(),
    llaveProceso  : z.coerce.string(),
    consActuacion : z.coerce.number(),
    fechaActuacion: z.coerce.date(),
    actuacion     : z.coerce.string(),
    anotacion     : z.union(
      [
                z.null(),
                z.coerce.string()
      ] 
    ),
    fechaInicial: z.union(
      [
                z.coerce.date(),
                z.null()
      ] 
    ),
    fechaFinal: z.union(
      [
                z.coerce.date(),
                z.null()
      ] 
    ),
    fechaRegistro: z.coerce.date(),
    codRegla     : CodReglaSchema,
    conDocumentos: z.coerce.boolean(),
    cant         : z.coerce.number(),
  } 
);

export type UltimaActuacion = z.infer<typeof UltimaActuacionSchema>;

export const TelSchema = z.object(
  {
    fijo: z.union(
      [
                z.coerce.number(),
                z.null()
      ] 
    )
      .optional(),
    celular: z.union(
      [
                z.coerce.number(),
                z.null()
      ] 
    )
      .optional(),
  } 
);

export type Tel = z.infer<typeof TelSchema>;

export const DeudorSchema = z.object(
  {
    tel          : TelSchema,
    primerNombre : z.coerce.string(),
    segundoNombre: z.union(
      [
                z.null(),
                z.coerce.string()
      ] 
    )
      .optional(),
    primerApellido : z.coerce.string(),
    segundoApellido: z.union(
      [
                z.null(),
                z.coerce.string()
      ] 
    )
      .optional(),
    cedula: z.union(
      [
                z.coerce.number(),
                z.null()
      ] 
    ),
    direccion: z.coerce.string(),
    email    : z.coerce.string(),
  } 
);

export type Deudor = z.infer<typeof DeudorSchema>;

export const JuzgadoSchema = z.object(
  {
    id  : z.coerce.number(),
    tipo: z.coerce.string(),
    url : z.coerce.string(),
  } 
);

export type Juzgado = z.infer<typeof JuzgadoSchema>;

export const DemandaSchema = z.object(
  {
    departamento: z.union(
      [
                DepartamentoSchema,
                z.null()
      ] 
    ),
    juzgados: z.array(
      JuzgadoSchema 
    ),
    capitalAdeudado: z.union(
      [
                z.coerce.number(),
                z.null(),
                z.coerce.string()
      ] 
    ),
    entregaGarantiasAbogado: z.union(
      [
                z.coerce.date(),
                z.null()
      ] 
    ),
    etapaProcesal: z.union(
      [
                z.null(),
                z.coerce.string()
      ] 
    )
      .optional(),
    fechaPresentacion: z.union(
      [
                z.null(),
                z.coerce.date()
      ] 
    ),
    municipio : z.coerce.string(),
    obligacion: z.record(
      z.coerce.string(),
      z.union(
        [
                  z.coerce.number(),
                  z.coerce.string()
        ] 
      ),
    ),
    radicado         : z.coerce.string(),
    vencimientoPagare: z.union(
      [
                z.array(
                  z.union(
                    [
                              z.coerce.date(),
                              z.null()
                    ] 
                  ) 
                ),
                z.null(),
                z.coerce.string(),
      ] 
    ),
    expediente             : z.coerce.string(),
    entregagarantiasAbogado: z.union(
      [
                z.null(),
                z.coerce.string()
      ] 
    )
      .optional(),
  } 
);

export type Demanda = z.infer<typeof DemandaSchema>;

export const IntCarpetaElementSchema = z.object(
  {
    _id        : z.coerce.string(),
    category   : CategorySchema,
    deudor     : DeudorSchema,
    numero     : z.coerce.number(),
    tipoProceso: TipoProcesoSchema,
    idProceso  : z.union(
      [
                z.coerce.number(),
                z.null()
      ] 
    )
      .optional(),
    llaveProceso: z.coerce.string(),
    categoryTag : z.coerce.number(),
    demanda     : DemandaSchema,
    fecha       : z.union(
      [
                z.coerce.date(),
                z.null()
      ] 
    )
      .optional(),
    ultimaActuacion: z.union(
      [
                UltimaActuacionSchema,
                z.null()
      ] 
    )
      .optional(),
    nombre: z.union(
      [
                z.null(),
                z.coerce.string()
      ] 
    )
      .optional(),
  } 
);

export type IntCarpetaElement = z.infer<typeof IntCarpetaElementSchema>;
