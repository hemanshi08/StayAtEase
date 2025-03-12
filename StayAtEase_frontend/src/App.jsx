import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import PropertyCard from "./Components/Property_card";
import HomePage from "./rental/home";
import PropertyListing from "./rental/Propertylist";

function App() {
  return (
    <Router>
      {/* <Navbar/>
      <PropertyCard/>
      <Footer/> */}
      {/* <HomePage/> */}
      <PropertyListing/>
    </Router>
  );
}

export default App;
