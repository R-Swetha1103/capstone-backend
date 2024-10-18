// payment.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Replace with your Stripe secret key

// Handle Payment
router.post('/', async (req, res) => {
    const { token, amount } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            description: 'FitnessFIT Payment',
            source: token.id,
        });

        res.status(200).json({ message: 'Payment successful!', charge });
    } catch (error) {
        res.status(500).json({ message: 'Payment failed.', error });
        console.error('Payment Error:', error);
    }
});

module.exports = router;
