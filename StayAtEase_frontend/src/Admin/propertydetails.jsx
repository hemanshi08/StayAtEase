import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBed, FaBath, FaRulerCombined, FaWifi, FaSwimmer, FaShieldAlt, FaCar, FaDumbbell, FaTv, FaUtensils, FaTshirt, FaBuilding, FaStar, FaMapMarkerAlt, FaHome } from "react-icons/fa";

const AdminPropertyDetails = () => {
  const property = {
    title: "Modern Apartment",
    address: "Sector-1, Noida",
    price: "₹250,000",
    beds: 3,
    baths: 1,
    size: "2100sqft",
    features: [
      { icon: <FaWifi />, name: "High-speed WiFi" },
      { icon: <FaSwimmer />, name: "Swimming Pool" },
      { icon: <FaShieldAlt />, name: "24/7 Security" },
      { icon: <FaCar />, name: "Parking Space" },
      { icon: <FaBuilding />, name: "Elevator" },
      { icon: <FaDumbbell />, name: "Fitness Center" },
      { icon: <FaTv />, name: "Smart TV" },
      { icon: <FaUtensils />, name: "Kitchen" },
      { icon: <FaTshirt />, name: "Laundry" },
    ],
    description:
      "This stunning apartment offers modern living at its finest. With breathtaking city views, premium amenities, and a prime location, it's perfect for those seeking luxury and convenience.",
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">{property.title}</h2>
      <p className="text-muted"><FaMapMarkerAlt className="me-1" /> {property.address}</p>
      <h3 className="text-primary fw-bold">{property.price} <span className="fs-5 text-muted">/ month</span></h3>
      <div className="d-flex gap-3 my-3">
        <span><FaBed className="text-primary" /> {property.beds} Bedrooms</span>
        <span><FaBath className="text-primary" /> {property.baths} Bathroom</span>
        <span><FaRulerCombined className="text-primary" /> {property.size}</span>
      </div>

      <h5 className="fw-bold mt-4">Amenities</h5>
      <div className="row">
        {property.features.map((feature, index) => (
          <div key={index} className="col-md-4 d-flex align-items-center mb-2">
            <span className="me-2 text-primary">{feature.icon}</span>
            {feature.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPropertyDetails;
