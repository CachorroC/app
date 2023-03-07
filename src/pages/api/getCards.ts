import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function getLinks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("domain");

    const links = await db.collection("cards").find({}).limit(20).toArray();

    res.json(links);
  } catch (e: any | undefined) {
    console.error(e);
    throw new Error(e).message;
  }
}
