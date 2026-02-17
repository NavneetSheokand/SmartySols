const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["https://smartysols.xyz", "https://www.smartysols.xyz"],
  methods: ["GET", "POST"],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email configuration (mock setup - replace with actual credentials in production)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message',
      });
    }

    // Email to company
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.CONTACT_EMAIL || 'contact@smartysols.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2B5F8D;">New Contact Form Submission</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #6B7280; font-size: 14px;">
            This message was sent from the SmartySols website contact form.
          </p>
        </div>
      `,
    };

    // Auto-reply to user
    const autoReplyOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Thank you for contacting SmartySols!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #45C4B0;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p>In the meantime, feel free to explore our services:</p>
          <ul style="color: #2B5F8D;">
            <li>React Native App Development</li>
            <li>MERN Stack Web Development</li>
            <li>AI Automation Solutions</li>
          </ul>
          <p>Best regards,<br>The SmartySols Team</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="color: #6B7280; font-size: 12px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    // In development, just log the emails instead of sending
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('📧 Contact form submission:');
    //   console.log(mailOptions);
    //   console.log('📧 Auto-reply:');
    //   console.log(autoReplyOptions);
      
    //   return res.status(200).json({
    //     success: true,
    //     message: 'Message received successfully (development mode)',
    //   });
    // }

    // Send emails in production
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });

    console.log("Incoming form data:", req.body);

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.NODE_ENV === 'development' ? 'Development mode (logging only)' : 'Production mode'}`);
});

module.exports = app;