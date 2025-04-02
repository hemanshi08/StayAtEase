import React, { useState } from "react";
import PropertyCard from "../Components/Property_card";
import { DownOutlined } from "@ant-design/icons"; // Ant Design Icon
import { Dropdown, Menu, Button } from "antd"; // Ant Design Dropdown
import "antd/dist/reset.css"; // Import Ant Design Styles
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, MessageSquare, Search, Bookmark, Star, Shield } from "lucide-react";
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
    sqft:25000,
    reviews: [
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!",image: "../profile_image/team-1.jpg" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." ,image:"../profile_image/team-2.jpg"},
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!",image: "../profile_image/team-1.jpg" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." ,image:"../profile_image/team-2.jpg"},

    ],
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
    sqft:45000,
    reviews: [
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" , image: "../profile_image/team-1.jpg" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." ,image: "../profile_image/team-2.jpg"},
    ],
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
    sqft:25000 ,
    reviews: [
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" ,image: "../profile_image/team-1.jpg" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience.",image: "../profile_image/team-2.jpg" },
    ],
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
    sqft:25000,
    reviews: [
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" , image: "../profile_image/team-1.jpg"},
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience.",image: "../profile_image/team-2.jpg" },
    ],
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
    sqft:25000,
    reviews: [
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!",image: "../profile_image/team-1.jpg" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." ,image: "../profile_image/team-2.jpg"},
    ],
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
    sqft:45000,
    reviews: [
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" ,image: "../profile_image/team-1.jpg"},
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience.",image: "../profile_image/team-2.jpg" },
    ],
  },
];

const features = [
  {  icon: <BadgeCheck className="text-blue-600 text-3xl" />,   title: "Verified Listings", description: "Ensuring only genuine properties are listed." },
  { icon: <MessageSquare className="text-blue-600 text-3xl" />, title: "Secure Communication", description: "Chat directly with property owners." },
  { icon: <Search className="text-blue-600 text-3xl" />, title: "Easy Search & Filters", description: "Find your ideal home in seconds." },
  { icon: <Bookmark className="text-blue-600 text-3xl" />, title: "Wishlist Feature", description: "Save properties for later." },
  {  icon: <Star className="text-blue-600 text-3xl" />, title: "Reviews & Ratings", description: "Honest feedback from previous tenants." },
  {  icon: <Shield className="text-blue-600 text-3xl" />, title: "Secure Platform", description: "Your safety is our priority." }
];

export default function HomePage() {

  const [selectedLocation, setSelectedLocation] = useState("Location");
  const [selectedType, setSelectedType] = useState("Property Type");
  const [selectedBudget, setSelectedBudget] = useState("Budget");

  const navigate = useNavigate(); // React Router navigation hook

  const handleExploreClick = () => {
    navigate("/properties"); // Redirect to PropertyPage
  };
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
      <div className="bg-gray-100 py-2 mt-13">
      <div className="max-w-6xl mx-auto mt-10 mb-10">
        <h2 className="text-3xl font-semibold ml-5">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mr-5 ml-5">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} showDetailsButton={false}/>
          ))}
        </div>
      </div>
     </div> 

      {/* About Section */}
<div className="max-w-6xl mx-auto mt-13 flex flex-col md:flex-row items-center px-5 gap-7">
  <div className="md:w-1/2">
    <h2 className="text-3xl font-bold mb-4">About StayAtEase</h2>
    <p className="text-gray-600 leading-relaxed tracking-wide mx-auto">
     StayAtEase is a hassle-free platform for finding the perfect home or listing your property for rent. 
      Whether you're a tenant looking for a cozy place or an owner wanting to rent out your space, 
      we provide a smooth and secure experience.
    </p>
    <button className="mt-6 px-6 py-2 bg-blue-600 !text-white rounded-lg shadow-md" onClick={handleExploreClick}>
  Explore Listings
</button>  </div>
  <div className="md:w-1/2 mt-6 md:mt-0">
    <img src="../public/Properties_image/iflat3.jpg" alt="About Us" className="rounded-lg shadow-lg" />
  </div>
</div>

{/* Why Choose Us Section */}
<div className="bg-gray-100 py-10 mt-13">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800">Why Choose StayAtEase?</h2>
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
    <div>
      <Footer/>
    </div>
    </div>
  );
}
