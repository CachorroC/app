'use server';

import { facturasCollection } from '#@/lib/connection/collections';
import { intFactura } from '#@/lib/types/contabilidad';

export async function addToContabilidad ( queryData: FormData )
{
  const objectFormData = Object.fromEntries(queryData.entries())
  const collection = await facturasCollection();
  const insertFactura = await collection.insertOne({...objectFormData})
}
