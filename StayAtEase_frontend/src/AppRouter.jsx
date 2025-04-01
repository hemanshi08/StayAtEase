// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

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


import Header from "./Admin/component/header";
import RoomOwnerDashboard from "./Admin/dashboard";
import PropertyReviews from "./Admin/PropertyReviews";
import PropertyForm from "./Admin/AddProperty";
import PropertyListings from "./Admin/PropertyListings";

import RoomOwnerProfileDetails from "./Admin/profileDetails";
import AdminPropertyDetails from "./Admin/admin-propertydetails";
import PropertyMessages from "./Admin/PropertyMessages";
function AppRouter(){
  return (
   
   <Router>
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

{/* Owner routes */}

<Route path="/" element={<PropertyMessages />} />
<Route path="/RoomOwnerDashboard" element={<RoomOwnerDashboard />} /> {/* New Route */}
  <Route path="/PropertyReviews" element={<PropertyReviews />} />
  <Route path="/propertyform" element={<PropertyForm />} />
  <Route path="/propertylistings" element={<PropertyListings />} />
  <Route path="/Massages" element={<PropertyMessages />} />
  <Route path="/MyProfile" element={<RoomOwnerProfileDetails />} />
  <Route path="/Homepage" element={<HomePage />} />
  <Route path="/PropertyDetails" element={<AdminPropertyDetails />} />
</Routes>
          
</Router>   
 
   
  );
}

export default AppRouter;
