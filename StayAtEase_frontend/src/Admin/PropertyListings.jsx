import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  BarChartOutlined,
  CalendarOutlined,
  SearchOutlined,
  EyeOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import Footer from "../Components/Footer";
import Header from "./component/header";

// Stat Card Component
const StatCard = ({ icon, title, count, loading }) => (
  <div className="w-full md:w-1/3 p-3">
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between border border-gray-200">
      <div>
        <h6 className="text-gray-500 font-semibold">{title}</h6>
        {loading ? (
          <LoadingOutlined className="text-2xl text-gray-400" />
        ) : (
          <p className="text-2xl font-bold text-gray-800">{count}</p>
        )}
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
const PropertyRow = ({ property, navigate }) => {
  const firstImage = property.property_images?.[0] || "https://via.placeholder.com/150";
  
  const handleViewClick = () => {
    console.log("Navigating to property:", property.p_id); // Debug log
    navigate(`/admin-property/${property.p_id}`);
  };
  
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">
        <img
          src={firstImage}
          alt={property.title}
          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
      </td>
      <td className="p-4 text-gray-800 font-medium">
        <strong>{property.title}</strong>
        <br />
        <span className="text-gray-500 text-sm">ID: {property.p_id}</span>
      </td>
      <td className="p-4 font-bold text-gray-700">₹{property.price?.toLocaleString() || '0'}</td>
      <td className="p-4 text-gray-700">{property.address}</td>
      <td className="p-4 text-gray-700">{property.no_of_beds || '-'}</td>
      <td className="p-4 text-gray-700">{property.no_of_bathrooms || '-'}</td>
      <td className="p-4">
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full ${
            property.status === "Available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {property.status || 'N/A'}
        </span>
      </td>
      <td className="p-4">
        <button
          className="bg-blue-600 !text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          onClick={handleViewClick}
        >
          <EyeOutlined className="!text-white" /> View
        </button>
      </td>
    </tr>
  );
};

// Main Component
function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [inquiryCount, setInquiryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const propertiesPerPage = 5;

  const filteredProperties = properties.filter((property) =>
    property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProperties = currentPage * propertiesPerPage;
  const indexOfFirstProperties = indexOfLastProperties - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperties, indexOfLastProperties);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        // Fetch properties and inquiries in parallel
        const [propertyRes, inquiryRes] = await Promise.all([
          axios.get("http://localhost:5000/api/properties/my", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/inquiries/owner-inquiries", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setProperties(propertyRes.data);
        setInquiryCount(inquiryRes.data.inquiries?.length || 0);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && properties.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingOutlined className="text-4xl text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen p-8 px-10 py-25">
        <div className="container mx-auto mt-5 px-4">
          <h2 className="text-3xl !font-bold">Property Details</h2>

          <div className="flex flex-wrap mt-4 -mx-2">
            <StatCard 
              icon={<HomeOutlined className="!text-blue-600 text-3xl" />} 
              title="Total Properties" 
              count={properties.length} 
              loading={loading}
            />
            <StatCard 
              icon={<BarChartOutlined className="!text-blue-600 text-3xl" />} 
              title="Active Listings" 
              count={properties.filter(p => p.status === "Available").length} 
              loading={loading}
            />
            <StatCard 
              icon={<CalendarOutlined className="!text-blue-600 text-3xl" />} 
              title="Inquiries" 
              count={inquiryCount} 
              loading={loading}
            />
          </div>

          <div className="mt-6">
            <SearchBar searchTerm={searchTerm} handleSearch={setSearchTerm} />
          </div>

          <div className="overflow-x-auto mt-6 pt-4 mb-10">
            {filteredProperties.length === 0 ? (
              <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-600">
                  {searchTerm ? "No properties match your search" : "No properties found"}
                </h3>
              </div>
            ) : (
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
            )}
          </div>

          {/* Pagination */}
          {filteredProperties.length > 0 && (
            <div className="flex flex-wrap justify-between items-center mt-6 text-gray-600">
              <p>
                Showing {indexOfFirstProperties + 1} to {Math.min(indexOfLastProperties, filteredProperties.length)} of {filteredProperties.length} properties
              </p>
              <div className="flex space-x-4 mt-3 sm:mt-0">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded-lg transition-all ${
                    currentPage === 1 ? "text-gray-400 border-gray-300 cursor-not-allowed" : "text-blue-600 hover:bg-blue-100 cursor-pointer"
                  }`}
                >
                  Previous
                </button>
                <span className="px-5 py-2 border rounded-lg bg-blue-500 text-white font-bold">{currentPage}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded-lg transition-all ${
                    currentPage === totalPages ? "text-gray-400 border-gray-300 cursor-not-allowed" : "text-blue-600 hover:bg-blue-100 cursor-pointer"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PropertyListings;