import {
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import clientPromise from "../../lib/mongodb";

export default async function addLink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const { name, url, state, icon, lastUpdate } = req.body;

    const link = await db.collection("links").insertOne({
      name,
      url,
      state,
      icon,
      lastUpdate,
    });

    res.json(link);
  } catch (e: any | undefined) {
    console.error(e);
    throw new Error(e).message;
  }
}
