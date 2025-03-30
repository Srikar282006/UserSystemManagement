// UserList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card.jsx'; // Import the Card component

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/getusers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCardClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/getuser/${userId}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {users.map((user) => (
          <Card key={user._id} user={user} onClick={handleCardClick} />
        ))}
      </div>

      {selectedUser && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h2>User Details</h2>
          <img src={`http://localhost:5000/uploads/${selectedUser.coverImage}`} alt="User" style={{ maxWidth: '200px' }} />
          <p>First Name: {selectedUser.FirstName}</p>
          <p>Last Name: {selectedUser.LastName}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default UserList;