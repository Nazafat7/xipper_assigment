import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Checkin() {
  const { bookingId } = useParams();
  const [members, setMembers] = useState([{ name: '', aadhaar: '' }]);

  const handleChange = (index, key, value) => {
    const updated = [...members];
    updated[index][key] = value;
    setMembers(updated);
  };

  const addMember = () => {
    setMembers([...members, { name: '', aadhaar: '' }]);
  };

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/web-checkin', {
      booking_id: bookingId,
      members,
    });
    alert('Web Check-in done!');
  };

  return (
    <div>
      <h2>Web Check-in</h2>
      {members.map((member, index) => (
        <div key={index}>
          <input placeholder="Name" value={member.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
          <input placeholder="Aadhaar" value={member.aadhaar} onChange={(e) => handleChange(index, 'aadhaar', e.target.value)} />
        </div>
      ))}
      <button onClick={addMember}>Add Member</button>
      <button onClick={handleSubmit}>Submit Check-in</button>
    </div>
  );
}
