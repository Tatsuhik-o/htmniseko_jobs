import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ Message: "Method Not Allowed" });
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ Message: "Missing or Malformed Token" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    return res.status(200).json(payload);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ Message: "Token Expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ Message: "Invalid Token" });
    } else {
      return res.status(500).json({ Message: "Internal Server Error" });
    }
  }
}
