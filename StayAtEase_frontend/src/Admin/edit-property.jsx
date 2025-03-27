import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "./component/header";
import { FaWifi, FaCar, FaDumbbell, FaSwimmer, FaTv, FaShieldAlt, FaUtensils, FaCloudUploadAlt } from "react-icons/fa";
import { MdLocalLaundryService, MdElevator } from "react-icons/md";

const EditProperty = () => {
  const navigate = useNavigate();

  // Static pre-filled values
  const defaultValues = {
    title: "Luxury Apartment",
    price: "250000",
    squareFootage: "1200",
    address: "123 Main Street, New York",
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Apartment",
    amenities: ["WiFi", "Parking Space", "Fitness Center"],
    images: [],
  };

  const [formData, setFormData] = useState(defaultValues);

  const amenitiesList = [
    { name: "WiFi", icon: <FaWifi /> },
    { name: "Parking Space", icon: <FaCar /> },
    { name: "Fitness Center", icon: <FaDumbbell /> },
    { name: "Swimming Pool", icon: <FaSwimmer /> },
    { name: "Elevator", icon: <MdElevator /> },
    { name: "Smart TV", icon: <FaTv /> },
    { name: "Security", icon: <FaShieldAlt /> },
    { name: "Kitchen", icon: <FaUtensils /> },
    { name: "Laundry", icon: <MdLocalLaundryService /> },
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 8) {
      alert("You can only upload up to 8 images.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    alert("Property details updated successfully!");
    navigate("/properties"); // Redirect to property listing
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto pt-4 p-28 m-4">
        <h2 className="text-2xl font-bold">Edit Property</h2>
        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium mb-2">Property Title</label>
              <input
                type="text"
                name="title"
                className="w-full p-4 bg-gray-100 rounded-lg "
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Price ($)</label>
                <input
                  type="text"
                  name="price"
                  className="w-full p-4 bg-gray-100 rounded-lg "
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Square Footage</label>
                <input
                  type="text"
                  name="squareFootage"
                  className="w-full p-4 bg-gray-100 rounded-lg "
                  value={formData.squareFootage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                className="w-full p-4 bg-gray-100 rounded-lg "
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block font-medium mb-2">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  className="w-full p-4 bg-gray-100 rounded-lg "
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  className="w-full p-4 bg-gray-100 rounded-lg "
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Property Type</label>
                <select
                  name="propertyType"
                  className="w-full p-4 bg-gray-100 rounded-lg "
                  value={formData.propertyType}
                  onChange={handleChange}
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Condo">Condo</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-medium mb-2">Amenities</label>
              <div className="grid grid-cols-3 gap-4 p-2">
                {amenitiesList.map((amenity, index) => (
                  <label key={index} className="flex items-center space-x-4 p-2 ">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity.name)}
                      onChange={() => handleAmenityToggle(amenity.name)}
                    />
                    <span className="flex items-center gap-2">
                      {amenity.icon} {amenity.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-4">Property Images</h2>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded">
              <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
                <FaCloudUploadAlt className="text-4xl mb-2 text-gray-500" />
                <p className="text-sm text-gray-700">Drag & drop images here or click to upload</p>
                <p className="text-xs text-gray-500">Maximum 8 images allowed</p>
                <div className="mt-2">
              <button className="bg-gray-300 px-4 py-2 rounded text-sm">Select Files</button>
            </div>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
               <div className="mt-2">
            {formData.images.length > 0 && (
              <p className="text-sm text-gray-400">{formData.images.length} images selected</p>
            )}
          </div>
            </div>

            <div className="mt-4 text-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
                Update Property
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProperty;
