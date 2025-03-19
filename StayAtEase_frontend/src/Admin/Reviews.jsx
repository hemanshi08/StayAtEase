import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import Header from "./component/header";

const PropertyReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  const reviews = [
    { id: 1, name: "John Smith", date: "Feb 15, 2024", rating: "⭐⭐⭐⭐⭐", review: "Great property with excellent amenities.", image: "../profile.png" },
    { id: 2, name: "Emma Wilson", date: "Feb 14, 2024", rating: "⭐⭐⭐⭐⭐", review: "Absolutely love living here!", image: "../profile.png" },
    { id: 3, name: "Michael Brown", date: "Feb 13, 2024", rating: "⭐⭐⭐⭐☆", review: "Good value for money.", image: "../profile.png" },
    { id: 4, name: "Sarah Davis", date: "Feb 12, 2024", rating: "⭐⭐⭐⭐⭐", review: "Beautiful property.", image: "../profile.png" },
    { id: 5, name: "David Lee", date: "Feb 11, 2024", rating: "⭐⭐⭐⭐☆", review: "Spacious and modern.", image: "../profile.png" },
    { id: 6, name: "Sophia Miller", date: "Feb 10, 2024", rating: "⭐⭐⭐⭐⭐", review: "Love the neighborhood!", image: "../profile.png" },

  ];

  // Filter reviews based on search term
  const filteredReviews = reviews.filter((review) =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages for filtered reviews
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Get reviews for the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div >
      <Header />
      <div className="container mx-auto p- 6 px-7 mt-6">
        <h2 className="text-2xl font-bold text-gray-800">Property Reviews</h2>
        <p className="text-gray-500">Sunset Heights Apartments</p>

        {/* Search Bar */}
        <div className="relative w-full max-w-md my-4">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            className="border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 on new search
            }}
          />
        </div>

        {/* Review Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Reviewer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Review</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.length > 0 ? (
                currentReviews.map((review) => (
                  <tr key={review.id} className="even:bg-gray-50">
                    <td className="p-3 flex items-center">
                      <img
                        src={review.image || "https://via.placeholder.com/40"}
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span className="font-medium">{review.name}</span>
                    </td>
                    <td className="p-3">{review.date}</td>
                    <td className="p-3">{review.rating}</td>
                    <td className="p-3">{review.review}</td>
                    <td className="p-3">
                    <button className="text-red-500 font-semibold hover:text-red-600 hover:underline !important">
  🚨 Report
</button>



                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 p-3">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
      </div>
      <Footer />
    </div>
  );
};

export default PropertyReviews;
