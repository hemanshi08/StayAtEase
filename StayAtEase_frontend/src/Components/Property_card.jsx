import { HeartOutlined, StarFilled, EnvironmentOutlined } from "@ant-design/icons";

export default function PropertyCard({ image, title, location, price, rating }) {
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden border p-4 sm:p-6">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer">
          <HeartOutlined className="text-xl text-gray-600" />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm mt-1">
          <EnvironmentOutlined className="mr-1" />
          <span>{location}</span>
        </div>
      </div>
      
      {/* Price & Rating */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-bold text-blue-600">{price}</span>
        <div className="flex items-center text-sm text-gray-600">
          <StarFilled className="text-yellow-500 mr-1" />
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
}


// import React from "react";
// import PropertyCard from "../components/PropertyCard";
// import apartmentImg1 from "../assets/Properties_image/flat1.jpg";
// import apartmentImg2 from "../assets/Properties_image/flat2.jpg";
// import apartmentImg3 from "../assets/Properties_image/flat3.jpg";

// export default function Home() {
//   // Property data array
//   const properties = [
//     {
//       image: apartmentImg1,
//       title: "Modern Luxury Apartment",
//       location: "Downtown, New York",
//       price: "$2,500/month",
//       rating: "4.8",
//     },
//     {
//       image: apartmentImg2,
//       title: "Cozy Studio Apartment",
//       location: "Brooklyn, NY",
//       price: "$1,800/month",
//       rating: "4.5",
//     },
//     {
//       image: apartmentImg3,
//       title: "Spacious Family Home",
//       location: "Los Angeles, CA",
//       price: "$3,200/month",
//       rating: "4.9",
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Properties</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {properties.map((property, index) => (
//           <PropertyCard key={index} {...property} />
//         ))}
//       </div>
//     </div>
//   );
// }