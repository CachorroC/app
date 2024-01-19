'use server';

import { facturasCollection } from '#@/lib/connection/collections';
import { intFactura } from '#@/lib/types/contabilidad';

export async function addToContabilidad (
  newData: intFactura
) {
      const collection = await facturasCollection();


      const insertFactura = await collection.updateOne(
        {
          id: newData.id
        },
        {
          $set: newData
        }, {
          upsert: true,
        }
      );

      if ( insertFactura.acknowledged ) {
        return true;
      }

      return false;
}
