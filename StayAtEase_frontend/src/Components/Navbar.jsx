import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginPage";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path ? "text-blue-500 font-bold" : "text-gray-700";

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    logout();
    navigate("/");
  };

  return (
    <>
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
      {/* <nav className="w-full bg-white shadow-md p-4"> */}
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <img src="../public/logo/StayAtEase.png" alt="StayAtEase" className="h-8" />
            <span className="text-xl font-bold">StayAtEase</span>
          </a>

          {/* Desktop Menu */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
            <Link to="/" className={`hover:text-blue-500 font-medium ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/properties" className={`hover:text-blue-500 font-medium ${isActive("/properties")}`}>
              Properties
            </Link>
            <Link to="/wishlist" className={`hover:text-blue-500 font-medium ${isActive("/wishlist")}`}>
              Wishlist
            </Link>
            </div>

            {/* Auth Button */}
            {user && user.userType === "tenant" ? (
              <div className="flex items-center -space-x-2">
                      <Link to="/profilepage">
  <img 
    src="/profile.png" 
    className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 transition duration-200" 
    alt="User" 
  />
</Link> 
                <span className="text-white">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <LogOut size={20} className="text-red-500" />
                  <span className="text-red-500">Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 !text-white  rounded-lg shadow-md"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
            <Link to="/" className={`hover:text-blue-500 font-medium ${isActive("/")}`}>Home</Link>
            <Link to="/properties" className={`hover:text-blue-500 font-medium ${isActive("/properties")}`}>Properties</Link>
            <Link to="/wishlist" className={`hover:text-blue-500 font-medium ${isActive("/wishlist")}`}>Wishlist</Link>
            
            {user ? (
              <div className="flex flex-col items-center space-y-4 w-full">
               <Link to="/profilepage">
  <img 
    src="/profile.png" 
    className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 transition duration-200" 
    alt="User" 
  />
</Link> 
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-red-600 hover:text-red-700"
                >
                  <LogOut size={20} className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 !text-white rounded-lg shadow-md"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      {/* ✅ Include LoginModal and pass modal state */}
      <LoginModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)} />
    </>
  );
}
