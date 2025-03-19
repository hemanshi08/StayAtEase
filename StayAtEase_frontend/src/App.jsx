import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Admin/component/header";
import Dashboard from "./Admin/dashboard";
import PropertyReviews from "./Admin/propertyreview";
import PropertyForm from "./Admin/Propertyform";
import PropertyListings from "./Admin/propertylisting";
import Footer from "./Components/Footer";
import PropertyCard from "./Components/Property_card";
import HomePage from "./rental/home";


function App() {
  return (
    <Router>
  
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/PropertyForm" element={<PropertyForm />} />
        <Route path="/PropertyListings" element={<PropertyListings />} />
        <Route path="/PropertyReviews" element={<PropertyReviews />} />
        <Route path="/HomePage" element={<HomePage />} />
        
      </Routes>
   
    </Router>
  );
}

export default App;
