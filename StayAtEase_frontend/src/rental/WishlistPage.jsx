import React from "react";
import PropertyCard from "../Components/Property_card";



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
      sqft:25000,
      reviews: [
        { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!",image: "../profile_image/team-1.jpg" },
        { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." ,image:"../profile_image/team-2.jpg"},
      ],
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
      sqft:45000,
      reviews: [
        { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" , image: "../profile_image/team-1.jpg" },
        { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." ,image: "../profile_image/team-2.jpg"},
      ],
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
      sqft:25000 ,
      reviews: [
        { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" ,image: "../profile_image/team-1.jpg" },
        { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience.",image: "../profile_image/team-2.jpg" },
      ],
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
      sqft:25000,
      reviews: [
        { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" , image: "../profile_image/team-1.jpg"},
        { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience.",image: "../profile_image/team-2.jpg" },
      ],
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
      sqft:25000,
      reviews: [
        { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!",image: "../profile_image/team-1.jpg" },
        { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience." ,image: "../profile_image/team-2.jpg"},
      ],
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
      sqft:45000,
      reviews: [
        { name: "John Doe", date: "Feb 25, 2024", rating: 4.5, comment: "Amazing place to stay!" ,image: "../profile_image/team-1.jpg"},
        { name: "Jane Smith", date: "Mar 1, 2024", rating: 4.8, comment: "Loved the experience.",image: "../profile_image/team-2.jpg" },
      ],
    },
  ];

  return (
    
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold">My Wishlist</h2>
      <p className="text-gray-500 mb-8">Your saved properties</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mr-5 ml-5">
      {wishlistProperties.map((property) => (
          <PropertyCard key={property.id} {...property} showDetailsButton defaultLiked={true} />
        ))}
      </div>
    </div>
    
  );
};

export default WishlistPage;
