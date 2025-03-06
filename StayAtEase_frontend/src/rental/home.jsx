import React, { useState } from "react";
import PropertyCard from "../Components/Property_card";
import { DownOutlined } from "@ant-design/icons"; // Ant Design Icon
import { Dropdown, Menu, Button } from "antd"; // Ant Design Dropdown
import "antd/dist/reset.css"; // Import Ant Design Styles
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


// Sample Property Data (Dynamic Data)
const properties = [
  {
    id: 1,
    title: "Modern Luxury Apartment",
    location: "Downtown, New York",
    price: "₹2,500/month",
    rating: 4.8,
    image: "../public/Properties_image/flate3.jpg",
  },
  {
    id: 2,
    title: "Cozy Studio Apartment",
    location: "Los Angeles, CA",
    price: "₹1,800/month",
    rating: 4.5,
    image: "../public/Properties_image/flate3.jpg",
  },
  {
    id: 3,
    title: "Spacious Family Home",
    location: "Chicago, IL",
    price: "₹3,200/month",
    rating: 4.9,
    image: "../public/Properties_image/flate3.jpg",
  },
  {
    id: 3,
    title: "Spacious Family Home",
    location: "Chicago, IL",
    price: "₹3,200/month",
    rating: 4.9,
    image: "../public/Properties_image/flate3.jpg",
  },
];

export default function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState("Location");
  const [selectedType, setSelectedType] = useState("Property Type");
  const [selectedBudget, setSelectedBudget] = useState("Budget");

  // Dropdown Menus
  const locationsMenu = (
    <Menu onClick={(e) => setSelectedLocation(e.key)}>
      <Menu.Item key="Rajkot">Rajkot</Menu.Item>
      <Menu.Item key="Ahemdabad">Ahemdabad</Menu.Item>
      <Menu.Item key="Surat">Surat</Menu.Item>
    </Menu>
  );

  const propertyTypeMenu = (
    <Menu onClick={(e) => setSelectedType(e.key)}>
      <Menu.Item key="Apartment">Apartment</Menu.Item>
      <Menu.Item key="House">House</Menu.Item>
      <Menu.Item key="Studio">Studio</Menu.Item>
    </Menu>
  );

  const budgetMenu = (
    <Menu onClick={(e) => setSelectedBudget(e.key)}>
      <Menu.Item key="₹2,500 - ₹5,500">₹2,500 - ₹5,500</Menu.Item>
      <Menu.Item key="₹5,500 - ₹7,500">₹5,500 - ₹7,500</Menu.Item>
      <Menu.Item key="₹7,500+">₹7,500+</Menu.Item>
    </Menu>
  );

  return (
   <div>    
     <Navbar/>

    <div className="w-full">
      
      {/* Banner Section */}
      <div className="relative flex flex-col items-center justify-center w-full h-80 sm:h-115 bg-cover bg-center text-white px-4 "   
        style={{ backgroundImage: "url('../public/Properties_image/flate3.jpg')" }}>
          <div className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-center leading-tight text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
        Find Your Perfect Home
        </div>

      <div className="flex bg-center items-center justify-center">
      {/* Dropdown Search Filters */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 w-full max-w-2xl px-2">
        <Dropdown overlay={locationsMenu}>
          <Button className="w-full sm:w-40 flex justify-between items-center">{selectedLocation} <DownOutlined /></Button> 
        </Dropdown>

        <Dropdown overlay={propertyTypeMenu}>
          <Button className="w-full sm:w-40 flex justify-between items-center">{selectedType} <DownOutlined /></Button>
        </Dropdown>

        <Dropdown overlay={budgetMenu}>
          <Button className="w-full sm:w-40 flex justify-between items-center">{selectedBudget} <DownOutlined /></Button>
        </Dropdown>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md">
          Search
        </button>
      </div>
      </div>
      </div>
      {/* Featured Properties */}
      <div className="max-w-6xl mx-auto mt-10 mb-20">
        <h2 className="text-2xl font-semibold ml-5">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mr-5 ml-5">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
    <div>
      <Footer/>
    </div>
    </div>
  );
}
