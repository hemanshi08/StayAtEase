import { useState } from "react";
import React from "react";
import PropertyCard from "../Components/Property_card";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const properties = [
  {
    id: 1,
    title: "Modern Luxury Apartment",
    location: "Downtown, New York",
    price: "2,500",
    rating: 4,
    image: "../Properties_image/iflat4.jpg",
    beds: 2,
    baths: 2,
    sqft: 25000,
  },
  {
    id: 2,
    title: "Cozy Studio Apartment",
    location: "Los Angeles, CA",
    price: "1,800",
    rating: 4.5,
    image: "../Properties_image/flat5.jpg",
    beds: 3,
    baths: 2,
    sqft: 45000,
  },
  {
    id: 3,
    title: "Spacious Family Home",
    location: "Chicago, IL",
    price: "3,200",
    rating: 2,
    image: "../Properties_image/villa3.jpg",
    beds: 2,
    baths: 2,
    sqft: 25000,
  },
  {
    id: 4,
    title: "Spacious Family Home",
    location: "Chicago, IL",
    price: "3,200",
    rating: 3.5,
    image: "../Properties_image/iflat6.jpg",
    beds: 2,
    baths: 2,
    sqft: 25000,
  },
  {
    id: 5,
    title: "Spacious Family Home",
    location: "Chicago, IL",
    price: "3,200",
    rating: 2,
    image: "../Properties_image/i flat7.jpg",
    beds: 2,
    baths: 2,
    sqft: 25000,
  },
  {
    id: 6,
    title: "Cozy Studio Apartment",
    location: "Los Angeles, CA",
    price: "1,800",
    rating: 4.5,
    image: "../Properties_image/iflat1.jpg",
    beds: 3,
    baths: 2,
    sqft: 45000,
  },
];



export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("🏠 Property Type");
  const [price, setPrice] = useState(500);
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter === activeFilter ? null : filter);
  };
  return (
    <div>
      <Navbar />
   
      <div className="bg-gray-100 py-2">
        <div className="mx-auto mt-10 mb-10 pl-4">
          <h2 className="flex text-3xl font-semibold">Find Your Perfect Home</h2>
          <p className="flex">Browse through our curated collection of properties</p>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 mb-3 p-3 bg-gray-100 rounded-lg">
      <div className="flex flex-wrap items-center gap-3 flex-grow">
        <input
          type="text"
          className="form-input border p-2 rounded w-full max-w-xs"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-select border p-2 rounded"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option>🏠 Property Type</option>
          <option>Apartment</option>
          <option>House</option>
          <option>Villa</option>
        </select>

        <div className="flex items-center">
          <label className="mr-2 font-bold">Price:</label>
          <input
            type="range"
            min="500"
            max="10000"
            step="500"
            className="form-range w-40"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <span className="ml-2 font-bold">₹{price}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["New", "Price Ascending", "Price Descending"].map((filter) => (
          <button
            key={filter}
            className={`btn border px-4 py-2 rounded transition duration-300 ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mr-5 ml-5">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
