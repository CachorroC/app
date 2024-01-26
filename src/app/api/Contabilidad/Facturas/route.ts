import { NextResponse } from 'next/server';
import { facturasCollection } from '#@/lib/connection/collections';
import { prisma } from '#@/lib/connection/prisma';

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

export async function GET() {

      const collection = await facturasCollection();

      const arr1 = await collection.find()
            .toArray();

      const arr2 = await prisma.factura.findMany();

      const facturas = arr1.map(
        (
          item
        ) => {
                  const matchedObject = arr2.find(
                    (
                      obj
                    ) => {
                              return obj.id === item.id;
                    }
                  );
                  return {
                    ...item,
                    ...matchedObject
                  };
        }
      );
      return NextResponse.json(
        facturas
      );

}
