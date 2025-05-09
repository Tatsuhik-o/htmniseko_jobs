import dbConnection from "./dbConnection.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

dotenv.config();
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ Method: "Method Not Allowed ..." });
  }
  try {
    const token = req.headers["authorization"]
      ? req.headers["authorization"].replace("Bearer ", "")
      : "";
    if (!token || !jwt.verify(token, process.env.SECRET_KEY)) {
      return res.status(405).json({ Message: "User Not Authorized ..." });
    }
    const { company, title, location, employment_type, job_description } =
      req.body;
    if (
      !company ||
      !title ||
      !location ||
      !employment_type ||
      !job_description
    ) {
      return res.status(400).json({ Message: "Bad Request ..." });
    }
    const db = await dbConnection();
    const newJobQuery =
      "INSERT INTO jobs (company, title, location, employment_type, job_description) VALUES (?, ?, ?, ?, ?)";
    const [results] = await db.execute(newJobQuery, [
      company,
      title,
      location,
      employment_type,
      DOMPurify.sanitize(job_description),
    ]);
    return res.status(200).json({
      Message: "Successfully Created New Entry ...",
      id: results.insertId,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Internal Server Error ..." });
  }
}
