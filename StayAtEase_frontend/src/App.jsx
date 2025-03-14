import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import PropertyCard from "./Components/Property_card";
import HomePage from "./rental/home";
import PropertyListing from "./rental/Propertylist";
import Wishlist from "./rental/wishlist";
import PropertyForm from "./Admin/Propertyform";
import PropertyReviews from "./Admin/propertyreview";
import Dashboard from "./Admin/dashboard";
import PropertyListings from "./Admin/propertylisting";

function App() {
  return (
    <Router>
       {/* <Navbar/> */}
      {/* <PropertyCard/>
      <Footer/>  */}
      {/* <HomePage/> */}
      {/* <PropertyListing/> */}
      {/* <Wishlist/> */}
      {/* <PropertyDetails/> */}
      {/* <Dashboard/> */}
      {/* <PropertyForm/> */}
      {/* <PropertyListings/> */}
      <PropertyReviews/>
    </Router>
  );
}

export default App;
