'use server';

import { facturasCollection } from '#@/lib/connection/collections';
import { prisma } from '#@/lib/connection/prisma';
import { intFactura } from '#@/lib/types/contabilidad';
import { JsonObject } from '@prisma/client/runtime/library';

export async function addToContabilidad (
  newData: intFactura
) {
      const collection = await facturasCollection();

      const existentFactura = await collection.findOne(
        {
          id: newData.id
        }
      );


      if ( !existentFactura ) {

        const insertFactura = await collection.insertOne(
          {
            ...newData
          }
        );

        if ( insertFactura.acknowledged ) {
          return true;
        }

        return false;
      }

      /* eslint-disable-next-line no-unused-vars */


      const updateFactura = await collection.updateOne(
        {
          id: newData.id
        }, {
          $set: {
            ...newData
          }
        }, {
          upsert: true
        }
      );

      if ( updateFactura.modifiedCount >= 1 ) {
        return true;
      }

      return false;

}

export async function addFactura (
  incomingFactura: intFactura
) {
      const {
        nit, facturaElectronica, ...factura
      } = incomingFactura;

      try {
        if ( typeof facturaElectronica === 'string' ) {

          const inserter =  await prisma.factura.upsert(
            {
              where: {
                id: factura.id,
              },
              update: {
                ...factura,
                facturaElectronica: facturaElectronica,
                emisorDeFactura   : {
                  connectOrCreate: {
                    where: {
                      nit: nit
                    },
                    create: {
                      dv         : factura.dv,
                      nit        : nit,
                      razonSocial: factura.razonSocial,
                      direccion  : factura.direccion,
                      ciudad     : factura.ciudad,
                    }
                  }
                }
              },
              create: {
                ...factura,
                facturaElectronica: facturaElectronica,
                emisorDeFactura   : {
                  connectOrCreate: {
                    where: {
                      nit: nit
                    },
                    create: {
                      dv         : factura.dv,
                      nit        : nit,
                      razonSocial: factura.razonSocial,
                      direccion  : factura.direccion,
                      ciudad     : factura.ciudad,
                    }
                  }
                }
              }
            }
          );

          console.log(
            inserter
          );
          return {
            success: true,
            data   : JSON.stringify(
              inserter
            )
          };
        }

        const inserter =  await prisma.factura.upsert(
          {
            where: {
              id: factura.id
            },
            update: {
              ...factura,
              secondaryFactura: facturaElectronica as unknown as JsonObject,
              emisorDeFactura : {
                connectOrCreate: {
                  where: {
                    nit: nit
                  },
                  create: {
                    dv         : factura.dv,
                    nit        : nit,
                    razonSocial: factura.razonSocial,
                    direccion  : factura.direccion,
                    ciudad     : factura.ciudad,
                  }
                }
              }
            },
            create: {
              ...factura,
              facturaElectronica: '',
              secondaryFactura  : facturaElectronica as unknown as JsonObject,
              emisorDeFactura   : {
                connectOrCreate: {
                  where: {
                    nit: nit
                  },
                  create: {
                    dv         : factura.dv,
                    nit        : nit,
                    razonSocial: factura.razonSocial,
                    direccion  : factura.direccion,
                    ciudad     : factura.ciudad,
                  }
                }
              }
            }
          }
        );

        console.log(
          inserter
        );
        return {
          success: true,
          data   : JSON.stringify(
            inserter
          )
        };

      } catch ( error ) {
        console.log(
          error
        );
        return {
          success: false,
          data   : JSON.stringify(
            error
          )
        };
      }
}


export async function addFacturaGenerator (
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
              ciudad     : newData.ciudad

            }
          }
        );
        console.log(
          inserter
        );
        return {
          success: true,
          data   : JSON.stringify(
            inserter
          )
        };
      } catch ( error ) {
        console.log(
          error
        );
        return {
          success: false,
          data   : JSON.stringify(
            error
          )
        };
      }
}