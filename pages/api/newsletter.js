import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    //register
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const url =
      "mongodb+srv://nextjs:test@cluster0.xp3cg.mongodb.net/events?retryWrites=true&w=majority";
    const client = await MongoClient.connect(url);
    const db = client.db();

    await db.collection("newsletter").insertOne({ email: userEmail });
    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
