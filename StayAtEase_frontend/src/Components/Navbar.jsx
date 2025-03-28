import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link ,useLocation } from "react-router-dom";
import LoginModal from "./LoginPage";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "text-blue-500 font-bold" : "text-gray-700";
  return (
    <>
    {/* <nav className="fixed top-0.5 left-0 w-full bg-white shadow-md p-4 z-50"></nav> */}
      <nav className=" bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <img src="../public/logo/StayAtEase.png" alt="StayAtEase" className="h-8" />
            <span className="text-xl font-bold">StayAtEase</span>
          </a>

          {/* Desktop Menu */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
            <Link to="/home" className={`hover:text-blue-500 font-medium ${isActive("/home")}`}>
              Home
            </Link>
            <Link to="/properties" className={`hover:text-blue-500 font-medium ${isActive("/properties")}`}>
              Properties
            </Link>
            <Link to="/wishlist" className={`hover:text-blue-500 font-medium ${isActive("/wishlist")}`}>
              Wishlist
            </Link>
            </div>

            {/* Login Button */}
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 !text-white  rounded-lg shadow-md">
              Login
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
            <Link to="/home" className={`hover:text-blue-500 font-medium ${isActive("/home")}`}>Home</Link>
            <Link to="/properties" className={`hover:text-blue-500 font-medium${isActive("/properties") || isActive("/ShowProperty")}`}>Properties</Link>
            <Link to="/wishlist" className={`hover:text-blue-500 font-medium ${isActive("/wishlist")}`}>Wishlist</Link>
            
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 !text-white  rounded-lg shadow-md"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      {/* ✅ Include LoginModal and pass modal state */}
      <LoginModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)} />
    </>
  );
}
