import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function getLink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("links");
    const { id } = req.query;

    const link = await db.collection("links").findOne({
      _id: ObjectId,
    });

    res.json(link);
  } catch (e: any | undefined) {
    console.error(e);
    throw new Error(e).message;
  }
}
