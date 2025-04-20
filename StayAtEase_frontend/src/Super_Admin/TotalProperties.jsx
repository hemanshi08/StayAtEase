import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HomeOutlined, BarChartOutlined, CalendarOutlined, SearchOutlined, FilterOutlined, EyeOutlined } from "@ant-design/icons";
import Footer from "../Components/Footer";
import SuperAdminNavbar from "./Superadmin_navbar";

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

const SearchBar = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => (
  <div className="flex items-center bg-white shadow-md p-3 rounded-lg border border-gray-200 w-full">
    <SearchOutlined className="text-gray-500 mr-2 text-lg" />
    <input 
      type="text" 
      className="flex-grow border-none focus:outline-none text-gray-700" 
      placeholder="Search properties..." 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <div className="relative ml-4">
      <FilterOutlined className="absolute left-2 top-3 text-gray-500 text-lg" />
      <select 
        value={filterStatus} 
        onChange={(e) => setFilterStatus(e.target.value)}
        className="pl-8 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none text-gray-700"
      >
        <option value="All">All</option>
        <option value="Available">Available</option>
        <option value="Unavailable">Unavailable</option>
      </select>
    </div>
  </div>
);

const PropertyRow = ({ property, navigate }) => {
  const status = property.status === "Available" ? "Available" : "Unavailable";
  const imgSrc = property.property_images?.[0] || "../Properties_image/default.jpg";
  
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">
        <img src={imgSrc} alt={property.title} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
      </td>
      <td className="p-4 text-gray-800 font-medium">
        <strong>{property.title}</strong>
        <br />
        <span className="text-gray-500 text-sm">ID: {property.p_id}</span>
      </td>
      <td className="p-4 font-bold text-gray-700">₹{property.price}</td>
      <td className="p-4 text-gray-700">{property.address}</td>
      <td className="p-4 text-gray-700">{property.User?.fullName || 'N/A'}</td>
      <td className="p-4 text-gray-700">{property.Reviews?.length || 0}</td>
      <td className="p-4 text-gray-700">{property.Inquiries?.length || 0}</td>
      <td className="p-4">
        <span className={`px-3 py-1 text-sm font-semibold rounded-full 
          ${status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {status}
        </span>
      </td>
      <td className="p-4">
        <button 
          className="bg-blue-600 !text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          onClick={() => navigate(`/AdminPropertydetails/${property.p_id}`)}
        >
          <EyeOutlined className="!text-white" /> View
        </button>
      </td>
    </tr>
  );
};

function TotalProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/properties/admin/all", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        // Format the properties data to ensure consistent structure
        const formattedProperties = response.data.map(property => ({
          ...property,
          status: property.status || "Available", // Ensure status exists
          Reviews: property.Reviews || [],
          Inquiries: property.Inquiries || []
        }));
        
        setProperties(formattedProperties);
      } catch (err) {
        console.error("Error fetching properties:", {
          message: err.message,
          response: err.response?.data,
          config: err.config
        });
        setError(err.response?.data?.error || "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Calculate statistics
  const totalProperties = properties.length;
  const activeListings = properties.filter(p => p.status === "Available").length;
  const totalInquiries = properties.reduce((sum, p) => sum + (p.Inquiries?.length || 0), 0);
  const totalReviews = properties.reduce((sum, p) => sum + (p.Reviews?.length || 0), 0);

  // Filter properties based on search and status
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || 
                         property.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div>
      <div className="bg-gray-100 min-h-screen p-8 mt-13">
        <SuperAdminNavbar />
        <div className="container mx-auto mt-5 px-4">
          <h2 className="text-3xl !font-bold">Property Details</h2>
          <div className="flex flex-wrap mt-4 -mx-2">
            <StatCard 
              icon={<HomeOutlined className="!text-blue-600 text-3xl" />} 
              title="Total Properties" 
              count={totalProperties} 
            />
            <StatCard 
              icon={<BarChartOutlined className="!text-blue-600 text-3xl" />} 
              title="Active Listings" 
              count={activeListings} 
            />
            <StatCard 
              icon={<CalendarOutlined className="!text-blue-600 text-3xl" />} 
              title="Inquiries" 
              count={totalInquiries} 
            />
          </div>
          
          <div className="mt-6">
            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
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
                  <PropertyRow 
                    key={property.p_id} 
                    property={property} 
                    navigate={navigate} 
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap justify-between items-center mt-6 text-gray-600">
            <p>
              Showing {indexOfFirstProperty + 1} to {Math.min(indexOfLastProperty, filteredProperties.length)} of {filteredProperties.length} properties
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TotalProperties;