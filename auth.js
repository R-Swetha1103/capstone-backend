
// auth.js
const express = require('express');
const router = express();

// Dummy user data for demo purposes
const users = [];
// Signup Route
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(400).json({ message: 'User already exists!' });
    }

    users.push({ name, email, password });
    return res.status(201).json({ message: 'User created successfully!' });
});

// Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        return res.status(200).json({ message: 'Login successful!' });
    } else {
        return res.status(401).json({ message: 'Invalid email or password!' });
    }
});

module.exports = router;
