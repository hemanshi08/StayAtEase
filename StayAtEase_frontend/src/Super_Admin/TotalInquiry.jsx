import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutlined, SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, message as AntMessage } from "antd";
import SuperAdminNavbar from "./Superadmin_navbar";
import Footer from "../Components/Footer";

const { confirm } = Modal;

function TotalInquiry() {
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found!");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/inquiries/admin-inquiries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data.inquiries);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete inquiry with ID:", id);
  
    const confirmed = window.confirm("Are you sure you want to delete this inquiry?");
    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`http://localhost:5000/api/inquiries/admin-delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Delete response:", response.data);
        AntMessage.success("Inquiry deleted successfully");
        fetchMessages();
      } catch (error) {
        console.error("Error deleting inquiry:", error.response?.data || error.message);
        AntMessage.error("Failed to delete inquiry");
      }
    }
  };
  
  const filteredMessages = messages.filter(
    (message) =>
      message.User?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.Property?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  return (
    <div>
      <SuperAdminNavbar />

      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg mt-16 mb-10">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Property messages</h2>

          <div className="relative w-full sm:w-1/3 mt-3 sm:mt-0">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full h-9 p-2 pl-10 border rounded-lg text-gray-600"
            />
            <SearchOutlined className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-gray-600">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">Inquirier Name</th>
                <th className="p-4 text-left">Property Name</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Messages</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-600">
                    No results found
                  </td>
                </tr>
              ) : (
                currentMessages.map((message) => {
                  console.log("Message object:", message); // Debug
                  return (
                    <tr key={message.i_id} className="border-b">
                      <td className="p-4">{message.User?.fullName}</td>
                      <td className="p-4">{message.Property?.title}</td>
                      <td className="p-4">{new Date(message.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">{message.message}</td>
                      <td className="p-4 text-center">
                        <button
                          className="!text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(message.i_id)}
                        >
                          <DeleteOutlined />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center mt-6 text-gray-600">
          <p>
            Showing {indexOfFirstMessage + 1} to {Math.min(indexOfLastMessage, filteredMessages.length)} of{" "}
            {filteredMessages.length} messages
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
            <span className="px-5 py-2 border rounded-lg bg-blue-500 text-white font-bold">{currentPage}</span>
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

export default TotalInquiry;
