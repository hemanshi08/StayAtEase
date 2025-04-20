import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import SuperAdminNavbar from "./Superadmin_navbar";
import Footer from "../Components/Footer";

function TotalReviews() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          console.error("No token found!");
          return;
        }
  
        const response = await axios.get("http://localhost:5000/api/reviews/admin-reviews", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
  
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
  
    fetchReviews();
  }, []);
  
  
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div>
      <SuperAdminNavbar />

      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg mt-16 mb-10">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-3xl !font-bold">Property Reviews</h2>

          <div className="relative w-full sm:w-1/3 mt-3 sm:mt-0">
            <input
              type="text"
              placeholder="Search reviews..."
              className="w-full h-9 p-2 pl-10 border rounded-lg text-gray-600"
            />
            <SearchOutlined className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-gray-600">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Reviewer</th>
                <th className="p-4 text-left">Property Name</th>
                <th className="p-4 text-left">Property Owner</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Rating</th>
                <th className="p-4 text-left">Review</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review) => (
                <tr key={review.r_id} className="border-b">
                  <td className="p-4 flex items-center space-x-3">
                    <img
                      src={review.User?.profile_pic || "/default-user.png"}
                      alt="Profile"
                      className="h-10 w-10 rounded-full border"
                    />
                    <span className="font-semibold">{review.User?.fullName}</span>
                  </td>
                  <td className="p-4">{review.Property?.title}</td>
                  <td className="p-4">{review.Property?.address}</td>
                  <td className="p-4">{review.date}</td>
                  <td className="p-4 flex space-x-1 text-yellow-500">
                    {"★".repeat(review.rating).padEnd(5, "☆")}
                  </td>
                  <td className="p-4">{review.review}</td>
                  <td className="p-4 text-center">
                    <button className="!text-red-600 cursor-pointer hover:text-red-800 transition">
                      <DeleteOutlined style={{ fontSize: "18px" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center mt-6 text-gray-600">
          <p>
            Showing {indexOfFirstReview + 1} to{" "}
            {Math.min(indexOfLastReview, reviews.length)} of {reviews.length} reviews
          </p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg transition-all ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100 cursor-pointer"
              }`}
            >
              Previous
            </button>
            <span className="px-5 py-2 border rounded-lg bg-blue-500 text-white font-bold">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg transition-all ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100 cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TotalReviews;
