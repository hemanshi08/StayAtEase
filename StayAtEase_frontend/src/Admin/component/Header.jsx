import { useState } from "react";
import { Menu, X } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 w-full">
      <div className="container-fluid flex justify-between items-center px-0">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 no-underline">
          <img src="../public/logo/StayAtEase.png" alt="StayAtEase" className="h-8" />
          <span className="text-xl font-bold">StayAtEase</span>
        </a>

        {/* Desktop Menu */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-500 font-medium no-underline">Dashboard</a>
            <a href="#" className="hover:text-blue-500 font-medium no-underline">Add Properties</a>
            <a href="#" className="hover:text-blue-500 font-medium no-underline">My Listing</a>
            <a href="#" className="hover:text-blue-500 font-medium no-underline">Reviews</a>
            <div className="d-flex align-items-center">
              <img src="../profile.png" className="rounded-circle me-2" alt="User" width="50" height="50" />
              <a href="#" className="text-danger text-decoration-none">
                <i className="fas fa-sign-out-alt fa-lg"></i>
              </a>
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
          <a href="#" className="hover:text-blue-500 font-medium no-underline">Dashboard</a>
          <a href="#" className="hover:text-blue-500 font-medium no-underline">Add Properties</a>
          <a href="#" className="hover:text-blue-500 font-medium no-underline">My Listing</a>
          <a href="#" className="hover:text-blue-500 font-medium no-underline">Reviews</a>
          <div className="d-flex align-items-center">
            <img src="https://via.placeholder.com/40" className="rounded-circle me-2" alt="User" />
            <a href="#" className="text-danger text-decoration-none">
              <i className="fas fa-sign-out-alt fa-lg"></i>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
