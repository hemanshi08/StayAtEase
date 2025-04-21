import React, { useEffect, useState } from "react";
import PropertyCard from "../Components/Property_card";
import axios from "axios";
import { message, Modal, Button } from "antd";
import LoginModal from "../Components/LoginPage";
import { useAuth } from "../context/AuthContext";

const WishlistPage = () => {
  const [wishlistProperties, setWishlistProperties] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setIsLoginModalOpen(true);
    }
  }, [isAuthenticated]);

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
          reviews: property.Reviews?.map((r, index) => ({
            name: `User ${index + 1}`,
            date: "N/A",
            rating: r.rating,
            comment: "",
            image: "",
          })) || [],
        };
      });

      setWishlistProperties(formatted);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      message.error("Failed to load wishlist.");
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    fetchWishlist();
  };

  if (!isAuthenticated) {
    return (
      <Modal
        title="Login Required"
        open={isLoginModalOpen}
        onCancel={() => setIsLoginModalOpen(false)}
        footer={null}
        centered
      >
        <div className="p-4 text-center">
          <p className="mb-4">You need to login to view your wishlist</p>
          <LoginModal 
            isModalOpen={true}
            handleCancel={() => setIsLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      </Modal>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold">My Wishlist</h2>
      <p className="text-gray-500 mb-8">Your saved properties</p>
      {wishlistProperties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Your wishlist is empty</p>
          <Button 
            type="primary" 
            className="mt-4"
            onClick={() => window.location.href = '/'}
          >
            Browse Properties
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mr-5 ml-5">
          {wishlistProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              {...property} 
              showDetailsButton 
              defaultLiked={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;