// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import PropertyCard from "./Components/Property_card";
import HomePage from "./rental/home";
import About from "./rental/PropertyPage";
import PropertyPage from "./rental/PropertyPage";
import WishlistPage from "./rental/WishlistPage";
import LoginPage from "./Components/LoginPage";
import PropertyDetails from "./rental/PropertyDetailsPage";

function App() {
  return (
    <Router>
      {/* <Navbar/>
      <PropertyCard/>
      <Footer/> */}
      {/* <HomePage/> */}
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Navigate replace to='/home'/>}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/properties" element={<PropertyPage />} />
        <Route path="/Wishlist" element={<WishlistPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
      {/* <PropertyPage/> */}
      {/* <WishlistPage/> */}
{/* <LoginPage/> */}
      {/* <Routes>
        <Route path="/home" element={<HomePage/>} />
      </Routes> */}
    </Router>
  );
}

export default App;
