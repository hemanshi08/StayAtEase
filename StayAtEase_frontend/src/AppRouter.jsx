// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";


import HomePage from "./rental/home";
import About from "./rental/PropertyPage";
import PropertyPage from "./rental/PropertyPage";
import WishlistPage from "./rental/WishlistPage";
// import LoginPage from "./Components/LoginPage";
import PropertyDetails from "./rental/PropertyDetailsPage";
import Dashboard from "./Super_Admin/Dashboard";
import TotalProperties from "./Super_Admin/TotalProperties";
import TotalUser from "./Super_Admin/TotalUser";
import TotalRoomOwner from "./Super_Admin/TotalRoomOwner";
import TotalReviews from "./Super_Admin/TotalReviews";
import ProfileDetails from "./Super_Admin/superadmin_profiledetails";
import ShowProperty from "./Super_Admin/ShowProperty";
import EditUser from "./Super_Admin/EditUsers";
import SuperAdminPropertyDetails from "./Super_Admin/AdminPropertydetails";

import Header from "./Admin/component/header";
import RoomOwnerDashboard from "./Admin/dashboard";
import PropertyReviews from "./Admin/PropertyReviews";
import PropertyForm from "./Admin/AddProperty";
import PropertyListings from "./Admin/PropertyListings";
import RommOwnerProfileDetails from "./Admin/ProfileDetails";
import AdminPropertyDetails from "./Admin/admin-propertydetails";
import PropertyMessages from "./Admin/PropertyMessages";
import TenantLayout from "./Layouts/TenantLayout";
import ProtectedRoute from './Layouts/ProtectedRoute';
import UserProfile from "./Components/UserProfile";
function AppRouter(){
  return (
   
   <Router>
      <Routes>
        <Route path='/' element={<TenantLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="properties" element={<PropertyPage />} />
          <Route path="wishlist" element={<ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>} />
          <Route path="property/:id" element={<PropertyDetails />} />
          <Route path="UserProfile" element={<UserProfile />} />
        </Route>

        {/* Router for superAdmin */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/TotalProperties" element={<TotalProperties />} />
        <Route path="/TotalUser" element={<TotalUser />} />
        <Route path="/TotalRoomOwner" element={<TotalRoomOwner />} />
        <Route path="/TotalReviews" element={<TotalReviews />} />
        <Route path="/superadmin_profiledetails" element={<ProfileDetails />} />
        <Route path="/ShowProperty" element={<ShowProperty />} />
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="/AdminPropertydetails/:id" element={<SuperAdminPropertyDetails />} />
        <Route path="/TotalInquiry" element={<TotalInquiry />} />

        {/* Owner routes */}
        <Route path="/RoomOwnerDashboard" element={<RoomOwnerDashboard />} />
        <Route path="/PropertyReviews" element={<PropertyReviews />} />
        <Route path="/propertyform" element={<PropertyForm />} />
        <Route path="/propertylistings" element={<PropertyListings />} />
        <Route path="/Massages" element={<PropertyMessages />} />
        <Route path="/MyProfile" element={<RommOwnerProfileDetails />} />
        <Route path="/PropertyDetails" element={<AdminPropertyDetails />} />
        <Route path="/admin-propertydetails/:id" element={<AdminPropertyDetails />} />
        <Route path="/PropertyMessages" element={<PropertyMessages />} />
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>   
 
   
  );
}

export default AppRouter;