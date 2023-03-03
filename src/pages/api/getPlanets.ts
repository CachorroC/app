import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function getLinks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("sample_guides");

    const links = await db.collection("planets").find({}).limit(20).toArray();

    res.json(links);
  } catch (e: any | undefined) {
    console.error(e);
    throw new Error(e).message;
  }
}
