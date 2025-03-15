import { BrowserRouter as Router } from "react-router-dom";
import AllpropertyReviews from "./super Admin/AllPropertyReview";
import AllPropertyMessages from "./super Admin/AllPropertyMassges";
import UserTable from "./super Admin/TatalUser";
function App() {
  return (
    <Router>
     
      {/* <PropertyDetails/> */}
      {/* <AdminPropertyDetails/> */}
      {/* <ProfileDetails/> */}
      {/* <AllPropertyMessages/> */}
      <UserTable/>
    </Router>
  );
}

export default App;
