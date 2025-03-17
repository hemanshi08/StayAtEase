import { BrowserRouter as Router } from "react-router-dom";
import AllpropertyReviews from "./super Admin/AllPropertyReview";
import AllPropertyMessages from "./super Admin/AllPropertyMassges";
import UserTable from "./super Admin/TatalUser";
import AdminData from "./super Admin/TotalAdmin";
import AdminTable from "./super Admin/TotalAdmin";
import PropertyTable from "./super Admin/AllProperty";
function App() {
  return (
    <Router>
     
      {/* <PropertyDetails/> */}
      {/* <AdminPropertyDetails/> */}
      {/* <ProfileDetails/> */}
      {/* <AllPropertyMessages/> */}
    <PropertyTable/>
    </Router>
  );
}

export default App;
