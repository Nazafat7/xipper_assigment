import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookHotel() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleBooking = async () => {
    const res = await axios.post('http://localhost:5000/book-hotel', {
      user_id: user.id,
      hotel_id: hotelId
    });
    alert('Booking successful!');
    navigate(`/checkin/${res.data.id}`);
  };

  return (
    <div>
      <h2>Confirm Booking</h2>
      <p>Hotel ID: {hotelId}</p>
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
}
