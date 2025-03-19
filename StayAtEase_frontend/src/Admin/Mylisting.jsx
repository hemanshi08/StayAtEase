import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faCalendarAlt, faSearch, faFilter, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import Header from "./component/header";

const properties = [
  { id: "P001", title: "Apartment Modern", price: "₹ 250,000", area: "2,450", address: "Sector 1, București", status: "Available", img: "../Properties_image/iflat4.jpg" },
  { id: "P002", title: "Vila cu Grădină", price: "₹ 450,000", area: "5,650", address: "Pipera, București", status: "Unavailable", img: "../Properties_image/iflat1.jpg" },
  { id: "P003", title: "Penthouse Exclusivist", price: "₹ 600,000", area: "3,650", address: "Băneasa, București", status: "Unavailable", img: "../Properties_image/iflat6.jpg" },
  { id: "P004", title: "Apartament 2 Camere", price: "₹ 180,000", area: "1,000", address: "Sector 3, București", status: "Available", img: "../Properties_image/iflat4.jpg" },
  { id: "P005", title: "Apartament 2 Camere", price: "₹ 180,000", area: "1,000", address: "Sector 3, București", status: "Available", img: "../Properties_image/iflat4.jpg" },
  { id: "P006", title: "Apartament 2 Camere", price: "₹ 180,000", area: "1,000", address: "Sector 3, București", status: "Available", img: "../Properties_image/iflat4.jpg" }
];

const StatCard = ({ icon, title, count }) => (
  <div className="w-full md:w-1/3 p-4">
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
      <div>
        <h6 className="text-gray-600 font-semibold">{title}</h6>
        <p className="text-2xl font-bold">{count}</p>
      </div>
      <FontAwesomeIcon icon={icon} className="text-blue-500 text-3xl" />
    </div>
  </div>
);

const SearchBar = () => (
  <div className="flex items-center bg-white shadow-md p-3 rounded-lg w-full max-w-lg">
    <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
    <input type="text" className="flex-grow border-none focus:outline-none" placeholder="Search properties..." />
    <div className="relative ml-4">
      <FontAwesomeIcon icon={faFilter} className="absolute left-2 top-3 text-gray-400" />
      <select className="pl-8 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none">
        <option selected>All</option>
        <option>Available</option>
        <option>Unavailable</option>
      </select>
    </div>
  </div>
);

const PropertyRow = ({ property }) => (
  <tr className="border-b">
    <td><img src={property.img} alt={property.title} className="w-16 h-16 object-cover rounded-lg" /></td>
    <td className="py-4"><strong>{property.title}</strong><br /><span className="text-gray-500 text-sm">ID: {property.id}</span></td>
    <td className="font-bold">{property.price}</td>
    <td>{property.area} sq ft</td>
    <td>{property.address}</td>
    <td>
  <span className={`px-3 py-1 text-sm font-semibold rounded-full 
    ${property.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
    {property.status}
  </span>
</td>
<td>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        <FontAwesomeIcon icon={faEye} /> View
      </button>
    </td>
  </tr>
);

function PropertyListings() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto mt-6 px-4 ">
        <h3 className="text-2xl font-bold">My Listings</h3>
        
        <div className="flex flex-wrap mt-4 -mx-2">
          <StatCard icon={faHome} title="Total Properties" count={6} />
          <StatCard icon={faChartBar} title="Active Listings" count={4} />
          <StatCard icon={faCalendarAlt} title="Inquiries" count={14} />
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <SearchBar />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            <FontAwesomeIcon icon={faPlus} /> Add Property
          </button>
        </div>
        
        <div className="overflow-x-auto mt-6 pt-4">
  <table className="w-full bg-white shadow-lg rounded-lg border border-gray-200">
    <thead>
      <tr className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold border-b border-gray-200">
        <th className="px-6 py-4 text-left">Image</th>
        <th className="px-6 py-4 text-left">Title</th>
        <th className="px-6 py-4 text-left">Price / month</th>
        <th className="px-6 py-4 text-left">Area (sqft)</th>
        <th className="px-6 py-4 text-left">Address</th>
        <th className="px-6 py-4 text-left">Status</th>
        <th className="px-6 py-4 text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      {properties.map((property) => (
        <tr key={property.id} className="even:bg-gray-50 hover:bg-gray-100">
          <td className="px-6 py-4">
            <img src={property.img} alt={property.title} className="w-20 h-16 object-cover rounded-md shadow-sm" />
          </td>
          <td className="px-6 py-4">
            <strong className="text-gray-800">{property.title}</strong>
            <br />
            <span className="text-gray-500 text-xs">ID: {property.id}</span>
          </td>
          <td className="px-6 py-4 font-bold text-gray-900">{property.price}</td>
          <td className="px-6 py-4 text-gray-700">{property.area} sq ft</td>
          <td className="px-6 py-4 text-gray-700">{property.address}</td>
          <td className="px-6 py-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${property.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {property.status}
            </span>
          </td>
          <td className="px-6 py-4 text-white">
            <button className="bg-blue-600  px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <FontAwesomeIcon icon={faEye} />
              View
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
      <Footer />
    </div>
  );
}

export default PropertyListings;
