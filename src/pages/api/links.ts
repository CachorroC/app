/** @format */

import clientPromise from "../../lib/mongodb";
import {
  NextApiRequest,
  NextApiResponse,
} from "next/types";

export default async function Links(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const links = await db
      .collection("links")
      .find({})
      .toArray();

    res.json(links);
    console.log(res.json(links));
  } catch (e) {
    console.log(e);
    console.error(e);
  }
}
