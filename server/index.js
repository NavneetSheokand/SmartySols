const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: ["https://smartysols.xyz", "https://www.smartysols.xyz"],
  methods: ["GET", "POST"],
}));

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    // Email to YOU
    await resend.emails.send({
      from: "contact@smartysols.xyz",
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    // Confirmation Email to USER
    await resend.emails.send({
      from: "contact@smartysols.xyz",
      to: email,
      subject: "Thank you for contacting SmartySols!",
      html: `
        <h2>Hi ${name},</h2>
        <p>We received your request and will get back to you within 24 hours.</p>
        <p>Best Regards,<br/>Team SmartySols</p>
      `
    });
      
    console.log("Resend result:", result);
    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error("Resend Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
