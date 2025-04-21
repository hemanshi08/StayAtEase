import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const LatestReviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reviews/admin-reviews", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.data && response.data.reviews) {
        setReviews(response.data.reviews.slice(0, 3)); // Show only 3 reviews
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-100 py-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Latest Reviews</h2>
        <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/TotalReviews")}
            >
              View All
            </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review.r_id} className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={review.User?.profile_pic || "https://via.placeholder.com/40"}
                alt={review.User?.fullName}
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <h3 className="font-semibold">{review.User?.fullName}</h3>
                <p className="text-gray-500 text-xs">{formatDate(review.date)}</p>
              </div>
            </div>

            <div className="flex text-yellow-400 mb-1">
              {"★".repeat(Math.floor(review.rating))}
              {"☆".repeat(5 - Math.floor(review.rating))}
            </div>

            <p className="text-gray-700 text-sm">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
