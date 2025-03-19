import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current route

  return (
    <nav className="bg-white shadow-md py-3 w-full">
      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* Logo */}
        <Link to="/"  className="flex items-center space-x-2 no-underline text-decoration-none">
          <img src="/logo/StayAtEase.png" alt="StayAtEase" className="h-10" /> <span className="text-xl font-bold">StayAtEase</span>
        </Link>

        {/* Desktop Menu - Right Aligned */}
        <div className="hidden md:flex items-center space-x-8 text-gray-500 ml-auto font-normal">
  <NavLink to="/Dashboard" currentPath={location.pathname} className="font-normal">
    Dashboard
  </NavLink>
  <NavLink to="/PropertyForm" currentPath={location.pathname} className="font-normal">
    Add Properties
  </NavLink>
  <NavLink to="/PropertyListings" currentPath={location.pathname} className="font-normal">
    My Listing
  </NavLink>
  <NavLink to="/PropertyReviews" currentPath={location.pathname} className="font-normal">
    Reviews
  </NavLink>
  <NavLink to="/Massages" currentPath={location.pathname} className="font-normal">
    Massages
  </NavLink>

  {/* User Profile + Logout */}
  <div className="flex items-center space-x-3">
    
  <Link to="/Myprofile">
  <img 
    src="/profile.png" 
    className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 transition duration-200" 
    alt="User" 
  />
</Link> 
   <Link to="/HomePage" className="text-red-500 hover:text-red-600">
      <LogOut size={22} />
    </Link>
  </div>
</div>


        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4 border-t pt-4">
          <NavLink to="/" currentPath={location.pathname}>Dashboard</NavLink>
          <NavLink to="/PropertyForm" currentPath={location.pathname}>Add Properties</NavLink>
          <NavLink to="/PropertyListings" currentPath={location.pathname}>My Listing</NavLink>
          <NavLink to="/PropertyReviews" currentPath={location.pathname}>Reviews</NavLink>
        </div>
      )}
    </nav>
  );
}

// Reusable NavLink component to highlight active page
const NavLink = ({ to, currentPath, children }) => (
  <Link
    to={to}
    className={`uppercase font-bold ${
      currentPath === to ? "text-blue-600" : "text-gray-900 hover:text-blue-500"
    }`}
  >
    {children}
  </Link>
);
