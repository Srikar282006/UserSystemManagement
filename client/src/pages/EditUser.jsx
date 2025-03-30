import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ FirstName: "", LastName: "" });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/getuser/${id}`);
        setUser(response.data);
      } catch (err) {
        setError("Error fetching user data");
      }
    };
    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("FirstName", user.FirstName);
    formData.append("LastName", user.LastName);
    if (file) formData.append("file", file);

    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Error updating user");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Edit User</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">First Name</label>
            <input
              type="text"
              name="FirstName"
              className="border rounded w-full py-2 px-3"
              value={user.FirstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Last Name</label>
            <input
              type="text"
              name="LastName"
              className="border rounded w-full py-2 px-3"
              value={user.LastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Update Profile Picture</label>
            <input type="file" className="w-full" onChange={handleFileChange} accept="image/*" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
