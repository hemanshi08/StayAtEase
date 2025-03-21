import React, { useState } from "react";
import { DeleteOutlined} from "@ant-design/icons";


function LatestMessages() {
  const [messages] = useState([
    { id: 1, guestName: "Sarah Johnson", propertyTitle: "Ocean View Apartment", ownerName: "John Doe", email: "sarahjohnson@gmail.com", contactNo: "1236547890", message: "Are there any restrictions on lease agreements?" },
    { id: 2, guestName: "Michael Brown", propertyTitle: "Downtown Loft", ownerName: "Emily Smith", email: "michaelbrown@gmail.com", contactNo: "9874563210", message: "Are there any restrictions on lease agreements?" },
    { id: 3, guestName: "Emma Davis", propertyTitle: "Lakeview Condo", ownerName: "Robert Wilson", email: "emmadavis@gmail.com", contactNo: "7410258963", message: "What documents are required for booking?" },
  ]);

  return (
  
    <div className="bg-white shadow-md rounded-lg p-5 w-full mb-6">
        {/* Title and View All */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg !font-bold">Latest Messages</h2>
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
              {messages.map((message) => (
                <tr key={message.id} className="border-b">
                  <td className="p-4 font-semibold">{message.guestName}</td>
                  <td className="p-4">{message.propertyTitle}</td>
                  <td className="p-4">{message.ownerName}</td>
                  <td className="p-4">{message.email}</td>
                  <td className="p-4">{message.contactNo}</td>
                  <td className="p-4">{message.message}</td>
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
      </div>

     
  );
}

export default LatestMessages;
