import React, { useState } from "react";
import Footer from "../Components/Footer";
import Header from "./component/header";

const PropertyMessages = () => {
  const messagesData = [
    { id: 1, name: "Sarah Johnson", propertyId: "P.307", email: "sarahjohnson@gmail.com", contact: "1236547890", message: "Are there any restrictions on lease agreements?" },
    { id: 2, name: "Michael Brown", propertyId: "P.309", email: "michaelbrown@gmail.com", contact: "9874563210", message: "Are there any restrictions on lease agreements?" },
    { id: 3, name: "Emma Davis", propertyId: "P.310", email: "emmadavis@gmail.com", contact: "7410258963", message: "What documents are required for booking?" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 2;
  
  const filteredMessages = messagesData.filter((msg) =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-6 p-6">
        <h3 className="font-bold text-xl my-4 py-2">All Property Messages</h3>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            className="w-full border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Search messages..."
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
                currentMessages.map((msg) => (
                  <tr key={msg.id} className="even:bg-gray-50 hover:bg-gray-50">
                    <td className="p-3">{msg.name}</td>
                    <td className="p-3">{msg.propertyId}</td>
                    <td className="p-3">{msg.email}</td>
                    <td className="p-3">{msg.contact}</td>
                    <td className="p-3">{msg.message}</td>
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
