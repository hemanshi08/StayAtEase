import React, { useEffect, useState } from "react";
import PropertyCard from "../Components/Property_card";
import axios from "axios";
import { message } from "antd";

const WishlistPage = () => {
  const [wishlistProperties, setWishlistProperties] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/wishlist", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const formatted = response.data.map((item) => {
          const property = item.property;
          return {
            id: property.p_id,
            title: property.title,
            location: property.address,
            price: property.price,
            rating: property.avgRating || 0,
            image: property.property_images?.[0],
            beds: property.no_of_beds,
            baths: property.no_of_bathrooms,
            sqft: property.sq_ft,
            reviews: property.Reviews.map((r, index) => ({
              name: `User ${index + 1}`,
              date: "N/A",
              rating: r.rating,
              comment: "",
              image: "", // Placeholder, or fetch actual user image if available
            })),
          };
        });

        setWishlistProperties(formatted);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        message.error("Failed to load wishlist.");
      }
    };

    fetchWishlist();
  }, []);

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
