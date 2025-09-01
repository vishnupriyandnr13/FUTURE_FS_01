const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Example API route
app.get("/api", (req, res) => {
  res.json({
    status: "success",
    message: "Hello from Portfolio Backend!",
    projects: [
      { id: 1, name: "Portfolio Website" },
      //{ id: 2, name: "E-commerce App" }
    ]
  });
});

// 📩 Contact form endpoint
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  try {
    // Create transporter (using Gmail example)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vishnupriyandnr13@gmail.com",      // ⚠️ replace with your Gmail
        pass: "arwu tksc zzbc ynqm"         // ⚠️ generate Gmail App Password
      }
    });

    const mailOptions = {
      from: email,
      to: "vishnupriyandnr13@gmail.com", // where you want to receive contact messages
      subject: `New Message from ${name}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).send("Something went wrong.");
  }
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
