import nodemailer from "nodemailer";

const sanitizeHeaderValue = (value) => value.replace(/[\r\n]+/g, " ").trim();

export const sendContactEmail = async (req, res) => {
  const { name, email, tel, message } = req.body;
  if (!name || !email || !tel) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const senderEmail = sanitizeHeaderValue(process.env.EMAIL_USER || "");
    const senderName = sanitizeHeaderValue(
      process.env.EMAIL_FROM_NAME || "Portfolio Contact Form"
    );
    const contactName = sanitizeHeaderValue(name);
    const contactEmail = sanitizeHeaderValue(email);
    const contactPhone = sanitizeHeaderValue(tel);
    const contactMessage = typeof message === "string" ? message.trim() : "";

    if (!senderEmail) {
      return res.status(500).json({ message: "Mail sender is not configured." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      disableFileAccess: true,
      disableUrlAccess: true,
      auth: {
        user: senderEmail,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: senderEmail,
      replyTo: contactEmail,
      subject: `Contact Form Submission from ${contactName}`,
      text: `Name: ${contactName}\nEmail: ${contactEmail}\nPhone: ${contactPhone}${
        contactMessage ? `\n\nMessage:\n${contactMessage}` : ""
      }`,
    });

    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
};
