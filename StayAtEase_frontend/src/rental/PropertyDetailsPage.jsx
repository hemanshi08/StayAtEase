// import React, { useState } from "react";
// import { Modal, Button } from "antd";
// import { EnvironmentOutlined, PhoneOutlined, ClockCircleOutlined } from "@ant-design/icons";
// import Reviews from "../Components/ReviewPage";

// const PropertyDetails = ({
//   title,
//   location,
//   price,
//   beds,
//   baths,
//   sqft,
//   features,
//   description,
//   agent,
//   agentContact,
//   availableHours,
//   images = [],
//   reviews = [],
//   rating = 0,
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const openModal = (image) => {
//     if (!image) return;
//     setSelectedImage(image);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Image Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="md:col-span-2">
//           <img
//             src={images[0] || "/default-image.jpg"}
//             alt="Main Property"
//             className="w-full h-96 object-cover rounded-lg cursor-pointer"
//             onClick={() => openModal(images[0])}
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-2">
//           {images.slice(1).map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`Thumbnail ${index + 1}`}
//               className="h-24 w-full object-cover rounded-lg cursor-pointer"
//               onClick={() => openModal(img)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Property Details */}
//       <div className="mt-6">
//         <h1 className="text-3xl font-bold">{title}</h1>
//         <p className="text-gray-600 flex items-center mt-2">
//           <EnvironmentOutlined className="mr-2" /> {location}
//         </p>
//         <p className="text-blue-600 text-xl font-bold mt-2">₹{price} / month</p>
//         <p className="mt-2 text-gray-700">{beds} beds • {baths} baths • {sqft} sq ft</p>
//       </div>

//       {/* Features & Amenities */}
//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold">Features & Amenities</h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
//           {features.map((feature, index) => (
//             <p key={index}>{feature}</p>
//           ))}
//         </div>
//       </div>

//       {/* About */}
//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold">About this property</h2>
//         <p className="text-gray-700 mt-2">{description}</p>
//       </div>

//       {/* Reviews */}
//       {reviews.length > 0 ? (
//         <Reviews reviews={reviews} rating={rating} />
//       ) : (
//         <p className="mt-4 text-gray-500">No reviews yet. Be the first to leave a review!</p>
//       )}

//       {/* Contact Agent */}
//       <div className="mt-6 bg-gray-100 p-4 rounded-lg">
//         <h3 className="text-xl font-semibold">{agent}</h3>
//         <p className="text-gray-600">Senior Property Consultant</p>
//         <Button type="primary" className="mt-3 w-full flex items-center justify-center" aria-label="Call Agent">
//           <PhoneOutlined className="mr-2" /> {agentContact}
//         </Button>
//         <p className="mt-2 text-gray-600 flex items-center">
//           <ClockCircleOutlined className="mr-2" /> Available Hours: {availableHours}
//         </p>
//       </div>

//       {/* Image Modal */}
//       <Modal open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)} centered>
//         <img src={selectedImage} alt="Enlarged View" className="w-full rounded-lg" />
//       </Modal>
//     </div>
//   );
// };

// export default PropertyDetails;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import Reviews from "../Components/ReviewPage";


// const PropertyDetails = () => {
//   const location = useLocation();
//   const {
//     id,
//     title,
//     location: propertyLocation,
//     price,
//     beds,
//     baths,
//     sqft,
//     rating = 0, // Default to 0 if undefined
//     reviews = [], // Default to empty array to avoid undefined errors
//     image
//   } = location.state || {};

//   console.log("Reviews received in PropertyDetails:", reviews); // Debugging

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold">{title}</h1>
//       <p className="text-gray-600">{propertyLocation}</p>
//       <p className="text-blue-600 text-xl font-bold">₹{price} / month</p>
//       <p>{beds} beds • {baths} baths • {sqft} sqft</p>

//       <img src={image} alt={title} className="w-full h-96 object-cover rounded-lg" />

//       {/* Reviews Section */}
//       <Reviews rating={rating} reviews={reviews} />
//     </div>
//   );
// };


// export default PropertyDetails;

// dynremic price show

// import { useLocation, useParams } from "react-router-dom";w
// import { Button, Rate } from "antd";
// import { PhoneOutlined, MailOutlined, EditOutlined, ClockCircleOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";

// const PropertyDetails = () => {

//   const { id } = useParams(); // Get property ID from URL
//   const location = useLocation(); // Get state from navigation
//   const [property, setProperty] = useState(location.state || null);

//   useEffect(() => {
//     if (!property) {
//       // Fetch property details from an API or database using 'id'
//       fetch(`/api/properties/${id}`)
//         .then((res) => res.json())
//         .then((data) => setProperty(data))
//         .catch((err) => console.error("Error fetching property details:", err));
//     }
//   }, [id, property]);

//   if (!property) return <p>Loading property details...</p>;

//   return (
    
//     <div className="container mx-auto p-6">
//       {/* Property Image Gallery */}
//       <div className="grid grid-cols-12 gap-4">
//         <div className="col-span-8">
//           <img
//             src={property.mainImage}
//             alt={property.title}
//             className="w-full h-96 object-cover rounded-lg"
//           />
//         </div>
//         <div className="col-span-4 grid grid-rows-4 gap-2">
//           {property.images?.map((img, index) => (
//             <img key={index} src={img} alt="Thumbnail" className="w-full h-24 object-cover rounded-lg" />
//           ))}
//         </div>
//       </div>

//       {/* Property Info */}
//       <div className="mt-6 flex justify-between flex-wrap">
//         <div>
//           <h1 className="text-3xl font-bold">{property.title}</h1>
//           <p className="text-gray-500">{property.location}</p>
//           <p className="text-blue-600 text-2xl font-semibold mt-2">₹{property.price} / month</p>
//           <p className="text-gray-700 mt-2">{property.details}</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Button type="primary" icon={<PhoneOutlined />}>Call Agent</Button>
//           <Button icon={<MailOutlined />}>Send Inquiry</Button>
//           <Button icon={<EditOutlined />}>Write Review</Button>
//         </div>
//       </div>

//       {/* Features & Amenities */}
//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold">Features & Amenities</h2>
//         <div className="grid grid-cols-3 gap-4 mt-4 text-gray-700">
//           {property.amenities?.map((amenity, index) => (
//             <p key={index}>✅ {amenity}</p>
//           ))}
//         </div>
//       </div>

//       {/* About Property */}
//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold">About this property</h2>
//         <p className="text-gray-600 mt-2">{property.description}</p>
//       </div>

//       {/* Reviews */}
//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold">Reviews</h2>
//         <div className="flex items-center mt-2">
//           <Rate disabled defaultValue={property.rating} allowHalf />
//           <span className="ml-2 text-gray-700">{property.rating} ({property.reviews?.length} reviews)</span>
//         </div>
//         <div className="mt-4 grid grid-cols-3 gap-4">
//           {property.reviews?.map((review, index) => (
//             <div key={index} className="p-4 border rounded-lg shadow-sm">
//               <h3 className="font-semibold">{review.name}</h3>
//               <Rate disabled defaultValue={review.rating} className="mt-1" />
//               <p className="text-gray-600 mt-2">{review.comment}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Agent Info */}
//       <div className="mt-6 p-4 border rounded-lg shadow-sm flex items-center justify-between">
//         <div>
//           <h3 className="font-semibold">{property.agentName}</h3>
//           <p className="text-gray-600">{property.agentTitle}</p>
//           <p className="mt-2 text-gray-600 flex items-center"><ClockCircleOutlined className="mr-2" /> {property.agentAvailability}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;














// import { useLocation, useParams } from "react-router-dom";
// import { Button, Rate } from "antd";
// import { PhoneOutlined, MailOutlined, EditOutlined, ClockCircleOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const [property, setProperty] = useState(location.state || null);

//   useEffect(() => {
//     if (!property || !property.mainImage) {
//       fetch(`/api/properties/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           console.log("Fetched Property Data:", data); // Debugging
//           setProperty(data);
//         })
//         .catch((err) => console.error("Error fetching property details:", err));
//     }
//   }, [id]); // Removed property dependency to avoid infinite re-renders

//   if (!property) return <p>Loading property details...</p>;

//   return (
//     <div className="container mx-auto p-6">
//       {/* Property Image Gallery */}
//       <div className="grid grid-cols-12 gap-4">
//         <div className="col-span-8">
//           <img
//             src={property.mainImage || "/default-placeholder.jpg"}
//             alt={property.title || "No Image Available"}
//             className="w-full h-96 object-cover rounded-lg"
//           />
//         </div>
//         <div className="col-span-4 grid grid-rows-4 gap-2">
//           {property.images && property.images.length > 0 ? (
//             property.images.map((img, index) => (
//               <img key={index} src={img || "/default-placeholder.jpg"} alt="Thumbnail" className="w-full h-24 object-cover rounded-lg" />
//             ))
//           ) : (
//             <p>No additional images available</p>
//           )}
//         </div>
//       </div>

//       {/* Property Info */}
//       <div className="mt-6 flex justify-between flex-wrap">
//         <div>
//           <h1 className="text-3xl font-bold">{property.title}</h1>
//           <p className="text-gray-500">{property.location}</p>
//           <p className="text-blue-600 text-2xl font-semibold mt-2">₹{property.price} / month</p>
//           <p className="text-gray-700 mt-2">{property.details}</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Button type="primary" icon={<PhoneOutlined />}>Call Agent</Button>
//           <Button icon={<MailOutlined />}>Send Inquiry</Button>
//           <Button icon={<EditOutlined />}>Write Review</Button>
//         </div>
//       </div>

//       {/* Features & Amenities */}
//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold">Features & Amenities</h2>
//         <div className="grid grid-cols-3 gap-4 mt-4 text-gray-700">
//           {property.amenities?.map((amenity, index) => (
//             <p key={index}>✅ {amenity}</p>
//           ))}
//         </div>
//       </div>

//       {/* About Property */}
//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold">About this property</h2>
//         <p className="text-gray-600 mt-2">{property.description}</p>
//       </div>

//       {/* Reviews */}
//       <div className="mt-6">
//         <h2 className="text-2xl font-semibold">Reviews</h2>
//         <div className="flex items-center mt-2">
//           <Rate disabled defaultValue={property.rating} allowHalf />
//           <span className="ml-2 text-gray-700">{property.rating} ({property.reviews?.length} reviews)</span>
//         </div>
//         <div className="mt-4 grid grid-cols-3 gap-4">
//           {property.reviews?.map((review, index) => (
//             <div key={index} className="p-4 border rounded-lg shadow-sm">
//               <h3 className="font-semibold">{review.name}</h3>
//               <Rate disabled defaultValue={review.rating} className="mt-1" />
//               <p className="text-gray-600 mt-2">{review.comment}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Agent Info */}
//       <div className="mt-6 p-4 border rounded-lg shadow-sm flex items-center justify-between">
//         <div>
//           <h3 className="font-semibold">{property.agentName}</h3>
//           <p className="text-gray-600">{property.agentTitle}</p>
//           <p className="mt-2 text-gray-600 flex items-center"><ClockCircleOutlined className="mr-2" /> {property.agentAvailability}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;
















import React, { useState } from "react";
import { Modal, Button, Rate } from "antd";
import { PhoneOutlined, SendOutlined, EditOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Reviews from "../Components/ReviewPage";


const PropertyDetails = () => {
  const location = useLocation();
  const {
    id,
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
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500">{propertyLocation}</p>
          <p className="text-blue-600 text-xl font-bold">₹{price} / month</p>

          <div className="mt-4 text-gray-700">
            <p>🛏️ {beds} beds &nbsp;&nbsp; 🚿 {baths} baths &nbsp;&nbsp; 📏 {sqft} sq ft</p>
          </div>

          <h2 className="mt-6 text-lg font-semibold">Features & Amenities</h2>
          <div className="grid grid-cols-2 gap-3 text-gray-600 mt-2">
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

          <h2 className="mt-6 text-lg font-semibold">About this property</h2>
          <p className="text-gray-600">
            This stunning apartment offers modern living at its finest. With breathtaking city views, premium amenities,
            and a prime location, it’s perfect for those seeking luxury and convenience.
          </p>

          {/* <h2 className="mt-6 text-lg font-semibold">Reviews</h2>
          <p className="text-lg font-bold flex items-center">
            <Rate allowHalf defaultValue={4.8} disabled className="mr-2" /> 4.8 (28 reviews)
          </p> */}

          {/* <div className="mt-4 space-y-4">
            
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-semibold">Sarah Johnson <span className="text-gray-500 text-sm">December 2023</span></p>
              <Rate defaultValue={5} disabled className="mt-1" />
              <p className="text-gray-600 mt-2">Amazing property with great amenities. Very responsive host!</p>
            </div>
            
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-semibold">Michael Chen <span className="text-gray-500 text-sm">November 2023</span></p>
              <Rate defaultValue={4.5} disabled className="mt-1" />
              <p className="text-gray-600 mt-2">Very clean and modern apartment. Great value for money!</p>
            </div>
          </div> */}
        </div>

        {/* Right Section - Agent Info */}
        <div className="p-6 bg-gray-100 rounded-lg">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="Agent"
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">Michael Anderson</p>
              <p className="text-gray-500 text-sm">Senior Property Consultant</p>
            </div>
          </div>

          <Button type="primary" icon={<PhoneOutlined />} className="w-full mt-4">
            Call Agent
          </Button>
          <Button icon={<SendOutlined />} className="w-full mt-2">
            Send Inquiry
          </Button>
          <Button type="link" icon={<EditOutlined />} className="w-full mt-2">
            Write Review
          </Button>

          <h2 className="mt-6 flex items-center text-lg font-semibold">
            <ClockCircleOutlined className="mr-2" /> Available Hours
          </h2>
          <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
          <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
        </div>

        

      </div>
      {/* Reviews Section */}
      <Reviews rating={rating} reviews={reviews} />
    </div>
  );
};

export default PropertyDetails;
