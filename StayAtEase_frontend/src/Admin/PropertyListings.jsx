import React from "react";
import { useNavigate } from "react-router-dom";
import  { useState } from "react";
import { HomeOutlined, BarChartOutlined, CalendarOutlined, SearchOutlined, FilterOutlined, EyeOutlined } from "@ant-design/icons";
import Footer from "../Components/Footer";
import Header from "./component/header";

const properties = [
  { id: "P001", title: "Apartment Modern", price: "₹ 2500", address: "Sector 1, București", status: "Available",  addedByName: "John Doe", totalReviews: 12, totalInquiries: 5, propertyType: "Apartment", img: "../Properties_image/iflat4.jpg" },
  { id: "P002", title: "Vila cu Grădină", price: "₹ 4500", address: "Pipera, București", status: "Unavailable", addedByName: "Alice Smith", totalReviews: 20, totalInquiries: 8, propertyType: "Villa", img: "../Properties_image/iflat1.jpg" },
  { id: "P003", title: "Penthouse Exclusivist", price: "₹ 6000", address: "Băneasa, București", status: "Unavailable",  addedByName: "Michael Johnson", totalReviews: 15, totalInquiries: 10, propertyType: "Penthouse", img: "../Properties_image/iflat6.jpg" },
  { id: "P004", title: "Apartament 2 Camere", price: "₹ 1800", address: "Sector 3, București", status: "Available",addedByName: "Emma Brown", totalReviews: 9, totalInquiries: 4, propertyType: "Apartment", img: "../Properties_image/iflat4.jpg" },
  { id: "P005", title: "Casa Individuală", price: "₹ 3500", address: "Voluntari, Ilfov", status: "Available", addedBy: "Admin", addedByName: "David Wilson", totalReviews: 18, totalInquiries: 7, propertyType: "House", img: "../Properties_image/iflat5.jpg" },
  { id: "P006", title: "Casa Individuală", price: "₹ 3500", address: "Voluntari, Ilfov", status: "Available", addedBy: "Admin", addedByName: "David Wilson", totalReviews: 18, totalInquiries: 7, propertyType: "House", img: "../Properties_image/iflat5.jpg" }

];

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

const PropertyRow = ({property, navigate  }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-4"><img src={property.img} alt={property.title} className="w-16 h-16 object-cover rounded-lg border border-gray-200" /></td>
    <td className="p-4 text-gray-800 font-medium"><strong>{property.title}</strong><br /><span className="text-gray-500 text-sm">ID: {property.id}</span></td>
    <td className="p-4 font-bold text-gray-700">{property.price}</td>
    <td className="p-4 text-gray-700">{property.address}</td>
    {/* <td className="p-4 text-gray-700">{property.addedByName}</td> */}
    <td className="p-4 text-gray-700">{property.totalReviews}</td>
    <td className="p-4 text-gray-700">{property.totalInquiries}</td>
    <td className="p-4">
      <span className={`px-3 py-1 text-sm font-semibold rounded-full 
        ${property.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
        {property.status}
      </span>
    </td>
    <td className="p-4">
      <button className="bg-blue-600 !text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
     onClick={() => navigate(`/PropertyDetails`)}>
        <EyeOutlined className="!text-white" /> View
      </button>
    </td>
  </tr>
);



function PropertyListings() {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;
  const indexOfLastProperties = currentPage * propertiesPerPage;
  const indexOfFirstProperties = indexOfLastProperties - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperties, indexOfLastProperties);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const navigate = useNavigate();

  return (
   

    <div>
      <Header/>
    <div className="bg-gray-100 min-h-screen p-8 px-10 py-25">
      
      <div className="container mx-auto mt-5 px-4">
      <h2 className="text-3xl !font-bold">Property Details</h2>
      <div className="flex flex-wrap mt-4 -mx-2">
          <StatCard icon={<HomeOutlined className="!text-blue-600 text-3xl" />} title="Total Properties" count={6} />
          <StatCard icon={<BarChartOutlined className="!text-blue-600 text-3xl" />} title="Active Listings" count={4} />
          <StatCard icon={<CalendarOutlined className="!text-blue-600 text-3xl" />} title="Inquiries" count={14} />
        </div>
        
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
                  {/* <th className="px-6 py-4 text-left">Added By</th> */}
                  <th className="px-6 py-4 text-left">Total Reviews</th>
                  <th className="px-6 py-4 text-left">Total Inquiries</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
            </thead>
            <tbody>
            {currentProperties.map((property) => (
                <PropertyRow key={property.id} property={property} navigate={navigate} />
              ))}
            </tbody>
          </table>
        </div>

           {/* Pagination */}
           <div className="flex flex-wrap justify-between items-center mt-6 text-gray-600">
          <p>
            Showing {indexOfFirstProperties + 1} to {Math.min(indexOfLastProperties, properties.length)} of {properties.length} reviews
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

export default PropertyListings;
