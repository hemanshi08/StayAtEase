import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Footer from "../Components/Footer";
import Header from "./component/header";
import ReportModal from "./component/ReportModal";

const PropertyReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const reviewsPerPage = 10;

  const reviews = [
    { id: 1, name: "John Smith", owner: "Alice Johnson", property: "Sunset Villa", date: "Feb 15, 2024", rating: 5, review: "Great property with excellent amenities.", img: "../public/profile_image/team-2.jpg" },
    { id: 2, name: "Emma Wilson", owner: "Bob Williams", property: "Ocean Breeze", date: "Feb 14, 2024", rating: 5, review: "Absolutely love living here!", img: "../public/profile_image/team-3.jpg" },
    { id: 3, name: "Michael Brown", owner: "Charlie Davis", property: "Mountain View", date: "Feb 13, 2024", rating: 4, review: "Good value for money.", img: "../public/profile_image/team-4.jpg" },
    { id: 4, name: "Sarah Davis", owner: "Daniel Thompson", property: "Greenwood Estate", date: "Feb 12, 2024", rating: 5, review: "Beautiful property with great views.", img: "../public/profile_image/testimonial-1.jpg" },
    { id: 5, name: "Robert Johnson", owner: "Emma White", property: "Lakeside Residency", date: "Feb 11, 2024", rating: 3, review: "Decent place to live.", img: "../public/profile_image/testimonial-2.jpg" },
    { id: 6, name: "Lisa Anderson", owner: "Frank Taylor", property: "Palm Grove", date: "Feb 10, 2024", rating: 5, review: "Exceptional property management!", img: "../public/profile_image/testimonial-3.jpg" },
    { id: 7, name: "David Wilson", owner: "Grace Martin", property: "Sunrise Heights", date: "Feb 9, 2024", rating: 5, review: "Great community events.", img: "../public/profile_image/testimonial-4.jpg" },
  ];

  const filteredReviews = reviews.filter((review) =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <p className="text-gray-500">Sunset Heights Apartments</p>

        {/* Search Bar */}
        <div className="relative w-full max-w-md my-4">
          <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Review Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4">Reviewer</th>
                <th className="p-4">Property Name</th>
                <th className="p-4">Property Owner</th>
                <th className="p-4">Date</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Review</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.length > 0 ? (
                currentReviews.map((review) => (
                  <tr key={review.id} className="even:bg-gray-50">
                    <td className="p-3 flex items-center">
                      <img
                        src={review.img || "https://via.placeholder.com/40"}
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span className="font-medium">{review.name}</span>
                    </td>
                    <td className="p-3">{review.property}</td>
                    <td className="p-3">{review.owner}</td>
                    <td className="p-3">{review.date}</td>
                    <td className="p-3">
  {Array.from({ length: review.rating }, (_, i) => (
    <span key={i} className="text-yellow-500">⭐</span>
  ))}
</td>

                    <td className="p-3">{review.review}</td>
                    <td className="p-3 text-center">
                      
                    </td>
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
