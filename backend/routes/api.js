const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO users(email, password) VALUES($1, $2)', [email, hash]);
  res.send({ message: 'User registered' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userRes = await db.query('SELECT * FROM users WHERE email=$1', [email]);
  const user = userRes.rows[0];

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.send({ id: user.id, email: user.email, token });
  } else {
    res.status(401).send({ error: 'Invalid credentials' });
  }
});

// Get Hotels
router.get('/hotels', async (req, res) => {
  const hotels = await db.query('SELECT * FROM hotels');
  res.send(hotels.rows);
});

// Book Hotel
router.post('/book-hotel', async (req, res) => {
  const { user_id, hotel_id } = req.body;
  const result = await db.query(
    'INSERT INTO bookings(user_id, hotel_id) VALUES($1, $2) RETURNING id',
    [user_id, hotel_id]
  );
  res.send({ message: 'Booked', id: result.rows[0].id });
});

// Web Check-in
router.post('/web-checkin', async (req, res) => {
  const { booking_id, members } = req.body;

  for (const m of members) {
    await db.query(
      'INSERT INTO checkins(booking_id, full_name, aadhaar_number) VALUES($1, $2, $3)',
      [booking_id, m.name, m.aadhaar]
    );
  }

  res.send({ message: 'Check-in complete' });
});

module.exports = router;
