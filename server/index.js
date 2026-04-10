require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const rateLimit = require("express-rate-limit");
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');
const Lead = require('./models/Lead');

const blogRoutes = require("./routes/blogs");
const uploadRoutes = require("./routes/upload");
const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 5000;

// Escape helper
const escape = (str) =>
  String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');

// Init services
const resend = new Resend(process.env.RESEND_API_KEY);

// Connect DB
connectDB();

// Logging
app.use(morgan("dev"));
app.use(helmet());
// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://smartysols.xyz",
  "https://www.smartysols.xyz"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  credentials: true
}));

//  Rate limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

//  Body parser
app.use(express.json());

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/ai", aiRoutes);

// Contact API
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    //  Save lead
    const newLead = new Lead({
      name,
      email,
      phone,
      company,
      message
    });

    await newLead.save();

    // Email to you
    await resend.emails.send({
      from: "contact@smartysols.xyz",
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${escape(name)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Phone:</strong> ${escape(phone)}</p>
        <p><strong>Company:</strong> ${escape(company) || "Not provided"}</p>
        <p><strong>Message:</strong> ${escape(message)}</p>
      `
    });

    // Email to user
    await resend.emails.send({
      from: "contact@smartysols.xyz",
      to: email,
      subject: "Thank you for contacting SmartySols!",
      html: `
        <h2>Hi ${escape(name)},</h2>
        <p>We received your request and will get back to you within 24 hours.</p>
        <p>Best Regards,<br/>Team SmartySols</p>
      `
    });

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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});