import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/hotels').then(res => setHotels(res.data));
  }, []);

  return (
    <div>
      <h2>Hotels</h2>
      {hotels.map(hotel => (
        <div key={hotel.id} style={{ border: '1px solid black', padding: '10px' }}>
          <h3>{hotel.name}</h3>
          <p>{hotel.location} - ₹{hotel.price_per_night} per night</p>
          <button onClick={() => navigate(`/book/${hotel.id}`)}>Book</button>
        </div>
      ))}
    </div>
  );
}
