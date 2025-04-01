// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import PropertyCard from "./Components/Property_card";
import HomePage from "./rental/home";
import About from "./rental/PropertyPage";
import PropertyPage from "./rental/PropertyPage";
import WishlistPage from "./rental/WishlistPage";
import LoginPage from "./Components/LoginPage";
import PropertyDetails from "./rental/PropertyDetailsPage";
import Dashboard from "./Super_Admin/Dashboard";
import TotalProperties from "./Super_Admin/TotalProperties";
import TotalUser from "./Super_Admin/TotalUser";
import TotalRoomOwner from "./Super_Admin/TotalRoomOwner";
import TotalReviews from "./Super_Admin/TotalReviews";
import ProfileDetails from "./Super_Admin/superadmin_profiledetails";
import ShowProperty from "./Super_Admin/ShowProperty";
import EditUser from "./Super_Admin/EditUsers";
function AppRouter(){
  return (
   
   
      <Routes>
        <Route path='/' element={<Navigate replace to='/home'/>}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/properties" element={<PropertyPage />} />
        <Route path="/Wishlist" element={<WishlistPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />


              {/* Router for superAdmin */}


        <Route path="/Dashboard" element={<Dashboard />} /> {/* New Route */}
        <Route path="/TotalProperties" element={<TotalProperties />} /> {/* New Route */}
        <Route path="/TotalUser" element={<TotalUser />} /> {/* New Route */}
        <Route path="/TotalRoomOwner" element={<TotalRoomOwner />} /> {/* New Route */}
        <Route path="/TotalReviews" element={<TotalReviews />} /> {/* New Route */}
        <Route path="/superadmin_profiledetails" element={<ProfileDetails />} /> {/* New Route */}
        <Route path="/ShowProperty" element={<ShowProperty />} />
        <Route path="/edit-user" element={<EditUser />} />


          
      </Routes>
 
   
  );
}

export default AppRouter;
