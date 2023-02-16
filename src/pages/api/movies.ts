/** @format */

import clientPromise from "../../lib/mongodb";
import {
  NextApiRequest,
  NextApiResponse,
} from "next/types";

export default async function Movies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    res.json(movies);
    console.log(res.json(movies));
  } catch (e) {
    console.log(e);
    console.error(e);
  }
}
