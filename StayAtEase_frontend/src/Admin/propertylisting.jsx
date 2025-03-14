import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faCalendarAlt, faSearch, faFilter, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
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
    <div className="col-md-4">
      <div className="card stats-card">
        <div className="stats-header">
          <div>
            <h6>{title}</h6>
            <p className="stats-count">{count}</p>
          </div>
          <FontAwesomeIcon icon={icon} className="stats-icon" />
        </div>
      </div>
    </div>
  );
  
  

const SearchBar = () => (
  <div className="search-container">
    <FontAwesomeIcon icon={faSearch} className="search-icon" />
    <input type="text" className="search-input" placeholder="Search properties..." />
    <div className="filter-container">
      <FontAwesomeIcon icon={faFilter} className="filter-icon" />
      <select className="filter-dropdown">
        <option selected>All</option>
        <option>Available</option>
        <option>Unavailable</option>
      </select>
    </div>
  </div>
);

const PropertyRow = ({ property }) => (
  <tr>
    <td><img src={property.img} alt={property.title} className="property-img" /></td>
    <td><strong>{property.title}</strong> <br /><small className="text-muted">ID: {property.id}</small></td>
    <td className="fw-bold">{property.price}</td>
    <td>{property.area} sq ft</td>
    <td>{property.address}</td>
    <td><span className={`status-badge ${property.status}`}>{property.status}</span></td>
    <td>
      <button className="btn view-btn">
        <FontAwesomeIcon icon={faEye} /> View
      </button>
    </td>
  </tr>
);

function PropertyListings() {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h3 className="fw-bold">My Listings</h3>

        {/* Statistics Cards */}
        <div className="row mt-3">
          <StatCard icon={faHome} title="Total Properties" count={6} />
          <StatCard icon={faChartBar} title="Active Listings" count={4} />
          <StatCard icon={faCalendarAlt} title="Inquiries" count={14} />
        </div>

        {/* Search Bar & Add Property Button */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <SearchBar />
          <button className="btn add-btn">
            <FontAwesomeIcon icon={faPlus} /> Add Property
          </button>
        </div>

        {/* Properties Table */}
        <div className="table-responsive mt-4">
          <table className="table property-table px-0">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price / month</th>
                <th>Area (sqft)</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <PropertyRow key={property.id} property={property} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyListings;
