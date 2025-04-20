import React, { useState, useEffect } from "react";
import { Card, Typography, Rate, message, Modal } from "antd";
import { HeartFilled, HeartOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import LoginModal from "../Components/LoginPage";

const { Title, Text } = Typography;

const PropertyCard = ({
  id,
  image,
  title,
  location,
  beds,
  baths,
  sqft,
  rating,
  price,
  reviews,
  showDetailsButton = false,
  defaultLiked = false
}) => {
  const [liked, setLiked] = useState(defaultLiked);
  const [loading, setLoading] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    setLiked(defaultLiked);
  }, [defaultLiked]);

  const handleViewDetails = () => {
    navigate(`/property/${id}`, {
      state: {
        id,
        image,
        title,
        location,
        beds,
        baths,
        sqft,
        rating,
        price,
        reviews
      }
    });
  };

  const toggleWishlist = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      setLoginModalVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/wishlist/toggle",
        { p_id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setLiked(response.data.status === "added");
      message.success(response.data.message);
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      message.error(err.response?.data?.error || "Failed to update wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setLoginModalVisible(false);
    message.success("Login successful! You can now add to wishlist");
  };

  return (
    <>
      <Card
        onClick={handleViewDetails}
        hoverable
        className="rounded-2xl shadow-lg overflow-hidden relative"
        cover={
          <div className="relative">
            <img alt={title} src={image} className="h-48 w-full object-cover" />
            <div
              onClick={toggleWishlist}
              className="absolute top-2 right-2 cursor-pointer bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-xl"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
              ) : liked ? (
                <HeartFilled className="text-red-500" />
              ) : (
                <HeartOutlined />
              )}
            </div>
          </div>
        }
      >
        <div className="flex justify-between items-center">
          <Title level={4} className="m-0">{title}</Title>
        </div>
        <Text type="secondary" className="flex items-center gap-1 text-gray-500">
          <EnvironmentOutlined /> {location}
        </Text>
        <div className="flex gap-4 mt-2">
          <Text><b>{beds}</b> beds</Text>
          <Text><b>{baths}</b> baths</Text>
          <Text><b>{sqft}</b> sqft</Text>
        </div>
        <Rate disabled allowHalf defaultValue={rating} className="mt-2" />
        <Text className="block mt-2 mb-3 text-lg font-bold text-blue-600">
          ₹{price} /month
        </Text>

        {showDetailsButton && (
          <button
            onClick={handleViewDetails}
            className="mt-2 w-full bg-blue-600 !text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            View Details
          </button>
        )}
      </Card>

      <LoginModal 
        isModalOpen={loginModalVisible}
        handleCancel={() => setLoginModalVisible(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default PropertyCard;