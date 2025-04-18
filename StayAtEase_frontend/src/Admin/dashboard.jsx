import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "./component/header";
import { HomeOutlined, UnorderedListOutlined, MailOutlined, StarOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RoomOwnerDashboard = () => {
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
    const navigate = useNavigate();
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="bg-gray-100 min-h-screen px-10 py-30 w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                    {[{ icon: <HomeOutlined className="!text-blue-500 text-3xl" />, label: "Total Properties", value: data.totalProperties },
                        { icon: <UnorderedListOutlined className="!text-green-500 text-3xl" />, label: "Active Listings", value: data.activeListings },
                        { icon: <MailOutlined className="!text-orange-500 text-3xl" />, label: "Total Inquiries", value: data.totalInquiries },
                        { icon: <StarOutlined className="!text-yellow-500 text-3xl" />, label: "Review Rating", value: data.reviewRating }].map((card, index) => (
                        <div key={index} className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-center">
                            {card.icon}
                            <h3 className="text-xl !font-bold mt-2">{card.value}</h3>
                            <p className="!text-gray-600">{card.label}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-white shadow-lg p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-bold">Latest Messages</h4>
                        <a href="#" className="text-blue-500">View All</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="p-3">Guest Name</th>
                                    <th className="p-3">Property Id</th>
                                    <th className="p-3">Email Address</th>
                                    <th className="p-3">Contact No</th>
                                    <th className="p-3">Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.messages.map((msg, index) => (
                                    <tr key={index} className="even:bg-gray-50">
                                        <td className="p-3">{msg.name}</td>
                                        <td className="p-3">{msg.propertyId}</td>
                                        <td className="p-3">{msg.email}</td>
                                        <td className="p-3">{msg.contact}</td>
                                        <td className="p-3">{msg.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-bold">Latest Reviews</h4>
                        <a href="#" className="text-blue-500">View All</a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {data.reviews.map((review, index) => (
                            <div key={index} className="bg-white p-4 shadow-lg rounded-lg">
                                <div className="flex items-center mb-2">
                                    <img src={review.img} alt="Profile" className="w-12 h-12 rounded-full mr-3" />
                                    <div>
                                        <p className="font-bold">{review.name}</p>
                                        <small className="text-gray-500">{review.date}</small>
                                    </div>
                                </div>
                                <p>{'⭐'.repeat(review.rating)}</p>
                                <p className="text-gray-700 mt-2">{review.text}</p>
                                <p className="text-sm text-gray-500">{review.property}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="flex justify-center text-white mt-8">
                    <button className="bg-[#1A237E] text-white px-6 py-3 rounded-lg shadow-md font-semibold flex items-center gap-2"
                      onClick={() => navigate("/PropertyForm")}>
                        <PlusSquareOutlined /> Add New Property
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RoomOwnerDashboard;
