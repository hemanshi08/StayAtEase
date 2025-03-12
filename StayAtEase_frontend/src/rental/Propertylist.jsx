import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faExpand, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const properties = [
  { image: "../Properties_image/iflat4.jpg", title: "Luxury Beachfront Villa", location: "Miami Beach, Florida", beds: 4, baths: 3, size: "2800 sqft", price: 1950, rating: 4.3, reviews: 124 },
  { image: "../Properties_image/iflat1.jpg", title: "Modern Luxury Apartment", location: "Downtown, New York", beds: 3, baths: 2, size: "2200 sqft", price: 2500, rating: 4.8, reviews: 98 },
  { image: "../Properties_image/iflat6.jpg", title: "Cozy Studio Apartment", location: "Brooklyn, New York", beds: 1, baths: 1, size: "900 sqft", price: 1800, rating: 4.5, reviews: 67 },
  { image: "../Properties_image/iflat4.jpg", title: "Spacious Family Home", location: "Los Angeles, California", beds: 5, baths: 4, size: "3500 sqft", price: 3200, rating: 4.7, reviews: 142 },
  { image: "../Properties_image/iflat5.jpg", title: "Penthouse Suite", location: "San Francisco, California", beds: 3, baths: 3, size: "2800 sqft", price: 4500, rating: 4.9, reviews: 189 },
  { image: "../Properties_image/iflat3.jpg", title: "Lakeview Cabin", location: "Austin, Texas", beds: 2, baths: 1, size: "1500 sqft", price: 2100, rating: 4.6, reviews: 75 }
];

export default function Propertylist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState(500);
  const [activeFilter, setActiveFilter] = useState(null);
  const [likedProperties, setLikedProperties] = useState({});

  const handleFilterClick = (filter) => {
    setActiveFilter(filter === activeFilter ? null : filter);
  };

  const toggleLike = (index) => {
    setLikedProperties((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  let filteredProperties = properties.filter((property) => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    property.price >= price
  );

  if (activeFilter === "Price Ascending") {
    filteredProperties = filteredProperties.sort((a, b) => a.price - b.price);
  } else if (activeFilter === "Price Descending") {
    filteredProperties = filteredProperties.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 py-2">
        <div className="mx-auto mt-10 mb-10 pl-8">
          <h2 className="text-3xl font-semibold">Find Your Perfect Home</h2>
          <p>Browse through our curated collection of properties</p>
          <div className="flex flex-wrap gap-2 bg-gray-100 rounded-lg">
            <div className="flex flex-wrap items-center gap-3 flex-grow">
              <input
                type="text"
                className="border p-2 rounded w-full max-w-xs"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex items-center">
                <label className="mr-2 font-bold">Price:</label>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  className="form-range w-40"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <span className="ml-2 font-bold">₹{price}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["New", "Price Ascending", "Price Descending"].map((filter) => (
                <button
                  key={filter}
                  className={`border px-4 py-2 rounded transition duration-300 ${
                    activeFilter === filter ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-500"
                  }`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredProperties.map((property, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden relative">
              <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />

              <div onClick={() => toggleLike(index)} className="absolute top-3 right-3 cursor-pointer text-xl">
                {likedProperties[index] ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
              </div>

              <div className="p-4">
                <h5 className="font-semibold text-lg">{property.title}</h5>
                <p className="text-gray-500">
                  <FontAwesomeIcon icon={faLocationDot} /> {property.location}
                </p>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <span className="mr-3"><FontAwesomeIcon icon={faBed} /> {property.beds} beds</span>
                  <span className="mr-3"><FontAwesomeIcon icon={faBath} /> {property.baths} baths</span>
                  <span><FontAwesomeIcon icon={faExpand} /> {property.size}</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 font-bold">⭐⭐⭐ {property.rating}</span>
                  <br />
                  <small className="text-gray-400 ml-2">({property.reviews} reviews)</small>
                </div>
              <br />
                <h6 className="text-blue-600 font-bold mt-2">₹{property.price}/month</h6>
                <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}