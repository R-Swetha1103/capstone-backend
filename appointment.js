const express = require('express');
const nodemailer = require('nodemailer'); // For using NodeMailer
const router = express.Router();

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail address (from .env or hardcoded)
        pass: process.env.GMAIL_PASS // Your Gmail password or App Password
    }
});

// Send Appointment Email
router.post('/send-email', async (req, res) => {
    const { date, slot, email } = req.body;  // Expecting 'email' from frontend

    if (!email) {
        return res.status(400).json({ message: 'Recipient email is required.' });
    }

    const mailOptions = {
        from: process.env.GMAIL_USER,         // Sender's Gmail address
        to: email,                            // Use the dynamic email from the request
        subject: 'New Appointment Booking',
        text: `Appointment booked on ${date} for the ${slot} time slot.`,
    };

    try {
        // Send the email using the transporter
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({ message: 'Error sending email.', error });
    }
});

module.exports = router;
