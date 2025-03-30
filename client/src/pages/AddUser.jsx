import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FirstName", FirstName);
    formData.append("LastName", LastName);
    if (file) formData.append("file", file);

    console.log("Form Data:", [...formData.entries()]);
    console.log("FirstName:", FirstName);
    console.log("LastName:", LastName);
    console.log("File:", file);

    try {
        await axios.post("http://localhost:5000/api/users/adddata", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        navigate("/dashboard");
    } catch (err) {
        console.error("Error:", err.response?.data);
        setError(err.response?.data?.message || "Error adding user");
    }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add User</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">First Name</label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Last Name</label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Upload Profile Picture</label>
            <input type="file" className="w-full" onChange={handleFileChange} accept="image/*" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
