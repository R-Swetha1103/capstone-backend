
// index.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

const corsOptions = {
    origin: 'http://localhost:5173', // Change this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
    credentials: true // if you need cookies on cross-origin requests
};

// Enable CORS for all routes with the specified options
app.use(cors(corsOptions));

// Other middleware
app.use(bodyParser.json());

// Sample route for testing
app.post('/api/auth', (req, res) => {
    const { username, email, password } = req.body;
    // Handle signup logic
    res.status(200).json({ message: 'User signed up successfully!' });
});



// Routes
const authRoutes = require('./auth');
const appointmentRouter = require('./appointment');
const paymentRoutes = require('./payment');

app.use('/api', authRoutes);
app.use('/api/appointments', appointmentRouter);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
    res.send('hello world')
  })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
