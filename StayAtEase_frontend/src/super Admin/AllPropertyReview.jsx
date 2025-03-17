import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import Header from "./component/header";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const AllpropertyReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const reviews = [
    { id: 1, name: "John Smith", date: "Feb 15, 2024", rating: "⭐⭐⭐⭐⭐", review: "Great property with excellent amenities. The location is perfect for both work and leisure.", image: "../profile.png" },
    { id: 2, name: "Emma Wilson", date: "Feb 14, 2024", rating: "⭐⭐⭐⭐⭐", review: "Absolutely love living here! The community is wonderful and well-maintained.", image: "../profile.png" },
    { id: 3, name: "Michael Brown", date: "Feb 13, 2024", rating: "⭐⭐⭐⭐☆", review: "Good value for money. The apartments are spacious and modern. Could improve on parking.", image: "../profile.png" },
    { id: 4, name: "Sarah Davis", date: "Feb 12, 2024", rating: "⭐⭐⭐⭐⭐", review: "Beautiful property with great views. The security system makes me feel safe.", image: "../profile.png" },
    { id: 5, name: "John Smith", date: "Feb 15, 2024", rating: "⭐⭐⭐⭐⭐", review: "Great property with excellent amenities. The location is perfect for both work and leisure.", image: "../profile.png" },
    { id: 6, name: "Emma Wilson", date: "Feb 14, 2024", rating: "⭐⭐⭐⭐⭐", review: "Absolutely love living here! The community is wonderful and well-maintained.", image: "../profile.png" },
    { id: 7, name: "Michael Brown", date: "Feb 13, 2024", rating: "⭐⭐⭐⭐☆", review: "Good value for money. The apartments are spacious and modern. Could improve on parking.", image: "../profile.png" },
    { id: 8, name: "Sarah Davis", date: "Feb 12, 2024", rating: "⭐⭐⭐⭐⭐", review: "Beautiful property with great views. The security system makes me feel safe.", image: "../profile.png" },
    { id: 9, name: "John Smith", date: "Feb 15, 2024", rating: "⭐⭐⭐⭐⭐", review: "Great property with excellent amenities. The location is perfect for both work and leisure.", image: "../profile.png" },
    { id: 10, name: "Emma Wilson", date: "Feb 14, 2024", rating: "⭐⭐⭐⭐⭐", review: "Absolutely love living here! The community is wonderful and well-maintained.", image: "../profile.png" },
    { id: 11, name: "Michael Brown", date: "Feb 13, 2024", rating: "⭐⭐⭐⭐☆", review: "Good value for money. The apartments are spacious and modern. Could improve on parking.", image: "../profile.png" },
    { id: 12, name: "Sarah Davis", date: "Feb 12, 2024", rating: "⭐⭐⭐⭐⭐", review: "Beautiful property with great views. The security system makes me feel safe.", image: "../profile.png" },
  
  
  ];

  // Filter reviews based on search input
  const filteredReviews = reviews.filter((review) =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="container mt-4">
        {/* Title */}
        <h2 className="fw-bold">Property Reviews</h2>
        <p className="text-muted">Sunset Heights Apartments</p>

 
        <div className="position-relative mb-3">
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon position-absolute ms-3"
            style={{ top: "50%", transform: "translateY(-50%)", color: "#6c757d" }}
          />
          <input
            type="text"
            className="form-control search-input ps-5 rounded-pill w-100"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

       
        <div className="table-responsive">
          <table className="table review-table bg-white rounded shadow">
            <thead>
              <tr>
                <th>Reviewer</th>
                <th>Date</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <tr key={review.id}>
                    <td>
                      {/* Profile Picture and Name in One Row */}
                      <div className="d-flex align-items-center">
                        <img 
                          src={review.image || "https://via.placeholder.com/40"} 
                          className="rounded-circle me-2" 
                          alt="Reviewer" 
                          width="40" 
                          height="40" 
                        />
                        <span className="fw-semibold">{review.name}</span>
                      </div>
                    </td>
                    <td>{review.date}</td>
                    <td>{review.rating}</td>
                    <td>{review.review}</td>
                    <td>
  <FontAwesomeIcon icon={faTrash} className="text-danger " style={{ cursor: "pointer" }} />
</td>


                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <p className="text-muted">Showing 1 to {filteredReviews.length} of {reviews.length} reviews</p>
          <nav>
            <ul className="pagination">
              <li className="page-item disabled"><a className="page-link">Previous</a></li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllpropertyReviews;
