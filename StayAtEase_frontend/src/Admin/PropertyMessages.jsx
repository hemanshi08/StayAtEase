import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import Header from "./component/header";
import { SearchOutlined } from "@ant-design/icons";

const PropertyMessages = () => {
  const [messagesData, setMessagesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 3;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/inquiries/owner-inquiries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched inquiries:", response.data.inquiries);
        setMessagesData(response.data.inquiries);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchMessages();
  }, []);

  const filteredMessages = messagesData.filter((msg) => {
    const fullName = msg.User?.fullName?.toLowerCase() || "";
    const propertyId = msg.Property?.p_id?.toString().toLowerCase() || "";
    return fullName.includes(searchTerm.toLowerCase()) || propertyId.includes(searchTerm.toLowerCase());
  });
  

  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-6 p-6 px-10 py-25">
        <h3 className="!font-bold text-xl my-4 py-2">All Property Messages</h3>

        {/* Search Bar */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"> <SearchOutlined /> </span>
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-200 transition duration-200 w-full"
    placeholder="Search by Guest Name or Property ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Guest Name</th>
                <th className="p-3">Property Id</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Contact No</th>
                <th className="p-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {currentMessages.length > 0 ? (
                currentMessages.map((msg, index) => (
                  <tr key={index} className="even:bg-gray-50 hover:bg-gray-50">
                    <td className="p-3">{msg.User?.fullName || "N/A"}</td>
                    <td className="p-3">P - {msg.Property?.p_id || "N/A"}</td>
                    <td className="p-3">{msg.User?.email || "N/A"}</td>
                    <td className="p-3">{msg.User?.phone || "N/A"}</td>
                    <td className="p-3">{msg.message || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 p-4">No messages found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 pb-6">
          <p className="text-gray-500 text-sm">
            Showing {indexOfFirstMessage + 1} to {Math.min(indexOfLastMessage, filteredMessages.length)} of {filteredMessages.length} messages
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

export default PropertyMessages;
