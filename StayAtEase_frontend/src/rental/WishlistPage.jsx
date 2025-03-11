import React from "react";
import PropertyCard from "../Components/Property_card";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


const WishlistPage = () => {
  const wishlistProperties = [
    {
        id: 1,
        title: "Modern Luxury Apartment",
        location: "Downtown, New York",
        price: "2,500",
        rating: 4,
        image: "../Properties_image/iflat4.jpg",
        beds:2,
        baths:2,
        sqft:25000
      },
      {
        id: 2,
        title: "Cozy Studio Apartment",
        location: "Los Angeles, CA",
        price: "1,800",
        rating: 4.5,
        image: "../Properties_image/flat5.jpg",
        beds:3,
        baths:2,
        sqft:45000
      },
      {
        id: 3,
        title: "Spacious Family Home",
        location: "Chicago, IL",
        price: "3,200",
        rating: 2,
        image: "../Properties_image/villa3.jpg",
        beds:2,
        baths:2,
        sqft:25000
      },
      {
        id: 4,
        title: "Spacious Family Home",
        location: "Chicago, IL",
        price: "3,200",
        rating: 3.5,
        image: "../Properties_image/iflat6.jpg",
        beds:2,
        baths:2,
        sqft:25000
      },
      {
        id: 5,
        title: "Spacious Family Home",
        location: "Chicago, IL",
        price: "3,200",
        rating: 2,
        image: "../Properties_image/i flat7.jpg",
        beds:2,
        baths:2,
        sqft:25000
      },
      {
        id: 6,
        title: "Cozy Studio Apartment",
        location: "Los Angeles, CA",
        price: "1,800",
        rating: 4.5,
        image: "../Properties_image/iflat1.jpg",
        beds:3,
        baths:2,
        sqft:45000
      },
  ];

  return (
    <div>
        <Navbar />
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold">My Wishlist</h2>
      <p className="text-gray-500 mb-8">Your saved properties</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mr-5 ml-5">
        {wishlistProperties.map((property) => (
          <PropertyCard key={property.id} {...property} showDetailsButton={true} />
        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default WishlistPage;
