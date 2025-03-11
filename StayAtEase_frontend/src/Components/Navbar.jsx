import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2">
          <img src="../public/logo/StayAtEase.png" alt="StayAtEase" className="h-8" />
          <span className="text-xl font-bold">StayAtEase</span>
        </a>

        {/* Desktop Menu */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
          <Link to="/home" className="hover:text-blue-500 font-medium">Home</Link>            <a href="#" className="hover:text-blue-500 font-medium">Properties</a>
            <a href="#" className="hover:text-blue-500 font-medium">Wishlist</a>
          </div>
        {/* Login Button */}
        <a href="#" className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md">Login</a>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
         <a href="../rental/home.jsx" className="hover:text-blue-500 font-medium">Home</a>
          <a href="" className="hover:text-blue-500 font-medium">Properties</a>
          <a href="#" className="hover:text-blue-500 font-medium">Wishlist</a>
          
            <a href="#" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md">Login</a>
          
        </div>
      )}
    </nav>
  );
}