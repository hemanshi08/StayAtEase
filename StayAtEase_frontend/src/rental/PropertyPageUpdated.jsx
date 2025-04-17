import React, { useEffect, useState } from "react";
import PropertyCard from "../Components/Property_card";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Input, Button, Select, Slider } from "antd";
import axios from "../api/axiosInstance"; // Importing axios instance

const { Search } = Input;
const { Option } = Select;

const PropertyListing = () => {
  const [properties, setProperties] = useState([]); // State to hold fetched properties

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/properties"); // Adjust the endpoint as necessary
        setProperties(response.data); // Set the fetched properties to state
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (  
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
        <div className="flex items-center gap-2">
          <span>Price</span>
          <Slider range min={1000} max={20000} defaultValue={[1000, 20000]} className="w-40" />
        </div>
      </div>
      
      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mr-5 ml-5">
       {properties.map((property) => (
         <PropertyCard key={property.id} {...property} showDetailsButton={true} />
      ))}
    </div>
    </div>
  );
};

export default PropertyListing;
