import { useState ,useEffect,axiosInstance,setUser} from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate(); 
   const { user } = useAuth();// <-- Add this line
  const isActive = (path) => location.pathname === path ? "text-blue-500 font-bold" : "text-gray-700";

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    LogOut(); // Ensure this also clears context if needed
    navigate("/"); // Redirect to home page
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const res = await axiosInstance.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data?.profile_pic) {
          setUser((prev) => ({ ...prev, profile_pic: res.data.profile_pic }));
        }
      } catch (err) {
        console.error("Failed to fetch profile picture:", err);
      }
    };
  
    if (!user?.profile_pic) fetchUserProfile();
  }, []);
  
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
            {/* <NavLink to="/RoomOwnerDashboard" currentPath={location.pathname} className="font-normal">
    Dashboard
  </NavLink> */}
  <Link to="/RoomOwnerDashboard" className={`hover:text-blue-500 font-medium ${isActive("/RoomOwnerDashboard")}`}>
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
  src={user?.profile_pic || "/profile.png"} 
  className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400 transition duration-200 object-cover" 
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


        {/* Mobile Menu Button */}
        {/* <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div> */}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4 border-t pt-4">
         <Link to="/RoomOwnerDashboard" className={`hover:text-blue-500 font-medium ${isActive("/RoomOwnerDashboard")}`}>
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
            Massages
            </Link>
  
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
