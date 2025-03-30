import React, { use } from 'react';
import userImage from "../assets/HeroImg.jpg";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate=useNavigate()
  const handleClick=()=>{
    
    navigate("/dashboard")

  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
      
      {/* Left Side - Image */}
      <div className="flex justify-center">
        <img 
          src={userImage} 
          alt="User Management" 
          className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="text-center md:text-left space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Streamline Your <span className="text-blue-500">User Management</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Simplify and automate your user data management effortlessly. Our system helps you track, edit, and organize user information in real time.
        </p>
        
        {/* Call-to-Action Button */}
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={handleClick}>
          Get Started
        </button>
      </div>

    </div>
  );
};

export default HeroSection;
