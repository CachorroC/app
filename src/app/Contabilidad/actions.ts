'use server';

import { facturasCollection } from '#@/lib/connection/collections';
import { prisma } from '#@/lib/connection/prisma';
import { intFactura } from '#@/lib/types/contabilidad';
import { JsonObject } from '@prisma/client/runtime/library';

export async function addToContabilidad(
  newData: intFactura 
) {
      const collection = await facturasCollection();

      const existentFactura = await collection.findOne(
        {
          id: newData.id,
        } 
      );

      if ( !existentFactura ) {
        const insertFactura = await collection.insertOne(
          {
            ...newData,
          } 
        );

        if ( insertFactura.acknowledged ) {
          return {
            success: true,
            data   : JSON.stringify(
              insertFactura 
            ),
          };
        }

        return {
          success: false,
          data   : JSON.stringify(
            insertFactura 
          ),
        };
      }

      /* eslint-disable-next-line no-unused-vars */

      const updateFactura = await collection.updateOne(
        {
          id: newData.id,
        },
        {
          $set: {
            ...newData,
          },
        },
        {
          upsert: true,
        },
      );

      if ( updateFactura.modifiedCount >= 1 ) {
        return {
          success: true,
          data   : JSON.stringify(
            updateFactura 
          ),
        };
      }

      return {
        success: false,
        data   : JSON.stringify(
          updateFactura 
        ),
      };
}

export async function addFactura(
  incomingFactura: intFactura 
) {
      const {
        nit, facturaElectronica, carpetaNumero, ...factura 
      }
    = incomingFactura;

      try {
        let inserter;

        if ( typeof facturaElectronica === 'string' ) {
          if ( carpetaNumero ) {
            inserter = await prisma.factura.upsert(
              {
                where: {
                  id: factura.id,
                },
                update: {
                  ...factura,
                  facturaElectronica: facturaElectronica,
                  secondaryFactura  : factura.secondaryFactura
                    ? factura.secondaryFactura
                    : undefined,
                  carpeta: {
                    connect: {
                      numero: carpetaNumero,
                    },
                  },
                  emisorDeFactura: {
                    connectOrCreate: {
                      where: {
                        nit: nit,
                      },
                      create: {
                        dv             : factura.dv,
                        nit            : nit,
                        razonSocial    : factura.razonSocial,
                        nombreComercial: factura.nombreComercial,
                        direccion      : factura.direccion,
                        ciudad         : factura.ciudad,
                      },
                    },
                  },
                },
                create: {
                  ...factura,
                  secondaryFactura: factura.secondaryFactura
                    ? factura.secondaryFactura
                    : undefined,
                  facturaElectronica: facturaElectronica,
                  carpeta           : {
                    connect: {
                      numero: carpetaNumero,
                    },
                  },
                  emisorDeFactura: {
                    connectOrCreate: {
                      where: {
                        nit: nit,
                      },
                      create: {
                        dv             : factura.dv,
                        nit            : nit,
                        razonSocial    : factura.razonSocial,
                        nombreComercial: factura.nombreComercial,
                        direccion      : factura.direccion,
                        ciudad         : factura.ciudad,
                      },
                    },
                  },
                },
              } 
            );
          } else {
            inserter = await prisma.factura.upsert(
              {
                where: {
                  id: factura.id,
                },
                update: {
                  ...factura,
                  facturaElectronica: facturaElectronica,
                  secondaryFactura  : factura.secondaryFactura
                    ? factura.secondaryFactura
                    : undefined,
                  emisorDeFactura: {
                    connectOrCreate: {
                      where: {
                        nit: nit,
                      },
                      create: {
                        dv             : factura.dv,
                        nit            : nit,
                        razonSocial    : factura.razonSocial,
                        nombreComercial: factura.nombreComercial,
                        direccion      : factura.direccion,
                        ciudad         : factura.ciudad,
                      },
                    },
                  },
                },
                create: {
                  ...factura,
                  facturaElectronica: facturaElectronica,
                  secondaryFactura  : factura.secondaryFactura
                    ? factura.secondaryFactura
                    : undefined,
                  emisorDeFactura: {
                    connectOrCreate: {
                      where: {
                        nit: nit,
                      },
                      create: {
                        dv             : factura.dv,
                        nit            : nit,
                        razonSocial    : factura.razonSocial,
                        nombreComercial: factura.nombreComercial,
                        direccion      : factura.direccion,
                        ciudad         : factura.ciudad,
                      },
                    },
                  },
                },
              } 
            );
          }
        } else {
          if ( carpetaNumero ) {
            inserter = await prisma.factura.upsert(
              {
                where: {
                  id: factura.id,
                },
                update: {
                  ...factura,
                  secondaryFactura: facturaElectronica as unknown as JsonObject,
                  carpeta         : {
                    connect: {
                      numero: carpetaNumero,
                    },
                  },
                  emisorDeFactura: {
                    connectOrCreate: {
                      where: {
                        nit: nit,
                      },
                      create: {
                        dv         : factura.dv,
                        nit        : nit,
                        razonSocial: factura.razonSocial,
                        direccion  : factura.direccion,
                        ciudad     : factura.ciudad,
                      },
                    },
                  },
                },
                create: {
                  ...factura,
                  facturaElectronica: '',
                  secondaryFactura  : facturaElectronica as unknown as JsonObject,
                  carpeta           : {
                    connect: {
                      numero: carpetaNumero,
                    },
                  },
                  emisorDeFactura: {
                    connectOrCreate: {
                      where: {
                        nit: nit,
                      },
                      create: {
                        dv         : factura.dv,
                        nit        : nit,
                        razonSocial: factura.razonSocial,
                        direccion  : factura.direccion,
                        ciudad     : factura.ciudad,
                      },
                    },
                  },
                },
              } 
            );
          } else {
            inserter = await prisma.factura.upsert(
              {
                where: {
                  id: factura.id,
                },
                update: {
                  ...factura,
                  secondaryFactura: facturaElectronica as unknown as JsonObject,

                  emisorDeFactura: {
                    connectOrCreate: {
                      where: {
                        nit: nit,
                      },
                      create: {
                        dv         : factura.dv,
                        nit        : nit,
                        razonSocial: factura.razonSocial,
                        direccion  : factura.direccion,
                        ciudad     : factura.ciudad,
                      },
                    },
                  },
                },
                create: {
                  ...factura,
                  facturaElectronica: '',
                  secondaryFactura  : facturaElectronica as unknown as JsonObject,
                  emisorDeFactura   : {
                    connectOrCreate: {
                      where: {
                        nit: nit,
                      },
                      create: {
                        dv         : factura.dv,
                        nit        : nit,
                        razonSocial: factura.razonSocial,
                        direccion  : factura.direccion,
                        ciudad     : factura.ciudad,
                      },
                    },
                  },
                },
              } 
            );
          }
        }

        console.log(
          inserter 
        );
        return {
          success: true,
          data   : JSON.stringify(
            inserter 
          ),
        };
      } catch ( error ) {
        console.log(
          error 
        );
        return {
          success: false,
          data   : JSON.stringify(
            error 
          ),
        };
      }
}

export async function addFacturaGenerator(
  newData: intFactura 
) {
      try {
        const inserter = await prisma.emisorDeFactura.create(
          {
            data: {
              nit        : newData.nit,
              dv         : newData.dv,
              razonSocial: newData.razonSocial,
              direccion  : newData.direccion,
              ciudad     : newData.ciudad,
            },
          } 
        );
        console.log(
          inserter 
        );
        return {
          success: true,
          data   : JSON.stringify(
            inserter 
          ),
        };
      } catch ( error ) {
        console.log(
          error 
        );
        return {
          success: false,
          data   : JSON.stringify(
            error 
          ),
        };
      }
}
