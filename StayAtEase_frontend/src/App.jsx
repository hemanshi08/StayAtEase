import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Admin/component/header";
import Dashboard from "./Admin/dashboard";
import PropertyReviews from "./Admin/Reviews";
import PropertyForm from "./Admin/AddProperty";
import PropertyListings from "./Admin/PropertyListings";
import Footer from "./Components/Footer";
import HomePage from "./rental/home";
import ProfileDetails from "./Admin/ProfileDetails";
import PropertyMessages from "./Admin/PropertyMessages";

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
</Routes>
   
    </Router>
  );
}

export default App;
