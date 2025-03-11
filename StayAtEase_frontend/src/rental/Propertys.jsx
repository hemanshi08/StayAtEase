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
    price: "2,500",
    rating: 4,
    image: "../Properties_image/iflat4.jpg",
    beds:2,
    baths:2,
    sqft:25000
  },
  {
    id: 2,
    title: "Cozy Studio Apartment",
    location: "Los Angeles, CA",
    price: "1,800",
    rating: 4.5,
    image: "../Properties_image/flat5.jpg",
    beds:3,
    baths:2,
    sqft:45000
  },
  {
    id: 3,
    title: "Spacious Family Home",
    location: "Chicago, IL",
    price: "3,200",
    rating: 2,
    image: "../Properties_image/villa3.jpg",
    beds:2,
    baths:2,
    sqft:25000
  },
  {
    id: 4,
    title: "Spacious Family Home",
    location: "Chicago, IL",
    price: "3,200",
    rating: 3.5,
    image: "../Properties_image/iflat6.jpg",
    beds:2,
    baths:2,
    sqft:25000
  },
  {
    id: 5,
    title: "Spacious Family Home",
    location: "Chicago, IL",
    price: "3,200",
    rating: 2,
    image: "../Properties_image/i flat7.jpg",
    beds:2,
    baths:2,
    sqft:25000
  },
  {
    id: 6,
    title: "Cozy Studio Apartment",
    location: "Los Angeles, CA",
    price: "1,800",
    rating: 4.5,
    image: "../Properties_image/iflat1.jpg",
    beds:3,
    baths:2,
    sqft:45000
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
      {/* Featured Properties */}
      <div className="bg-gray-100 py-2 mt-13">
      <div className="max-w-6xl mx-auto mt-10 mb-10">
        <h2 className="text-3xl font-semibold ml-5"> Find Your Perfect Home</h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mr-5 ml-5">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
     

    




    <div>
      <Footer/>
    </div>
    </div>
  );
}
