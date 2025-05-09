import dbConnection from "./dbConnection.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ Message: "Method Not Allowed ..." });
  }
  try {
    const id = Number(req.query.id) || 0;
    if (typeof id !== "number" || id < 0) {
      return res.status(401).json({ Message: "Bad Request ..." });
    }
    const jobQuery =
      id === 0 ? "SELECT * FROM jobs" : "SELECT * FROM jobs WHERE id = ?";
    const db = await dbConnection();
    const [results] = await db.execute(jobQuery, [id]);
    if (!results.length) {
      return res
        .status(404)
        .json({ Message: "No Job With That ID Was Found ..." });
    }
    return res.status(200).json({ Message: "Success", job: results });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Internal Server Error ..." });
  }
}
