import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import PropertyCard from "./Components/Property_card";
import HomePage from "./rental/home";
import Dashboard from "./Admin/dashboard";
import AppRouter from "./AppRouter";


function App() {
  return (
    <Router>
    <AppRouter/>
    </Router>
  );
}

export default App;
