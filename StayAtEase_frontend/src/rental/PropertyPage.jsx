import React from "react";
import PropertyCard from "../Components/Property_card";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// const PropertyPage = () => {
//   const properties = [
//     { id: 1, image: "https://via.placeholder.com/600", title: "Luxury Beachfront Villa", location: "Miami Beach, Florida", beds: 4, baths: 3, sqft: 2800, rating: 3, price: "1,950" }
//   ];

//   return (
//     <div>
//       <Navbar/>
//     <div className="container mx-auto p-6 grid grid-cols-3 gap-6">
//       {properties.map((property) => (
//         <PropertyCard key={property.id} {...property} showDetailsButton={true} />
//       ))}
//     </div>
//     <Footer/>
//     </div>
//   );
// };

// export default PropertyPage;




import { Input, Button, Select, Slider, Card, Rate } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

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
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." },
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
      { name: "John Doe", date: "Feb 25, 2024", rating: 4, comment: "Amazing place to stay!" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 5, comment: "Loved the experience." },
      { name: "John Doe", date: "Feb 25, 2024", rating: 3, comment: "Amazing place to stay!" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 2, comment: "Loved the experience." },
      { name: "John Doe", date: "Feb 25, 2024", rating: 3.5, comment: "Amazing place to stay!" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.5, comment: "Loved the experience." },
      { name: "John Doe", date: "Feb 25, 2024", rating: 3, comment: "Amazing place to stay!" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 3.8, comment: "Loved the experience." },
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
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." },
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
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." },
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
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." },
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
      { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" },
      { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." },
    ],
  },
];

const PropertyListing = () => {
 
  return (
    <div>
      <Navbar/>
    <div className="p-8">
      <h1 className="text-2xl font-bold">Find Your Perfect Stay</h1>
      <p className="text-gray-500">Our curated collection of properties</p>
      
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 my-8 mr-5 ml-5">
        <Search placeholder="Search" style={{ width: 300 }} />
        <Button type="primary">New</Button>
        <Button>Price ascending</Button>
        <Button>Price descending</Button>
        <Select placeholder="Property Type" style={{ width: 150 }}>
          <Option value="apartment">Apartment</Option>  
          <Option value="house">House</Option>
          <Option value="studio">Studio</Option>
        </Select>
        <div className="flex items-center  gap-2">
          <span>Price</span>
          <Slider range defaultValue={[0, 100]} className="w-40" />
        </div>
      </div>
      
      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mr-5 ml-5">
       {properties.map((property) => (
         <PropertyCard key={property.id} {...property} showDetailsButton={true} />
      ))}
    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PropertyListing;