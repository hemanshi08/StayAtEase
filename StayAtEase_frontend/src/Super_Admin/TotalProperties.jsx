import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, BarChartOutlined, CalendarOutlined, SearchOutlined, FilterOutlined, EyeOutlined } from "@ant-design/icons";
import Footer from "../Components/Footer";
import SuperAdminNavbar from "./Superadmin_navbar";
import axios from "axios";

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

const SearchBar = () => (
  <div className="flex items-center bg-white shadow-md p-3 rounded-lg border border-gray-200 w-full">
    <SearchOutlined className="text-gray-500 mr-2 text-lg" />
    <input type="text" className="flex-grow border-none focus:outline-none text-gray-700" placeholder="Search properties..." />
    <div className="relative ml-4">
      <FilterOutlined className="absolute left-2 top-3 text-gray-500 text-lg" />
      <select defaultValue="All" className="pl-8 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none text-gray-700">
        <option value="All">All</option>
        <option value="Available">Available</option>
        <option value="Unavailable">Unavailable</option>
      </select>
    </div>
  </div>
);

const PropertyRow = ({ property, navigate }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-4">
      <img src={property.property_images?.[0] || "/default.jpg"} alt={property.title} className="w-16 h-16 object-cover rounded-lg border" />
    </td>
    <td className="p-4 font-medium">{property.title}<br /><span>ID: {property.p_id}</span></td>
    <td className="p-4 font-bold text-gray-700">₹ {property.price}</td>
    <td className="p-4">{property.address}</td>
    <td className="p-4">{property.User?.name || "N/A"}</td>
    <td className="p-4">{property.totalReviews || 0}</td>
    <td className="p-4">{property.totalInquiries || 0}</td>
    <td className="p-4">
      <span className={`px-3 py-1 text-sm font-semibold rounded-full 
        ${property.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
        {property.status}
      </span>
    </td>
    <td className="p-4">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={() => navigate(`/ShowProperty/${property.p_id}`)}>
        <EyeOutlined /> View
      </button>
    </td>
  </tr>
);

function TotalProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;
  const navigate = useNavigate();

  const indexOfLastProperties = currentPage * propertiesPerPage;
  const indexOfFirstProperties = indexOfLastProperties - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperties, indexOfLastProperties);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored
        const response = await axios.get("http://localhost:5000/api/properties/admin", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch properties:", err.message);
        setError("Failed to fetch properties.");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
    <div className="bg-gray-100 min-h-screen p-8 mt-13">
      <SuperAdminNavbar />
      <div className="container mx-auto mt-5 px-4">
        <h2 className="text-3xl !font-bold">Property Details</h2>
        <div className="flex flex-wrap mt-4 -mx-2">
          <StatCard icon={<HomeOutlined className="!text-blue-600 text-3xl" />} title="Total Properties" count={properties.length} />
          <StatCard icon={<BarChartOutlined className="!text-blue-600 text-3xl" />} title="Active Listings" count={properties.filter(property => property.status === 'Available').length} />
          <StatCard icon={<CalendarOutlined className="!text-blue-600 text-3xl" />} title="Inquiries" count={properties.reduce((acc, property) => acc + property.totalInquiries, 0)} />
        </div>

        {loading ? (
          <p className="text-center text-gray-600 mt-6">Loading properties...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-6">{error}</p>
        ) : (
          <>
            <div className="mt-6">
              <SearchBar />
            </div>

            <div className="overflow-x-auto mt-6 pt-4 mb-10">
              <table className="w-full bg-white shadow-lg rounded-lg border border-gray-200">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold border-b border-gray-200">
                    <th className="px-6 py-4 text-left">Image</th>
                    <th className="px-6 py-4 text-left">Title</th>
                    <th className="px-6 py-4 text-left">Price / month</th>
                    <th className="px-6 py-4 text-left">Address</th>
                    <th className="px-6 py-4 text-left">Added By</th>
                    <th className="px-6 py-4 text-left">Total Reviews</th>
                    <th className="px-6 py-4 text-left">Total Inquiries</th>
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
                Showing {indexOfFirstProperties + 1} to {Math.min(indexOfLastProperties, properties.length)} of {properties.length} properties
              </p>
              <div className="flex space-x-4 mt-3 sm:mt-0">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded-lg transition-all ${
                    currentPage === 1
                      ? "text-gray-400 border-gray-300 cursor-not-allowed"
                      : "text-blue-600 hover:bg-blue-100 cursor-pointer"
                  }`}
                >
                  Previous
                </button>
                <span className="w-1"></span>
                <span className="px-5 py-2 border rounded-lg bg-blue-500 text-white font-bold">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded-lg transition-all ${
                    currentPage === totalPages
                      ? "text-gray-400 border-gray-300 cursor-not-allowed"
                      : "text-blue-600 hover:bg-blue-100 cursor-pointer"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    
    </div>
      <Footer />
      </div>
  );
}

export default TotalProperties;
