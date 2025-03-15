import { BrowserRouter as Router } from "react-router-dom";
import AllpropertyReviews from "./super Admin/AllPropertyReview";
import AllPropertyMessages from "./super Admin/AllPropertyMassges";
function App() {
  return (
    <Router>
     
      {/* <PropertyDetails/> */}
      {/* <AdminPropertyDetails/> */}
      {/* <ProfileDetails/> */}
      <AllPropertyMessages/>
    </Router>
  );
}

export default App;
