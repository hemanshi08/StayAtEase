import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "../Components/Property_card";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Button } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  MessageSquare,
  Search,
  Bookmark,
  Star,
  Shield,
} from "lucide-react";

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/properties?limit=6");
        setProperties(response.data);
        setFilteredProperties(response.data); // set both initially
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleExploreClick = () => {
    navigate("/properties");
  };

  const handleFilterSearch = () => {
    const filtered = properties.filter((property) => {
      const matchesLocation =
        selectedLocation === "All" || property.address.includes(selectedLocation);
      const matchesType =
        selectedType === "All" || property.property_type === selectedType;
      const matchesBudget = (() => {
        const price = property.price;
        if (selectedBudget === "₹2,500 - ₹5,500") return price >= 2500 && price <= 5500;
        if (selectedBudget === "₹5,500 - ₹7,500") return price > 5500 && price <= 7500;
        if (selectedBudget === "₹7,500+") return price > 7500;
        return true; // "All"
      })();

      return matchesLocation && matchesType && matchesBudget;
    });

    setFilteredProperties(filtered);
  };

  const locationsMenu = {
    items: [
      { key: "All", label: "All Locations" },
      { key: "Rajkot", label: "Rajkot" },
      { key: "Ahemdabad", label: "Ahemdabad" },
      { key: "Surat", label: "Surat" },
    ],
    onClick: ({ key }) => setSelectedLocation(key),
  };

  const propertyTypeMenu = {
    items: [
      { key: "All", label: "All Types" },
      { key: "Apartment", label: "Apartment" },
      { key: "House", label: "House" },
      { key: "Studio", label: "Studio" },
    ],
    onClick: ({ key }) => setSelectedType(key),
  };

  const budgetMenu = {
    items: [
      { key: "All", label: "All Budgets" },
      { key: "₹2,500 - ₹5,500", label: "₹2,500 - ₹5,500" },
      { key: "₹5,500 - ₹7,500", label: "₹5,500 - ₹7,500" },
      { key: "₹7,500+", label: "₹7,500+" },
    ],
    onClick: ({ key }) => setSelectedBudget(key),
  };

  const features = [
    {
      icon: <BadgeCheck size={32} className="text-blue-600" />,
      title: "Verified Listings",
      description: "Only trusted and verified properties are listed.",
    },
    {
      icon: <MessageSquare size={32} className="text-blue-600" />,
      title: "Easy Communication",
      description: "Chat directly with property owners or managers.",
    },
    {
      icon: <Search size={32} className="text-blue-600" />,
      title: "Advanced Search",
      description: "Filter properties by budget, location, and more.",
    },
    {
      icon: <Bookmark size={32} className="text-blue-600" />,
      title: "Save Favorites",
      description: "Bookmark properties for easy access later.",
    },
    {
      icon: <Star size={32} className="text-blue-600" />,
      title: "Top Rated",
      description: "Check ratings from other users before renting.",
    },
    {
      icon: <Shield size={32} className="text-blue-600" />,
      title: "Secure Platform",
      description: "We ensure a safe experience for all users.",
    },
  ];

  return (
    <div className="w-full">
      {/* Banner Section */}
      <div
        className="relative flex flex-col items-center justify-center w-full h-80 sm:h-115 bg-cover bg-center text-white px-4"
        style={{ backgroundImage: "url('/Properties_image/flate3.jpg')" }}
      >
        <div className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center leading-tight drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
          Find Your Perfect Home
        </div>

        {/* Dropdown Filters */}
        <div className="flex bg-center items-center justify-center">
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 w-full max-w-2xl px-2">
            <Dropdown menu={locationsMenu}>
              <Button className="w-full sm:w-40 flex justify-between items-center">
                {selectedLocation === "All" ? "Location" : selectedLocation} <DownOutlined />
              </Button>
            </Dropdown>

            <Dropdown menu={propertyTypeMenu}>
              <Button className="w-full sm:w-40 flex justify-between items-center">
                {selectedType === "All" ? "Property Type" : selectedType} <DownOutlined />
              </Button>
            </Dropdown>

            <Dropdown menu={budgetMenu}>
              <Button className="w-full sm:w-40 flex justify-between items-center">
                {selectedBudget === "All" ? "Budget" : selectedBudget} <DownOutlined />
              </Button>
            </Dropdown>

            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md"
              onClick={handleFilterSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="bg-gray-100 py-2 mt-13">
        <div className="max-w-6xl mx-auto mt-10 mb-10">
          <h2 className="text-3xl font-semibold ml-5">Featured Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mr-5 ml-5">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard
                  key={property.p_id}
                  id={property.p_id}
                  title={property.title}
                  location={property.address}
                  price={property.price}
                  rating={0}
                  image={property.property_images[0] || "/default.jpg"}
                  beds={property.no_of_beds}
                  baths={property.no_of_bathrooms}
                  sqft={property.sq_ft}
                  showDetailsButton={true}
                />
              ))
            ) : (
              <div className="col-span-3 text-center">No properties found.</div>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto mt-13 flex flex-col md:flex-row items-center px-5 gap-7">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">About StayAtEase</h2>
          <p className="text-gray-600 leading-relaxed tracking-wide mx-auto">
            StayAtEase is a hassle-free platform for finding the perfect home
            or listing your property for rent. Whether you're a tenant looking
            for a cozy place or an owner wanting to rent out your space, we
            provide a smooth and secure experience.
          </p>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md"
            onClick={handleExploreClick}
          >
            Explore Listings
          </button>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src="/Properties_image/iflat3.jpg"
            alt="About Us"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100 py-10 mt-13">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Why Choose StayAtEase?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <div className="mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-500 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}