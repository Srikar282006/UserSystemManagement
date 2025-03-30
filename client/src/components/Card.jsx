// Card.jsx
import React from 'react';

const Card = ({ user, onClick }) => {
  return (
    <div onClick={() => onClick(user._id)} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', cursor: 'pointer' }}>
      <img src={`http://localhost:5000/uploads/${user.coverImage}`} alt="User" style={{ maxWidth: '100px' }} />
      <p>First Name: {user.FirstName}</p>
      <p>Last Name: {user.LastName}</p>
    </div>
  );
};

export default Card;