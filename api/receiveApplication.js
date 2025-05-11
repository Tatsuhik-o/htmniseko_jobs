import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ Message: "Method Is Not Allowed ..." });
  }
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "country",
    "resume",
    "cover",
  ];
  const { body } = req;
  for (let key of requiredFields) {
    if (typeof body[key] === "undefined") {
      return res.status(422).json({ Message: `Missing parameter: ${key}` });
    }
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    province,
    zipCode,
    country,
    date,
    pay,
    education,
    languageProficiency,
    hearingAboutUs,
    driverLicense,
    visaType,
    smoke,
    criminal,
    feedback,
    resume,
    cover,
  } = body;

  console.log(firstName, lastName, email, resume, cover, country);

  const form = new formidable.IncomingForm({ maxFileSize: 2 * 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ error: "Form parsing error" });
    }
    const { name, email, message } = fields;
    const attachment = files.attachment;

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.MAIL_RECEIVER,
        subject: "New Form Submission",
        text: message,
        attachments: attachment
          ? [
              {
                filename: attachment.originalFilename,
                content: fs.createReadStream(attachment.filepath),
              },
            ]
          : [],
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Email sending error:", error);
      return res.status(500).json({ error: "Email sending failed" });
    }
  });
}
