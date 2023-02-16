import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function editLink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const { id } = req.query;
    const { title, content } = req.body;

    const post = await db.collection('links').updateOne(
      {
        _id: ObjectId,
      },
      {
        $set: {
          name: name,
        },
      }
    );

    res.json(post);
  } catch (e: any | undefined) {
    console.error(e);
    throw new Error(e).message;
  }
}
