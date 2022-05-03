import { MongoClient } from "mongodb";
import { getAllDocuments } from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const url =
    "mongodb+srv://nextjs:test@cluster0.xp3cg.mongodb.net/events?retryWrites=true&w=majority";
  const client = await MongoClient.connect(url);

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "Added comment.", comment: newComment });
  } else if (req.method === "GET") {
    const documents = await getAllDocuments(
      client,
      "comments",
      { _id: -1 },
      { eventId }
    );

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
