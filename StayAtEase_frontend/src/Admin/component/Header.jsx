import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 w-full">
      <div className="container-fluid flex justify-between items-center px-0">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 no-underline text-decoration-none">
          <img src="/logo/StayAtEase.png" alt="StayAtEase" className="h-8" />
          <span className="text-xl font-bold">StayAtEase</span>
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-500 font-medium no-underline text-decoration-none">Dashboard</Link>
            <Link to="/PropertyForm" className="hover:text-blue-500 font-medium no-underline text-decoration-none">Add Properties</Link>
            <Link to="/PropertyListings" className="hover:text-blue-500 font-medium no-underline text-decoration-none">My Listing</Link>
            <Link to="/PropertyReviews" className="hover:text-blue-500 font-medium no-underline text-decoration-none">Reviews</Link>
            <div className="d-flex align-items-center">
              <img src="/profile.png" className="rounded-circle me-2" alt="User" width="50" height="50" />
              <Link to="/homepage" className="text-danger no-underline">
                <i className="fas fa-sign-out-alt fa-lg"></i>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link to="/" className="hover:text-blue-500 font-medium no-underline text-decoration-none">Dashboard</Link>
          <Link to="/add-properties" className="hover:text-blue-500 font-medium no-underline text-decoration-none">Add Properties</Link>
          <Link to="/my-listing" className="hover:text-blue-500 font-medium no-underline text-decoration-none">My Listing</Link>
          <Link to="/reviews" className="hover:text-blue-500 font-medium no-underline text-decoration-none">Reviews</Link>
          <div className="d-flex align-items-center">
            <img src="/profile.png" className="rounded-circle me-2" alt="User" />
            <Link to="/homepage" className="text-danger no-underline">
              <i className="fas fa-sign-out-alt fa-lg"></i>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
