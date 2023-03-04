import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function getWeathers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("sample_weatherdata");

    const weathers = await db.collection("data").find({}).toArray();

    res.json(weathers);
  } catch (e: any | undefined) {
    console.error(e);
    throw new Error(e).message;
  }
}
