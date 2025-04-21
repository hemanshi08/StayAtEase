import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../Components/Property_card";
import { Input, Button, Select, Slider } from "antd";
import { useAuth } from "../context/AuthContext";

const { Search } = Input;
const { Option } = Select;

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("new");
  const [selectedType, setSelectedType] = useState(null);
  const [priceRange, setPriceRange] = useState([1000, 20000]);

  useEffect(() => {
    fetchProperties();
    if (user) fetchWishlist();
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, sortOrder, selectedType, priceRange, properties]);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWishlist(res.data.map((item) => item.property.p_id));
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (searchTerm) {
      filtered = filtered.filter((property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((property) =>
        property.property_type.toLowerCase() === selectedType.toLowerCase()
      );
    }

    filtered = filtered.filter(
      (property) =>
        property.price >= priceRange[0] && property.price <= priceRange[1]
    );

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "new") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Find Your Perfect Stay</h1>
      <p className="text-gray-500">Our curated collection of properties</p>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 my-8 mr-5 ml-5">
        <Search
          placeholder="Search by title or address"
          style={{ width: 300 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
        />
        <Button type={sortOrder === "new" ? "primary" : "default"} onClick={() => setSortOrder("new")}>
          New
        </Button>
        <Button type={sortOrder === "asc" ? "primary" : "default"} onClick={() => setSortOrder("asc")}>
          Price ascending
        </Button>
        <Button type={sortOrder === "desc" ? "primary" : "default"} onClick={() => setSortOrder("desc")}>
          Price descending
        </Button>
        <Select
          placeholder="Property Type"
          style={{ width: 150 }}
          allowClear
          value={selectedType}
          onChange={(value) => setSelectedType(value)}
        >
          <Option value="apartment">Apartment</Option>
          <Option value="house">House</Option>
          <Option value="studio">Studio</Option>
        </Select>
        <div className="flex items-center gap-2">
          <span>Price</span>
          <Slider
            range
            min={1000}
            max={20000}
            value={priceRange}
            onChange={setPriceRange}
            className="w-40"
          />
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mr-5 ml-5">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.p_id}
            id={property.p_id}
            title={property.title}
            location={property.address}
            price={property.price}
            rating={property.avgRating}
            image={property.property_images[0] || "../default.jpg"}
            beds={property.no_of_beds}
            baths={property.no_of_bathrooms}
            sqft={property.sq_ft}
            defaultLiked={wishlist.includes(property.p_id)}
            showDetailsButton={true}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyListing;
