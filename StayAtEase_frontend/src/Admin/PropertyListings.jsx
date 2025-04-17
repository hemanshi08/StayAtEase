import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  BarChartOutlined,
  CalendarOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Footer from "../Components/Footer";
import Header from "./component/header";

// Stat Card Component
const StatCard = ({ icon, title, count }) => (
  <div className="w-full md:w-1/3 p-3">
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between border border-gray-200">
      <div>
        <h6 className="text-gray-500 font-semibold">{title}</h6>
        <p className="text-2xl font-bold text-gray-800">{count}</p>
      </div>
      {icon}
    </div>
  </div>
);

// Search Bar Component
const SearchBar = ({ searchTerm, handleSearch }) => (
  <div className="flex items-center bg-white shadow-md p-3 rounded-lg border border-gray-200 w-full">
    <SearchOutlined className="text-gray-500 mr-2 text-lg" />
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      className="flex-grow border-none focus:outline-none text-gray-700"
      placeholder="Search by title or address..."
    />
  </div>
);

// Table Row Component
const PropertyRow = ({ property, navigate }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-4">
      <img
        src={property.property_images[0]}
        alt={property.title}
        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
      />
    </td>
    <td className="p-4 text-gray-800 font-medium">
      <strong>{property.title}</strong>
      <br />
      <span className="text-gray-500 text-sm">ID: {property.p_id}</span>
    </td>
    <td className="p-4 font-bold text-gray-700">₹ {property.price}</td>
    <td className="p-4 text-gray-700">{property.address}</td>
    <td className="p-4 text-gray-700">{property.no_of_beds}</td>
    <td className="p-4 text-gray-700">{property.no_of_bathrooms}</td>
    <td className="p-4">
      <span
        className={`px-3 py-1 text-sm font-semibold rounded-full ${
          property.status === "Available"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {property.status}
      </span>
    </td>
    <td className="p-4">
      <button
        className="bg-blue-600 !text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        onClick={() => navigate(`/PropertyDetails/${property.p_id}`)}
      >
        <EyeOutlined className="!text-white" /> View
      </button>
    </td>
  </tr>
);

// Main Component
function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const propertiesPerPage = 5;

  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProperties = currentPage * propertiesPerPage;
  const indexOfFirstProperties = indexOfLastProperties - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperties, indexOfLastProperties);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err.message);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen p-8 px-10 py-25">
        <div className="container mx-auto mt-5 px-4">
          <h2 className="text-3xl !font-bold">Property Details</h2>

          <div className="flex flex-wrap mt-4 -mx-2">
            <StatCard icon={<HomeOutlined className="!text-blue-600 text-3xl" />} title="Total Properties" count={properties.length} />
            <StatCard icon={<BarChartOutlined className="!text-blue-600 text-3xl" />} title="Active Listings" count={properties.filter(p => p.status === "Available").length} />
            <StatCard icon={<CalendarOutlined className="!text-blue-600 text-3xl" />} title="Inquiries" count={14} />
          </div>

          <div className="mt-6">
            <SearchBar searchTerm={searchTerm} handleSearch={setSearchTerm} />
          </div>

          <div className="overflow-x-auto mt-6 pt-4 mb-10">
            <table className="w-full bg-white shadow-lg rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold border-b border-gray-200">
                  <th className="px-6 py-4 text-left">Image</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Price / month</th>
                  <th className="px-6 py-4 text-left">Address</th>
                  <th className="px-6 py-4 text-left">Beds</th>
                  <th className="px-6 py-4 text-left">Bathrooms</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProperties.map((property) => (
                  <PropertyRow key={property.p_id} property={property} navigate={navigate} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap justify-between items-center mt-6 text-gray-600">
            <p>
              Showing {indexOfFirstProperties + 1} to {Math.min(indexOfLastProperties, filteredProperties.length)} of {filteredProperties.length} properties
            </p>
            <div className="flex space-x-4 mt-3 sm:mt-0">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-lg transition-all ${
                  currentPage === 1 ? "text-gray-400 border-gray-300 cursor-not-allowed" : "text-blue-600 hover:bg-blue-100 cursor-pointer"
                }`}
              >
                Previous
              </button>
              <span className="px-5 py-2 border rounded-lg bg-blue-500 text-white font-bold">{currentPage}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded-lg transition-all ${
                  currentPage === totalPages ? "text-gray-400 border-gray-300 cursor-not-allowed" : "text-blue-600 hover:bg-blue-100 cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PropertyListings;
