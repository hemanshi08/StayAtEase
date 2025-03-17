import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Header from "./component/header";

const Dashboard = () => {
    const [data, setData] = useState({
        totalProperties: 0,
        activeListings: 0,
        totalInquiries: 0,
        reviewRating: 0,
        messages: [],
        reviews: []
    });

    useEffect(() => {
        setData({
            totalProperties: 24,
            activeListings: 18,
            totalInquiries: 156,
            reviewRating: 4.8,
            messages: [
                { name: "Sarah Johnson", propertyId: "P.101", email: "sarahjohnson@gmail.com", contact: "1234567890", message: "Are there any restrictions in lease agreements?" },
                { name: "Michael Brown", propertyId: "P.102", email: "michaelbrown@gmail.com", contact: "9876543210", message: "Are there any restrictions on lease agreements?" },
                { name: "Emma Davis", propertyId: "P.103", email: "emmadavis@gmail.com", contact: "7410258963", message: "What documents are required for booking?" }
            ],
            reviews: [
                { name: "John Smith", date: "Feb 12, 2024", rating: 5, text: "Amazing property with stunning views. Highly recommended!", property: "Lakefront Cottage", img: "../profile.png" },
                { name: "Lisa Anderson", date: "Feb 8, 2024", rating: 5, text: "Great location and comfortable stay. Would visit again.", property: "Downtown Loft", img: "../profile.png" },
                { name: "David Wilson", date: "Feb 7, 2024", rating: 5, text: "Perfect getaway spot. Everything was exactly as described.", property: "Mountain View Cabin", img: "../profile.png" }
            ]
        });
    }, []);

    return (
        <div>
            <Header/>
        <div className="container mt-4">
      
      
    <div className="row text-center">
        {[
            { icon: "fa-building", label: "Total Properties", value: data.totalProperties, color: "text-primary" },
            { icon: "fa-list", label: "Active Listings", value: data.activeListings, color: "text-primary" },
            { icon: "fa-envelope", label: "Total Inquiries", value: data.totalInquiries, color: "text-warning" },
            { icon: "fa-star", label: "Review Rating", value: data.reviewRating, color: "text-warning" }
        ].map((card, index) => (
            <div key={index} className="col-md-3">
                <div className="card p-3 shadow-lg text-center">
                    <i className={`fas ${card.icon} ${card.color} card-icon`} style={{ fontSize: "30px" }}></i>
                    <h3>{card.value}</h3>
                    <p>{card.label}</p>
                </div>
            </div>
        ))}
    </div>



    <div className="container mt-5">
    <div className="card shadow-lg">
    <div className="card-header d-flex justify-content-between align-items-center">
            <span className="fw-bold fs-4">Latest Messages</span>  {/* Bold + Larger Font */}
            <div className=" text-decoration-none"><a href="#">View All</a></div>
        </div>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="fw-normal">Guest Name</th>
                                    <th className="fw-normal">Property Id</th>
                                    <th className="fw-normal">Email Address</th>
                                    <th className="fw-normal">Contact No</th>
                                    <th className="fw-normal">Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.messages.map((msg, index) => (
                                    <tr key={index}>
                                        <td>{msg.name}</td>
                                        <td>{msg.propertyId}</td>
                                        <td>{msg.email}</td>
                                        <td>{msg.contact}</td>
                                        <td>{msg.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
        <h5 className="fw-bold fs-4">Latest Reviews</h5>  {/* Bold + Larger Font */}
        <div className="text-decoration-none"><a href="#">View All</a></div>
    </div>
                <div className="row">
                    {data.reviews.map((review, index) => (
                        <div key={index} className="col-md-4 d-flex">
                        <div className="review-card card p-3 shadow-lg">
                    
                                <div className="review-header d-flex align-items-center">
                                    <img src={review.img} alt="Profile Pic" className="rounded-circle me-3" width="50" height="50" />
                                    <div>
                                        <p><strong>{review.name}</strong></p>
                                        <small>{review.date}</small>
                                    </div>
                                </div>
                                <p>{'⭐'.repeat(review.rating)}</p>
                                <p>{review.text}</p>
                                <p><small>{review.property}</small></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-primary">Add New Property</button>
            </div>
            <br />
        </div>
        <Footer/>
        </div>
    );
};

export default Dashboard;