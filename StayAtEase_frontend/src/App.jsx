import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Admin/component/header";
import Dashboard from "./Admin/dashboard";
import PropertyReviews from "./Admin/PropertyReviews";
import PropertyMessages from "./Admin/PropertyMessages";
import PropertyListings from "./Admin/PropertyListings";
import PropertyForm from "./Admin/AddProperty";
import Footer from "./Components/Footer";
import HomePage from "./rental/home";
import ProfileDetails from "./Admin/profileDetails";
import PropertyDetails from "./Admin/propertydetails";


function App() {
  return (
    <Router>
     
<Routes>
<Route path="/" element={<Dashboard />} />
  <Route path="/Dashboard" element={<Dashboard />} />
  <Route path="/PropertyReviews" element={<PropertyReviews />} />
  <Route path="/propertyform" element={<PropertyForm />} />
  <Route path="/propertylistings" element={<PropertyListings />} />
  <Route path="/Massages" element={<PropertyMessages />} />
  <Route path="/MyProfile" element={<ProfileDetails />} />
  <Route path="/Homepage" element={<HomePage />} />
  <Route path="/PropertyDetails" element={<PropertyDetails />} />
</Routes>
   
    </Router>
  );
}

export default App;
