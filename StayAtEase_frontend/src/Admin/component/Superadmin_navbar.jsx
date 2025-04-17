import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const Superadmin_navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/profile.png");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path ? "text-blue-500 font-bold" : "text-gray-700";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/users/profile');
        if (response.data.user.profile_pic) {
          setProfileImage(response.data.user.profile_pic);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2">
          <img src="../public/logo/StayAtEase.png" alt="StayAtEase" className="h-8" />
          <span className="text-xl font-bold">StayAtEase</span>
        </a>

        {/* Desktop Menu - Right Aligned */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-4">
            <Link to="/SuperadminDashboard" className={`hover:text-blue-500 font-medium ${isActive("/SuperadminDashboard")}`}>
              Dashboard
            </Link>
            <Link to="/PropertyForm" className={`hover:text-blue-500 font-medium ${isActive("/PropertyForm")}`}>
              Add Properties
            </Link>
            <Link to="/PropertyListings" className={`hover:text-blue-500 font-medium ${isActive("/PropertyListings")}`}>
              My Listing
            </Link>
            <Link to="/PropertyReviews" className={`hover:text-blue-500 font-medium ${isActive("/PropertyReviews")}`}>
              Reviews
            </Link>
            <Link to="/Massages" className={`hover:text-blue-500 font-medium ${isActive("/Massages")}`}>
              Messages
            </Link>
          </div>

          {/* User Profile + Logout */}
          <div className="flex items-center space-x-3">
            <Link to="/Myprofile">
              <img 
                src={profileImage} 
                className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 transition duration-200" 
                alt="User" 
              />
            </Link>
            <Link to="/" className="text-red-500 hover:text-red-600" onClick={handleLogout}>
              <LogOut size={22} />
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4 border-t pt-4">
          <Link to="/SuperadminDashboard" className={`hover:text-blue-500 font-medium ${isActive("/SuperadminDashboard")}`}>
            Dashboard
          </Link>
          <Link to="/PropertyForm" className={`hover:text-blue-500 font-medium ${isActive("/PropertyForm")}`}>
            Add Properties
          </Link>
          <Link to="/PropertyListings" className={`hover:text-blue-500 font-medium ${isActive("/PropertyListings")}`}>
            My Listing
          </Link>
          <Link to="/PropertyReviews" className={`hover:text-blue-500 font-medium ${isActive("/PropertyReviews")}`}>
            Reviews
          </Link>
          <Link to="/Massages" className={`hover:text-blue-500 font-medium ${isActive("/Massages")}`}>
            Messages
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Superadmin_navbar; 