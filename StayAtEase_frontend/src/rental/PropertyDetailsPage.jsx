import React, { useState } from "react";
import { Modal, Button, Rate } from "antd";
import { PhoneOutlined, SendOutlined, EditOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Reviews from "../Components/ReviewPage";


const PropertyDetails = () => {
  const location = useLocation();
  const {
    title,
    location: propertyLocation,
    price,
    beds,
    baths,
    sqft,
    rating = 0, // Default to 0 if undefined
    reviews = [], // Default to empty array to avoid undefined errors
    image
  } = location.state || {};
  const images = [
    {image},
    "../Properties_image/flat5.jpg",
    "../Properties_image/villa3.jpg",
    "../Properties_image/iflat6.jpg",
    "../Properties_image/i flat7.jpg",
  ];

  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openSlider = (img) => {
    setSelectedImage(img);
    setVisible(true);
  };

  return (
    <div className="max-w-8xl mx-auto px-10 py-8">
      {/* IMAGE GALLERY */}
      <div className="grid grid-cols-3 gap-2">
        <img
          src={image}
          alt="Main"
          className="col-span-2 h-80 w-full object-cover rounded-lg cursor-pointer"
          onClick={() => openSlider(images[0])}
        />
        <div className="grid grid-rows-2 gap-2">
          {images.slice(1, 3).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="h-40 w-full object-cover rounded-lg cursor-pointer"
              onClick={() => openSlider(img)}
            />
          ))}
          {images.length > 3 && (
            <div
              className="h-40 w-full bg-gray-800 text-white flex items-center justify-center rounded-lg cursor-pointer"
              onClick={() => openSlider(images[3])}
            >
              +{images.length - 3} More
            </div>
          )}
        </div>
      </div>

      {/* MODAL FOR IMAGE SLIDER */}
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)} width={800}>
        <img src={selectedImage} alt="Enlarged" className="w-full h-auto" />
      </Modal>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {/* Left Section - Property Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500 text-xl">{propertyLocation}</p>
          <p className="text-blue-600 text-2xl font-bold">₹{price} / month</p>

          <div className="mt-4 text-gray-700 ">
            <p>🛏️ {beds} beds &nbsp;&nbsp; 🚿 {baths} baths &nbsp;&nbsp; 📏 {sqft} sq ft</p>
          </div>

<div className="mt-8">
          <h2 className=" text-2xl font-semibold">Features & Amenities</h2>
          <div className="grid grid-cols-2 gap-3 text-gray-600 mt-5">
            <p>📶 High-speed WiFi</p>
            <p>🚗 Parking Space</p>
            <p>🏊 Swimming Pool</p>
            <p>🏋️ Fitness Center</p>
            <p>🛗 Elevator</p>
            <p>📺 Smart TV</p>
            <p>🔒 24/7 Security</p>
            <p>🍽️ Kitchen</p>
            <p>🧺 Laundry</p>
          </div>
          </div>
          <div className="mt-6">
          <h2 className=" text-2xl font-semibold">About this property</h2>
          <p className="text-gray-600 tracking-wider leading-relaxed">
            This stunning apartment offers modern living at its finest. With breathtaking city views, premium amenities,
            and a prime location, it’s perfect for those seeking luxury and convenience.
          </p>
          </div>
        </div>

        {/* Right Section - Agent Info */}
        <div className="mt-20">
          <div className=" p-6 bg-gray-100 rounded-lg">
          <div className="flex">
            <img
              src="../profile_image/team-3.jpg"
              alt="Agent"
              className="w-12 h-12 rounded-full mr-3"
            />
            <div className="flex flex-col">
              <span className="font-semibold mt-1">Michael Anderson</span>
              <span className="text-gray-500 text-sm mt-1">Senior Property Consultant</span>
            </div>
          </div>
          <div className="flex flex-col gap-2.5 mt-6">
          <Button type="primary" icon={<PhoneOutlined />} className="w-full">
            Call Agent
          </Button>
          <Button icon={<SendOutlined />} className="w-full mt-2">
            Send Inquiry
          </Button>
          <Button type="link" icon={<EditOutlined />} className="w-full mt-2">
            Write Review
          </Button>
          </div>
          <div className="mt-6 flex flex-col gap-2">
          <h2 className="mt-6 flex  text-lg font-semibold">
            <ClockCircleOutlined className="mr-2" /> Available Hours
          </h2>
          <span className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</span>
          <span className="text-gray-600">Sat: 10:00 AM - 4:00 PM</span>
          </div>
          </div>
        </div>

        

      </div>
      {/* Reviews Section */}
      <Reviews rating={rating} reviews={reviews} />
    </div>
    
  );
};

export default PropertyDetails;




