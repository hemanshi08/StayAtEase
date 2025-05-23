import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SuperAdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path ? "text-blue-500 font-bold" : "text-gray-700";

  // Fetch admin data when the component mounts
  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/admin/getdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.admin) {
          // If profile_pic is not an absolute URL, prepend the server URL
          const imageUrl = data.admin.profile_pic.startsWith('http')
            ? data.admin.profile_pic
            : `http://localhost:5000/${data.admin.profile_pic}`;
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    logout();
    navigate("/login");
  };

  return (
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
              Tenant
            </Link>
            <Link to="/TotalRoomOwner" className={`hover:text-blue-500 font-medium ${isActive("/TotalRoomOwner")}`}>
              Property_Owners
            </Link>
            <Link to="/TotalProperties" className={`hover:text-blue-500 font-medium ${isActive("/TotalProperties")}`}>
              Properties
            </Link>
            <Link to="/TotalReviews" className={`hover:text-blue-500 font-medium ${isActive("/TotalReviews")}`}>
              Reviews
            </Link>
            <Link to="/TotalInquiry" className={`hover:text-blue-500 font-medium ${isActive("/TotalInquiry")}`}>
              Messages
            </Link>
          </div>

          {/* Profile & Logout */}
          <div className="flex items-center space-x-4">
            {/* Profile Picture */}
            <img
              src={profileImage || "../public/profile_image/team-1.jpg"}
              alt="Admin Profile"
              className="w-8 h-8 rounded-full border cursor-pointer"
              onClick={() => navigate('/superadmin_profiledetails')}
            />

            {/* Logout Button */}
            <button
              className="text-red-800 hover:text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
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

          <button
            className="text-red-500 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut size={20} />
          </button>
        </div>
      )}
    </nav>
  );
}
