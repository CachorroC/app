import { getCarpetas } from '#@/lib/project/utils/Carpetas/getCarpetas';
import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import clientPromise from '#@/lib/connection/mongodb';

export async function GET() {
      const carpetas = await getCarpetas();

      return new NextResponse(
        JSON.stringify(
          carpetas
        ), {
          status : 200,
          headers: {
            'content-type': 'application/json',
          },
        }
      );
}

export async function POST(
  request: NextRequest
) {
      const {
        searchParams
      } = new URL(
        request.url
      );

      const incomingRequest = await request.json();

      const destino = searchParams.get(
        'destino'
      );

      const nowTime = new Date()
            .getTime();

      if ( destino ) {
        fs.writeFile(
          `${ destino }.${ nowTime }.json`, JSON.stringify(
            incomingRequest
          )
        );

        const client = await clientPromise;

        if ( !client ) {
          throw new Error(
            'no hay cliente mongólico'
          );
        }

        const db = client.db(
          'RyS'
        )
              .collection(
                destino
              );

        const insertOne = await db.insertOne(
          incomingRequest
        );

        if ( insertOne.acknowledged ) {
          return NextResponse.json(
            incomingRequest
          );
        }

        return new NextResponse(
          null, {
            status: 404,
          }
        );
      }

      return new NextResponse(
        null, {
          status: 404,
        }
      );
}
