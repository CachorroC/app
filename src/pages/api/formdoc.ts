import clientPromise from "../../lib/mongodb";
import {
  NextApiRequest,
  NextApiResponse,
} from "next/types";

interface Haiku {
  title: string;
  content: string;
}

export default async function run(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("insertDB");
    // Specifying a Schema is optional, but it enables type hints on
    // finds and inserts
    const haiku = db.collection<Haiku>("haiku");
    const result = await haiku.insertOne({
      title: "Record of a Shriveled Datum",
      content:
        "No bytes, no problem. Just insert a document, in MongoDB",
    });
    console.log(
      `A document was inserted with the _id: ${result.insertedId}`
    );
  } catch (e) {
    console.log(e);
  }
}
