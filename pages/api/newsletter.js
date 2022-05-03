import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    //register
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  } else {
    //get
  }
}

export default handler;
