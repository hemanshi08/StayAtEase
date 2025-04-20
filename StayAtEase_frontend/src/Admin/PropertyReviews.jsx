import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import Footer from "../Components/Footer";
import Header from "./component/header";
import ReportModal from "./component/ReportModal";

const PropertyReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const reviewsPerPage = 10;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/reviews/owner-reviews", {
          headers: {
            Authorization: `Bearer ${token}`, // must include "Bearer "
          },
        });
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter((review) =>
    review.User?.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6 mt-6 px-10 py-25">
        <h2 className="text-2xl font-bold text-gray-800">Property Reviews</h2>
        <p className="text-gray-500">Your Properties</p>

        {/* Search Bar */}
        <div className="relative w-full max-w-md my-4">
          <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-200 transition duration-200 w-full"
            placeholder="Search reviews by reviewer name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Review Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-gray-500">Loading reviews...</p>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4">Reviewer</th>
                  <th className="p-4">Property Name</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Review</th>
                 
                </tr>
              </thead>
              <tbody>
                {currentReviews.length > 0 ? (
                  currentReviews.map((review) => (
                    <tr key={review.r_id} className="even:bg-gray-50">
                      <td className="p-3 flex items-center">
                        <img
                          src={review.User?.profile_pic || "https://via.placeholder.com/40"}
                          alt="Reviewer"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <span className="font-medium">{review.User?.fullName}</span>
                      </td>
                      <td className="p-3">{review.Property?.title}</td>
                      <td className="p-3">{review.Property?.address}</td>
                      <td className="p-3">{new Date(review.date).toLocaleDateString()}</td>
                      <td className="p-3">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <span key={i} className="text-yellow-500">⭐</span>
                        ))}
                      </td>
                      <td className="p-3">{review.review}</td>
                     
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-500 p-3">
                      No reviews found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && filteredReviews.length > 0 && (
          <div className="flex justify-between items-center mt-6 pb-6">
            <p className="text-gray-500 text-sm">
              Showing {indexOfFirstReview + 1} to {Math.min(indexOfLastReview, filteredReviews.length)} of {filteredReviews.length} reviews
            </p>
            <nav className="flex space-x-2">
              <button
                className="px-4 py-2 text-gray-500 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600">
                {currentPage}
              </button>
              <button
                className="px-4 py-2 text-gray-500 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-lg"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => setIsModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default PropertyReviews;
