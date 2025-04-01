import React, { useState } from "react";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import SuperAdminNavbar from "./Superadmin_navbar";
import Footer from "../Components/Footer";

function TotalReviews() {
  const reviews = [
    { id: 1, name: "John Smith", owner: "Alice Johnson", property: "Sunset Villa", date: "Feb 15, 2024", rating: 5, review: "Great property with excellent amenities.", img: "../public/profile_image/team-2.jpg" },
    { id: 2, name: "Emma Wilson", owner: "Bob Williams", property: "Ocean Breeze", date: "Feb 14, 2024", rating: 5, review: "Absolutely love living here!", img: "../public/profile_image/team-3.jpg" },
    { id: 3, name: "Michael Brown", owner: "Charlie Davis", property: "Mountain View", date: "Feb 13, 2024", rating: 4, review: "Good value for money.", img: "../public/profile_image/team-4.jpg" },
    { id: 4, name: "Sarah Davis", owner: "Daniel Thompson", property: "Greenwood Estate", date: "Feb 12, 2024", rating: 5, review: "Beautiful property with great views.", img: "../public/profile_image/testimonial-1.jpg" },
    { id: 5, name: "Robert Johnson", owner: "Emma White", property: "Lakeside Residency", date: "Feb 11, 2024", rating: 3, review: "Decent place to live.", img: "../public/profile_image/testimonial-2.jpg" },
    { id: 6, name: "Lisa Anderson", owner: "Frank Taylor", property: "Palm Grove", date: "Feb 10, 2024", rating: 5, review: "Exceptional property management!", img: "../public/profile_image/testimonial-3.jpg" },
    { id: 7, name: "David Wilson", owner: "Grace Martin", property: "Sunrise Heights", date: "Feb 9, 2024", rating: 5, review: "Great community events.", img: "../public/profile_image/testimonial-4.jpg" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div>
      <SuperAdminNavbar />

      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg mt-16 mb-10">
        {/* Title and Search Bar */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-3xl !font-bold">Property Reviews</h2>

          {/* Search Bar */}
          <div className="relative w-full sm:w-1/3 mt-3 sm:mt-0">
            <input
              type="text"
              placeholder="Search reviews..."
              className="w-full h-9 p-2 pl-10 border rounded-lg text-gray-600"
            />
            <SearchOutlined className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        </div>

        {/* Reviews Table */}
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
                <tr key={review.id} className="border-b">
                  <td className="p-4 flex items-center space-x-3">
                    <img src={review.img} alt="Profile" className="h-10 w-10 rounded-full border" />
                    <span className="font-semibold">{review.name}</span>
                  </td>
                  <td className="p-4">{review.property}</td>
                  <td className="p-4">{review.owner}</td>
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
            Showing {indexOfFirstReview + 1} to {Math.min(indexOfLastReview, reviews.length)} of {reviews.length} reviews
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
            <span className="w-1"></span>
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
