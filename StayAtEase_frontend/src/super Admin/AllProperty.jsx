import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEye, faFilter, faHome, faList, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import Header from "./component/header";

const propertiesData = [
  {
    id: "P001",
    title: "Apartment Modern",
    price: "₹250,000",
    size: "2,450 sq ft",
    address: "Sector 1, București",
    addedBy: "Robert",
    addedById: "1",
    status: "Available",
    image: "../Properties_image/iflat4.jpg",
    type: "Apartment"
  },
  {
    id: "P002",
    title: "Vila cu Grădină",
    price: "₹450,000",
    size: "5,650 sq ft",
    address: "Pipera, București",
    addedBy: "Sharonda",
    addedById: "2",
    status: "Unavailable",
    image: "../Properties_image/iflat1.jpg",
    type: "Villa"
  },
  {
    id: "P003",
    title: "Penthouse Exclusivist",
    price: "₹600,000",
    size: "3,650 sq ft",
    address: "Băneasa, București",
    addedBy: "Robert",
    addedById: "1",
    status: "Unavailable",
    image: "../Properties_image/iflat3.jpg",
    type: "Penthouse"
  },
];

const PropertyTable = () => {
  const [properties] = useState(propertiesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (propertyType === "" || property.type === propertyType)
  );

  return (
    <div>
      <Header/>
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Total Properties</h2>
      <div className="row mb-4">
        <Card icon={faHome} title="Total Properties" count={30} />
        <Card icon={faList} title="Active Listings" count={20} />
        <Card icon={faEnvelope} title="Inquiries" count={14} />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className="input-group w-50">
          <span className="input-group-text bg-light border-0">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            className="form-control border-0 shadow-sm"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="input-group w-25">
          <span className="input-group-text bg-light border-0">
            <FontAwesomeIcon icon={faFilter} />
          </span>
          <select
            className="form-select border-0 shadow-sm"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>
      </div>
      <div className="table-responsive mt-6">
        <table className="table">
          <thead className="custom-gray">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price / month</th>
              <th>Area (sqft)</th>
              <th>Address</th>
              <th>Added By</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property, index) => (
              <TableRow key={property.id} property={property} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

const Card = ({ icon, title, count }) => {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm border-0 p-3 d-flex flex-row align-items-center">
        <FontAwesomeIcon icon={icon} className="me-3 fs-3 text-primary" />
        <div>
          <h6 className="text-muted mb-0">{title}</h6>
          <h4 className="fw-bold mb-0">{count}</h4>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ property, index }) => {
  return (
    <tr className={index % 2 === 0 ? "bg-light" : "bg-white"}>
      <td>
        <img src={property.image} className="rounded" alt={property.title} width="60" height="40" />
      </td>
      <td>
        <div>
          <span className="fw-semibold d-block">{property.title}</span>
          <small className="text-muted">ID: {property.id}</small>
        </div>
      </td>
      <td className="fw-bold">{property.price}</td>
      <td>{property.size}</td>
      <td>{property.address}</td>
      <td>
        <div className="d-flex align-items-center">
          <img src="../profile.png" className="rounded-circle me-2" alt="User" width="30" height="30" />
          {property.addedBy} <small className="text-muted ms-1">Id: {property.addedById}</small>
        </div>
      </td>
      <td>
        <span className={`badge ${property.status === "Available" ? "bg-success" : "bg-danger"}`}>{property.status}</span>
      </td>
      <td>
        <button className="btn btn-primary btn-sm">
          <FontAwesomeIcon icon={faEye} className="me-1" /> View
        </button>
      </td>
    </tr>
  );
};

export default PropertyTable;
