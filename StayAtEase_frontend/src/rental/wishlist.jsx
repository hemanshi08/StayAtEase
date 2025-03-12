import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faExpand, faLocationDot } from "@fortawesome/free-solid-svg-icons"; 
import { HeartFilled } from "@ant-design/icons"; // Use only HeartFilled to ensure it's always red
import Footer from "../Components/Footer";

const properties = [
  { image: "../Properties_image/iflat4.jpg", title: "Luxury Beachfront Villa", location: "Miami Beach, Florida", beds: 4, baths: 3, size: "2800 sqft", price: "₹1,950/month", rating: 4.3, reviews: 124 },
  { image: "../Properties_image/iflat1.jpg", title: "Modern Luxury Apartment", location: "Downtown, New York", beds: 3, baths: 2, size: "2200 sqft", price: "₹2,500/month", rating: 4.8, reviews: 98 },
  { image: "../Properties_image/iflat6.jpg", title: "Cozy Studio Apartment", location: "Brooklyn, New York", beds: 1, baths: 1, size: "900 sqft", price: "₹1,800/month", rating: 4.5, reviews: 67 },
  { image: "../Properties_image/iflat4.jpg", title: "Spacious Family Home", location: "Los Angeles, California", beds: 5, baths: 4, size: "3500 sqft", price: "₹3,200/month", rating: 4.7, reviews: 142 },
  { image: "../Properties_image/iflat5.jpg", title: "Penthouse Suite", location: "San Francisco, California", beds: 3, baths: 3, size: "2800 sqft", price: "₹4,500/month", rating: 4.9, reviews: 189 },
  { image: "../Properties_image/iflat3.jpg", title: "Lakeview Cabin", location: "Austin, Texas", beds: 2, baths: 1, size: "1500 sqft", price: "₹2,100/month", rating: 4.6, reviews: 75 }
];

export default function Wishlist() {
  // State to track liked properties (Optional)
  const [, setLikedProperties] = useState({});

  // Toggle like function (Optional)
  const toggleLike = (index) => {
    setLikedProperties((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="p-5 bg-gray-100">
        <h2 className="flex text-3xl font-semibold">My Wishlist</h2>
        <p className="flex">Browse through our curated collection of properties</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {properties.map((property, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden relative">
              <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />

              {/* Heart Icon - Always Filled with Red */}
              <div 
                onClick={() => toggleLike(index)} 
                className="absolute top-3 right-3 cursor-pointer text-xl"
              >
                <HeartFilled className="text-red-500" /> {/* Always red */}
              </div>

              <div className="p-4">
                <h5 className="font-semibold text-lg">{property.title}</h5>
                <p className="text-gray-500">
                  <FontAwesomeIcon icon={faLocationDot} /> {property.location}
                </p>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <span className="mr-3">
                    <FontAwesomeIcon icon={faBed} /> {property.beds} beds
                  </span>
                  <span className="mr-3">
                    <FontAwesomeIcon icon={faBath} /> {property.baths} baths
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faExpand} /> {property.size}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 font-bold">⭐ {property.rating}</span>
                  <small className="text-gray-400 ml-2">({property.reviews} reviews)</small>
                </div>
                <h6 className="text-blue-600 font-bold mt-2">{property.price}</h6>
                <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
