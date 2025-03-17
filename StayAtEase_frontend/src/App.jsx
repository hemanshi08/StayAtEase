import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Admin/component/header";
import Dashboard from "./Admin/dashboard";
import PropertyReviews from "./Admin/Reviews";
import PropertyForm from "./Admin/AddProperty";
import PropertyListings from "./Admin/Mylisting";
import Footer from "./Components/Footer";
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
