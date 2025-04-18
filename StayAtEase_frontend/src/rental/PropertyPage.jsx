import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../Components/Property_card";
import { Input, Button, Select, Slider } from "antd";

const { Search } = Input;
const { Option } = Select;

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties"); // Change port if needed
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

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
        <div className="flex items-center  gap-2">
          <span>Price</span>
          <Slider range min={1000} max={20000} defaultValue={[1000, 20000]} className="w-40" />
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mr-5 ml-5">
        {properties.map((property) => (
          <PropertyCard
            key={property.p_id}
            id={property.p_id}
            title={property.title}
            location={property.address}
            price={property.price}
            rating={0} // or fetch rating from reviews if available
            image={property.property_images[0] || "../default.jpg"}
            beds={property.no_of_beds}
            baths={property.no_of_bathrooms}
            sqft={property.sq_ft}
            showDetailsButton={true}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyListing;
