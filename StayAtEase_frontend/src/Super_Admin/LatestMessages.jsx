import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";

function LatestMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inquiries/admin-inquiries", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // assuming you store JWT in localStorage
        }
      });

      if (response.data && response.data.inquiries) {
        setMessages(response.data.inquiries);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full mb-6">
      {/* Title and View All */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Latest Messages</h2>
        <a href="#" className="text-blue-500 text-sm font-semibold hover:underline">
          View All →
        </a>
      </div>

      {/* Messages Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-gray-600">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Guest Name</th>
              <th className="p-4 text-left">Property Title</th>
              <th className="p-4 text-left">Owner Name</th>
              <th className="p-4 text-left">Email Address</th>
              <th className="p-4 text-left">Contact No</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.i_id} className="border-b">
                <td className="p-4 font-semibold">{msg.User?.fullName}</td>
                <td className="p-4">{msg.Property?.title}</td>
                <td className="p-4">--</td> {/* Owner name not available from inquiry join */}
                <td className="p-4">{msg.User?.email}</td>
                <td className="p-4">{msg.User?.phone}</td>
                <td className="p-4">{msg.message}</td>
                <td className="p-4 text-center">
                  <button className="text-red-600 cursor-pointer hover:text-red-800 transition">
                    <DeleteOutlined style={{ fontSize: "18px" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LatestMessages;
