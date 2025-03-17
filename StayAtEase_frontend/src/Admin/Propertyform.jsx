import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../Components/Footer";
import Header from "./component/header";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    squareFootage: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    amenities: [],
    images: [],
  });

  const amenitiesList = [
    { name: "WiFi", icon: "bi-wifi" },
    { name: "Parking Space", icon: "bi-car-front" },
    { name: "Fitness Center", icon: "bi-dumbbell" },
    { name: "Swimming Pool", icon: "bi-water" },
    { name: "Elevator", icon: "bi-building" },
    { name: "Smart TV", icon: "bi-tv" },
    { name: "Security", icon: "bi-shield-lock" },
    { name: "Kitchen", icon: "bi-house-door" },
    { name: "Laundry", icon: "bi bi-badge-wc-fill" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length + formData.images.length > 8) {
      alert("You can upload a maximum of 8 images.");
      return;
    }
    setFormData({ ...formData, images: [...formData.images, ...e.target.files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div >
        <Header/>
    <div className="container my-5 px-0">
      <h2 className="fw-bold">Add New Property</h2>
      <div className="property-form mt-4 p-4 bg-white shadow-sm rounded">
        <form onSubmit={handleSubmit}>
          {/* Property Title */}
          <div className="mb-3">
            <label className="form-label">Property Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter property title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

         
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Price</label>
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Square Footage</label>
              <input
                type="text"
                className="form-control"
                name="squareFootage"
                placeholder="Enter square footage"
                value={formData.squareFootage}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address */}
          <div className="mt-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Enter complete address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Bedrooms, Bathrooms, Property Type */}
          <div className="row g-3 mt-3">
            <div className="col-md-4">
              <label className="form-label">Bedrooms</label>
              <input
                type="number"
                className="form-control"
                name="bedrooms"
                placeholder="Number of bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Bathrooms</label>
              <input
                type="number"
                className="form-control"
                name="bathrooms"
                placeholder="Number of bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Property Type</label>
              <select
                className="form-select"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="">Select Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Condo">Condo</option>
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-4">
            <label className="form-label">Amenities</label>
            <div className="row g-2">
              {amenitiesList.map((amenity, index) => (
                <div className="col-md-3" key={index}>
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity.name)}
                    onChange={() => handleAmenityToggle(amenity.name)}
                  />{" "}
                  <i className={`bi ${amenity.icon}`}></i> {amenity.name}
                </div>
              ))}
            </div>
          </div>

          {/* Property Images */}
          <div className="mt-4">
            <label className="form-label">Property Images</label>
            <div className="file-upload text-center p-4 border border-dashed rounded bg-light">
              <i className="bi bi-cloud-arrow-up display-4 text-secondary"></i>
              <p className="fw-bold">Drag & drop images here or click to upload</p>
              <p className="small text-muted">Maximum 8 images allowed</p>
              <input
                type="file"
                className="form-control d-none"
                id="fileInput"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <button
                className="btn btn-outline-primary"
                onClick={() => document.getElementById("fileInput").click()}
                type="button"
              >
                Select Files
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 text-center">
            <button type="submit" className="btn btn-primary w-100 p-2 fs-5">
              Submit Property
            </button>
          </div>
        </form>
      </div>
    
    </div>
    <Footer/>
    </div>
  );
};

export default PropertyForm;
