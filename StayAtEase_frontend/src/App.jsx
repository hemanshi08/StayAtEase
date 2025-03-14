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
import PropertyMessages from "./Admin/PropertyMessages";
import PropertyDetails from "./rental/propertydetails";

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
      {/* <PropertyReviews/>
      
      <PropertyMessages/> */}
      <PropertyDetails/>
    </Router>
  );
}

export default App;
