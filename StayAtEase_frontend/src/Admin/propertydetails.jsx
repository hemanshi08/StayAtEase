import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css";

const ApartmentListing = () => {
  return (
    <div className="container mt-4">
      <div className="container-box">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">Modern Apartment</h2>
          <div>
            <span className="text-warning fw-bold">
              4.8 <i className="bi bi-star-fill"></i> (28 reviews)
            </span>
            <button className="btn btn-outline-primary btn-sm mx-2">Edit</button>
            <button className="btn btn-outline-danger btn-sm">Delete</button>
          </div>
        </div>
        <span className="badge bg-success">Available</span>
      </div>

      <div className="container-box main-img">
        <img src="apartment-main.jpg" alt="Apartment" className="img-fluid rounded" />
      </div>

      <div className="container-box row">
        {["room1.jpg", "room2.jpg", "room3.jpg", "room4.jpg"].map((img, index) => (
          <div key={index} className="col-3 small-img">
            <img src={img} alt={`Room ${index + 1}`} className="img-fluid rounded" />
          </div>
        ))}
      </div>

      <div className="container-box">
        <h4>About Property</h4>
        <p>
          This stunning apartment offers modern living at its finest. With breathtaking city views, premium amenities, and luxurious convenience.
        </p>
        <h3 className="text-primary">
          &#8377;250,000 <small className="text-muted">per month</small>
        </h3>
      </div>

      <div className="container-box row">
        <div className="col-md-4">🏠 75 sqm</div>
        <div className="col-md-4">📍 Sector 1, București</div>
        <div className="col-md-4">🏢 Apartment</div>
      </div>

      <div className="container-box row">
        <div className="col-md-6">🛏️ 2 Bedrooms</div>
        <div className="col-md-6">🛁 1 Bathroom</div>
      </div>

      <div className="container-box">
        <h4>Amenities</h4>
        <div className="row amenities">
          {[
            { icon: "bi bi-wifi", text: "High-speed WiFi" },
            { icon: "bi bi-car-front", text: "Parking Space" },
            { icon: "bi bi-building", text: "Fitness Center" },
            { icon: "bi bi-tv", text: "Smart TV" },
            { icon: "bi bi-water", text: "Swimming Pool" },
            { icon: "bi bi-box-arrow-up", text: "Elevator" },
            { icon: "bi bi-house", text: "Laundry" },
            { icon: "bi bi-cup-straw", text: "Kitchen" },
          ].map((amenity, index) => (
            <div key={index} className="col-md-3 d-flex align-items-center">
              <i className={amenity.icon}></i> {amenity.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApartmentListing;
