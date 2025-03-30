import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Trash2, Pencil, Search } from "lucide-react";

export default function ReadPage() {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTabular, setIsTabular] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const usersPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/getusers");
                setUsersData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleToggleChange = () => {
        setIsTabular(!isTabular);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            setUsersData(usersData.filter((user) => user._id !== id));
            navigate("/dashboard")
        } catch (err) {
            alert("Error deleting user: " + err.message);
        }
    };

    const filteredUsers = usersData.filter(user => 
        user.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.LastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading) return <h3 className="text-center">Loading...</h3>;
    if (error) return <h3 className="text-center text-red-500">Error: {error.message}</h3>;
    if (!usersData || usersData.length === 0) return <h3 className="text-center text-gray-500">No Users Found</h3>;

    return (
        <>
            <Navbar />
            <h1 className="mt-10 flex justify-center text-2xl text-blue-500 font-semibold">Select Your Format</h1>
            <div className="flex justify-center mt-6 items-center gap-4">
                <h2>Cards Format</h2>
                <input type="checkbox" className="toggle bg-indigo-500 border-indigo-600 checked:bg-orange-400" onClick={handleToggleChange} />
                <h2>Tabular Format</h2>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center mt-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute right-2 top-2 text-gray-400" />
                </div>
            </div>

            {isTabular ? (
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 md:gap-3 p-4 mt-8 mb-10">
                    {currentUsers.map((user) => (
                        <Link to={`/user/${user._id}`} key={user._id} className="block">
                            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:scale-105 transition-transform">
                                <img src={`http://localhost:5000/uploads/${user.coverImage}`} alt="User" className="w-20 h-20 object-cover rounded-full border-2 border-gray-300" />
                                <h3 className="font-semibold text-gray-800 text-center mt-2">{user.FirstName} {user.LastName}</h3>
                                <p className="text-sm text-gray-500">View Details</p>
                                <div className="flex gap-3 mt-3">
                                    <button className="text-red-600 hover:bg-red-100 p-2 rounded" onClick={() => handleDelete(user._id)}><Trash2 className="w-5 h-5" /></button>
                                    <button className="text-blue-500 hover:bg-blue-100 p-2 rounded" onClick={() => navigate(`/edit-user/${user._id}`)}><Pencil className="w-5 h-5" /></button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto p-4">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="py-3 px-6 text-left font-semibold">Profile</th>
                                <th className="py-3 px-6 text-left font-semibold">First Name</th>
                                <th className="py-3 px-6 text-left font-semibold">Last Name</th>
                                <th className="py-3 px-6 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50 transition duration-200">
                                    <td className="py-4 px-6 text-center">
                                        <img src={`http://localhost:5000/uploads/${user.coverImage}`} alt="User" className="w-12 h-12 object-cover rounded-full border border-gray-300" />
                                    </td>
                                    <td className="py-4 px-6">{user.FirstName}</td>
                                    <td className="py-4 px-6">{user.LastName}</td>
                                    <td className="py-4 px-6 flex justify-center">
                                        <button className="text-red-600 hover:bg-red-100 p-2 rounded" onClick={() => handleDelete(user._id)}><Trash2 className="w-5 h-5" /></button>
                                        <button className="text-blue-500 hover:bg-blue-100 p-2 rounded" onClick={() => navigate(`/edit-user/${user._id}`)}><Pencil className="w-5 h-5" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-center mt-6">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 mx-2 bg-gray-200 rounded">Previous</button>
                <span className="px-4">Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 mx-2 bg-gray-200 rounded">Next</button>
            </div>
        </>
    );
}
