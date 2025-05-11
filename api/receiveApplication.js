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
  const form = formidable({
    maxFileSize: 2 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ error: "Form parsing error" });
    }

    const requiredFields = ["firstName", "lastName", "email", "country"];
    for (let key of requiredFields) {
      if (!fields[key]) {
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
    } = fields;

    const { attachement } = files;
    const resume = attachement?.[0];
    const cover = attachement?.[1];

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

      const message = `
          First Name: ${firstName},
          Last Name: ${lastName},
          Email: ${email},
          Phone: ${phone},
          Address: ${address},
          City: ${city},
          Province: ${province},
          Zip Code: ${zipCode},
          Country: ${country},
          Salary Expectation: ${pay} yen,
          Language Proficiency: ${languageProficiency},
          Heard About Us From: ${hearingAboutUs},
          Driver License: ${driverLicense},
          Visa Type: ${visaType},
          Smoke: ${smoke},
          Criminal: ${criminal},
          Feedback: ${feedback},
      `;

      const mailOptions = {
        from: `"${firstName} ${lastName}" <${email}>`,
        to: process.env.MAIL_RECEIVER,
        subject: `New Application From - ${firstName} ${lastName}`,
        text: message,
        attachments: [
          ...(resume
            ? [
                {
                  filename: resume.originalFilename,
                  content: fs.createReadStream(resume.filepath),
                },
              ]
            : []),
          ...(cover
            ? [
                {
                  filename: cover.originalFilename,
                  content: fs.createReadStream(cover.filepath),
                },
              ]
            : []),
        ],
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Email sending error:", error);
      return res.status(500).json({ error: "Email sending failed" });
    }
  });
}
