// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import PropertyCard from "./Components/Property_card";
import HomePage from "./rental/home";
import About from "./rental/PropertyPage";
import PropertyPage from "./rental/PropertyPage";
import WishlistPage from "./rental/WishlistPage";

function App() {
  return (
    <Router>
      {/* <Navbar/>
      <PropertyCard/>
      <Footer/> */}
      {/* <HomePage/> */}
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertyPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes> */}
      {/* <PropertyPage/> */}
      {/* <WishlistPage/> */}

      <Routes>
        <Route path="/home" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
