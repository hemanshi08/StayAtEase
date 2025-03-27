import React, { useState } from "react";
import Footer from "../Components/Footer";
import Header from "./component/header";
import { FaWifi, FaCar, FaDumbbell, FaSwimmer, FaTv, FaShieldAlt, FaUtensils, FaBuilding ,FaCloudUploadAlt } from "react-icons/fa";
import { MdLocalLaundryService, MdElevator } from "react-icons/md";

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
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto pt-4 p-28 mt-5 mb-0">
        <h2 className="text-2xl font-bold">Add New Property</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <form>
          <div className="mb-6">
  <label className="block font-medium mb-2">Property Title</label>
  <input
    type="text"
    name="title"
    className="w-full p-4 bg-gray-100 rounded-lg"
    placeholder="Enter property title"
    value={formData.title}
    onChange={handleChange}
  />
</div>


            <div className="grid grid-cols-2 gap-4 ">
              <div>
                <label className="block font-medium mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  className="w-full p-4 bg-gray-100 rounded-lg "
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Square Footage</label>
                <input
                  type="text"
                  name="squareFootage"
                  className="w-full p-4 bg-gray-100 rounded-lg"
                  placeholder="Enter square footage"
                  value={formData.squareFootage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4 ">
              <label className="block font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                className="w-full p-4 bg-gray-100 rounded-lg"
                placeholder="Enter complete address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 ">
              <div>
                <label className="block font-medium mb-2">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  className="w-full p-4 bg-gray-100 rounded-lg  "
                  placeholder="Number of bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-2 ">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  className="w-full p-4 bg-gray-100 rounded-lg "
                  placeholder="Number of bathrooms"
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
                  <option value="">Select Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Condo">Condo</option>
                </select>
              </div>
            </div>
{/* Amenities */}
            <div className="m-4 mb-6">
        <label className="block font-medium mb-2">Amenities</label>
        <div className="grid grid-cols-3 gap-4 p-2">
          {amenitiesList.map((amenity, index) => (
            <label key={index} className="flex items-center space-x-4 p-2 ">
              <input 
                type="checkbox"
                checked={formData.amenities.includes(amenity.name)}
                onChange={() => handleAmenityToggle(amenity.name)}
              />
              <span className="flex items-center space-x-2">{amenity.icon} <span>{amenity.name}</span></span>
            </label>
          ))}
        </div>
        </div>
          
        <h2 className="text-2xl font-bold text-left mb-4 pt-4">Property Images</h2>
        <div className="flex flex-col items-center  p-6 rounded-lg bg-gray-50">
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
              <p className="text-sm text-gray-600">{formData.images.length} images selected</p>
            )}
          </div>
        </div>

            <div className="mt-6 text-center">
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Submit Property
              </button>
            </div>
          </form>
        </div>
      
      </div>
      <Footer />
    </div>
  );
};

export default PropertyForm;
