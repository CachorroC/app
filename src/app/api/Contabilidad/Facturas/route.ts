import { NextResponse } from 'next/server';
import { facturasCollection } from '#@/lib/connection/collections';

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

export async function GET() {

      const collection = await facturasCollection();

      const facturas = await collection.find()
            .toArray();
      return NextResponse.json(
        facturas
      );

}
