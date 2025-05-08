import dbConnection from "./dbConnection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ Message: "Method Not Allowed ..." });
    }
    const { username, password } = req.body;
    console.log(username, password);
    const usernameQuery = "SELECT id FROM userbase WHERE username = ?";
    const db = await dbConnection();
    const [results] = await db.execute(usernameQuery, [username]);
    if (!results.length) {
      return res.status(401).json({ Message: "Username Does Not Exists ..." });
    }
    const userPassword = results[0].password;
    const passwordMatch = bcrypt.compare(password, userPassword);
    if (!passwordMatch) {
      return res.status(401).json({ Message: "Incorrect Password ..." });
    }
    const token = jwt.sign(
      { username, id: results[0].id },
      process.env.SECRET_KEY,
      { expiresIn: "3h" }
    );
    return res.status(200).json({ Message: "Login Success ...", token });
  } catch (err) {
    console.log(err);
    return res.json(500).json({ Message: "Internal Server Error ..." });
  }
}
