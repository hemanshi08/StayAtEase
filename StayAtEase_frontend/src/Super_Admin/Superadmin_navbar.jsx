import { useState } from "react";
// import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { Link ,useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SuperAdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // <-- Add this line
  const isActive = (path) => location.pathname === path ? "text-blue-500 font-bold" : "text-gray-700";

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    logout(); // Ensure this also clears context if needed
    navigate("/"); // Redirect to home page
  };

  return (
    <>
<nav className="bg-white shadow-md p-4 fixed top-0 left-0 w-full z-50">
<div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <img src="../public/logo/StayAtEase.png" alt="StayAtEase" className="h-8" />
            <span className="text-xl font-bold">StayAtEase</span>
          </a>

        {/* Desktop Menu */}
        <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-4">
            <Link to="/Dashboard" className={`hover:text-blue-500 font-medium ${isActive("/Dashboard")}`}>
              Dashboard
            </Link>
            <Link to="/TotalUser" className={`hover:text-blue-500 font-medium ${isActive("/TotalUser")}`}>
              Users
            </Link>
            <Link to="/TotalProperties" className={`hover:text-blue-500 font-medium ${isActive("/TotalProperties")}`}>
            Properties
            </Link>
            <Link to="/TotalRoomOwner" className={`hover:text-blue-500 font-medium ${isActive("/TotalRoomOwner")}`}>
           RoomOwners
            </Link>
            <Link to="/TotalReviews" className={`hover:text-blue-500 font-medium ${isActive("/TotalReviews")}`}>
            Reviews
            </Link>
            </div>


        {/* Profile & Logout */}
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <img 
        src="../public/profile_image/team-1.jpg" 
        alt="Admin Profile" 
        className="w-8 h-8 rounded-full border cursor-pointer"
        onClick={() => navigate('/superadmin_profiledetails')} // Change '/profile' to your actual profile page route
      />

          {/* Logout Button */}
          <button className="text-red-800 hover:text-red-600 cursor-pointer" onClick={handleLogout}>
  <LogOut size={20} stroke="red" />
</button>


          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>
</div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start space-y-4 mt-4 pl-4">
          <Link to="/Dashboard" className={`hover:text-blue-500 font-medium ${isActive("/Dashboard")}`}>
              Dashboard
            </Link>
            <Link to="/TotalUser" className={`hover:text-blue-500 font-medium ${isActive("/TotalUser")}`}>
              Total User
            </Link>
            <Link to="/TotalProperties" className={`hover:text-blue-500 font-medium ${isActive("/TotalProperties")}`}>
            TotalProperties
            </Link>
            <Link to="/TotalRoomOwner" className={`hover:text-blue-500 font-medium ${isActive("/TotalRoomOwner")}`}>
            Total RoomOwner
            </Link>
            <Link to="/TotalReviews" className={`hover:text-blue-500 font-medium ${isActive("/TotalReviews")}`}>
            Reviews
            </Link>
            
          {/* <button className="text-red-500 hover:text-red-600" onClick={handleLogout}>
            <LogOut size={20} />
          </button> */}
        </div>
      )}
    </nav>
    </>
  );
}
