import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWifi, FaSwimmer, FaShieldAlt, FaCar, FaDumbbell, FaTv, FaUtensils, FaTshirt, FaBuilding, FaStar } from "react-icons/fa";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const PropertyDetails = () => {
  const property = {
    title: "Luxury Apartment with City View",
    address: "123 Park Avenue, Mumbai, Maharashtra",
    price: "₹45,000",
    beds: 4,
    baths: 3,
    size: "2,450 sq ft",
    images: [
      "../Properties_image/iflat4.jpg",
      "../Properties_image/iflat1.jpg",
      "../Properties_image/iflat6.jpg",
      "../Properties_image/iflat6.jpg",
      "../Properties_image/iflat3.jpg",
    ],
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

  const agent = {
    name: "Michael Anderson",
    role: "Senior Property Consultant",
    profileImage: "../profile.png",
    contact: "Call Agent",
    inquiry: "Send Inquiry",
    review: "Write Review",
    availableHours: [
      { days: "Mon - Fri", hours: "9:00 AM - 6:00 PM" },
      { days: "Sat", hours: "10:00 AM - 4:00 PM" },
    ],
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      date: "December 2023",
      rating: 5,
      review: "Amazing property with great amenities. The location is perfect and the host was very responsive.",
      image: "../profile.png",
    },
    {
      id: 2,
      name: "Michael Chen",
      date: "November 2023",
      rating: 4.5,
      review: "Very clean and modern apartment. Great value for money. Would definitely recommend!",
      image: "../profile.png",
    },
    {
      id: 3,
      name: "Michael Chen",
      date: "November 2023",
      rating: 4.5,
      review: "Very clean and modern apartment. Great value for money. Would definitely recommend!",
      image: "../profile.png",
    },
  ];

  return (
    <div>
        <Navbar/>
    <div className="container mt-4">
   
    <div className="row">
      {/* Main Image - Large */}
      <div className="col-md-8">
        <img
          src={property.images[0]}
          className="img-fluid rounded mb-3"
          alt="Property"
          style={{ width: "100%", height: "510px", objectFit: "cover" }}
        />
      </div>

      {/* Thumbnail Images - 2x2 Grid */}
      <div className="col-md-4">
  <div className="row g-2">
    {property.images.slice(1).map((img, index) => (
      <div key={index} className="col-12"> {/* Changed col-6 to col-12 for full width */}
        <img
          src={img}
          className="img-fluid rounded"
          alt="Thumbnail"
          style={{ width: "100%", height: "120px", objectFit: "cover" }}
        />
      </div>
    ))}
  </div>
</div>

    </div>

      {/* Property Details */}
      <div className="row mt-4">
        <div className="col-md-8">
          <h2 className="fw-bold">{property.title}</h2>
          <p className="text-muted">{property.address}</p>
          <h3 className="text-primary fw-bold">{property.price} <span className="fs-5 text-muted">/ month</span></h3>
          <p>{property.beds} beds • {property.baths} baths • {property.size}</p>

          {/* Features & Amenities */}
          <h5 className="fw-bold mt-4">Features & Amenities</h5>
          <div className="row">
            {property.features.map((feature, index) => (
              <div key={index} className="col-md-4 d-flex align-items-center mb-2">
                <span className="me-2 text-primary">{feature.icon}</span>
                {feature.name}
              </div>
            ))}
          </div>

          {/* About Section */}
          <h5 className="fw-bold mt-4">About this property</h5>
          <p className="text-muted">{property.description}</p>
        </div>

        {/* Agent Details */}
        <div className="col-md-4">
          <div className="d-flex align-items-center mb-3">
            <img src={agent.profileImage} className="rounded-circle me-3" width="50" height="50" alt="Agent" />
            <div>
              <h6 className="fw-bold mb-0">{agent.name}</h6>
              <p className="text-muted mb-0">{agent.role}</p>
            </div>
          </div>
          <button className="btn btn-primary w-100 mb-2">{agent.contact}</button>
          <button className="btn btn-outline-primary w-100 mb-2">{agent.inquiry}</button>
          <button className="btn btn-outline-secondary w-100">{agent.review}</button>

          {/* Available Hours */}
          <h6 className="fw-bold mt-4">Available Hours</h6>
          {agent.availableHours.map((hour, index) => (
            <p key={index} className="text-muted mb-1">{hour.days}: {hour.hours}</p>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <h5 className="fw-bold mt-5">Reviews</h5>
      <div className="d-flex align-items-center mb-3">
        <h4 className="text-warning fw-bold mb-0">4.8</h4>
        <FaStar className="text-warning ms-2" />
        <p className="text-muted ms-2">(28 reviews)</p>
      </div>

      <div className="row">
        {reviews.map((review) => (
          <div key={review.id} className="col-md-4">
            <div className="border rounded p-3 mb-3 shadow-sm bg-white">
              <div className="d-flex align-items-center mb-2">
                <img src={review.image} className="rounded-circle me-2" width="40" height="40" alt="Reviewer" />
                <div>
                  <h6 className="fw-bold mb-0">{review.name}</h6>
                  <p className="text-muted mb-0">{review.date}</p>
                </div>
              </div>
              
              {/* ⭐ Stars in a Single Row */}
              <div className="d-flex text-warning">
                {Array.from({ length: Math.floor(review.rating) }, (_, i) => (
                  <FaStar key={i} className="me-1" />
                ))}
              </div>

              <p className="text-muted mt-2">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PropertyDetails;
