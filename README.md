# xipper_assigment
A simple full-stack web app that allows users to register, book hotels, and check in family members using Aadhaar numbers.

# Tech Stack
Frontend: React (with React Router)
Backend: Node.js + Express
Database: PostgreSQL
HTTP Client: Axios
Tooling: DBViewer, Postman

# Features
User registration using email & password
Browse and book hotels
Web check-in with Aadhaar for all family members
Data stored in PostgreSQL
APIs tested via Postman
Static JSON data hosted locally

# To start the project
Clone the repo
https://github.com/Nazafat7/xipper_assigment.git

# Backend Setup
cd backend
npm install

# Create a .env file:
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hotelbooking

# Start the backend:
node server.js

# Frontend Setup
cd frontend
npm install
npm start

# Database Setup
Login to PostgreSQL and run:
Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Hotels table
CREATE TABLE hotels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    description TEXT,
    price_per_night NUMERIC(10, 2)
);

Bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
    check_in_date DATE,
    check_out_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Check-ins table
CREATE TABLE checkins (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    aadhaar_number VARCHAR(12),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




