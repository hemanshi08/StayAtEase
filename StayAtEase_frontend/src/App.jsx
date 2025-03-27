import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Admin/component/header";
import Dashboard from "./Admin/dashboard";
import PropertyReviews from "./Admin/Reviews";
import PropertyForm from "./Admin/AddProperty";
import PropertyListings from "./Admin/PropertyListings";
import Footer from "./Components/Footer";
import PropertyCard from "./Components/Property_card";
import HomePage from "./rental/home";
import ProfileDetails from "./Admin/profileDetails";
import AdminPropertyDetails from "./Admin/admin-propertydetails";


function App() {
  return (
    <Router>
<Routes>
<Route path="/" element={<PropertyMessages />} />
  <Route path="/Dashboard" element={<Dashboard />} />
  <Route path="/PropertyReviews" element={<PropertyReviews />} />
  <Route path="/propertyform" element={<PropertyForm />} />
  <Route path="/propertylistings" element={<PropertyListings />} />
  <Route path="/Massages" element={<PropertyMessages />} />
  <Route path="/MyProfile" element={<ProfileDetails />} />
  <Route path="/Homepage" element={<HomePage />} />
  <Route path="/PropertyDetails" element={<AdminPropertyDetails />} />
</Routes>
   
    </Router>
  );
}

export default App;
