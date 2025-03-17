import { BrowserRouter as Router } from "react-router-dom";

import AdminPropertyDetails from "./Admin/propertydetails";
import ApartmentListing from "./Admin/propertydetails";
function App() {
  return (
    <Router>
    <ApartmentListing/>
    </Router>
  );
}

export default App;
