import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import HotelList from './components/HotelList';
import BookHotel from './components/BookHotel';
import Checkin from './components/Checkin';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/book/:hotelId" element={<BookHotel />} />
        <Route path="/checkin/:bookingId" element={<Checkin />} />
      </Routes>
    </Router>
  );
}

export default App;
