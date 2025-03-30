import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/getuser/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) return <h3 className="text-center text-gray-500">Loading...</h3>;
    if (error) return <h3 className="text-center text-red-500">Error: {error}</h3>;
    if (!user) return <h3 className="text-center text-gray-500">User Not Found</h3>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <button 
                    className="flex items-center text-gray-500 hover:text-gray-700 mb-4" 
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </button>
                
                <div className="flex flex-col items-center">
                    <img 
                        src={`http://localhost:5000/uploads/${user.coverImage}`} 
                        alt="User" 
                        className="w-24 h-24 object-cover rounded-full border-4 border-blue-300 shadow-md" 
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.FirstName} {user.LastName}</h2>
                    <p className="text-gray-500">User Details</p>
                </div>
                
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600 font-medium">First Name:</span>
                        <span className="text-gray-800">{user.FirstName}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600 font-medium">Last Name:</span>
                        <span className="text-gray-800">{user.LastName}</span>
                    </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                    <button 
                        onClick={() => navigate(`/edit-user/${id}`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        Edit User
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
