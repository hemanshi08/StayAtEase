import React, { useState } from "react";
import { DeleteOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import SuperAdminNavbar from "./Superadmin_navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function TotalUser() {
  const users = [
    { id: 1, name: "John Smith", mobile: "9876543210", email: "john@example.com", status: "Active", img: "/profile_image/team-2.jpg" },
    { id: 2, name: "Emma Wilson", mobile: "9876543222", email: "emma@example.com", status: "Inactive", img: "/profile_image/team-3.jpg" },
    { id: 3, name: "Michael Brown", mobile: "9876543233", email: "michael@example.com", status: "Active", img: "/profile_image/team-4.jpg" },
    { id: 4, name: "Sarah Davis", mobile: "9876543244", email: "sarah@example.com", status: "Active", img: "/profile_image/testimonial-1.jpg" },
    { id: 5, name: "Robert Johnson", mobile: "9876543255", email: "robert@example.com", status: "Inactive", img: "/profile_image/testimonial-2.jpg" },
    { id: 6, name: "Sarah Davis", mobile: "9876543244", email: "sarah@example.com", status: "Active", img: "/profile_image/testimonial-1.jpg" },
    { id: 7, name: "Robert Johnson", mobile: "9876543255", email: "robert@example.com", status: "Inactive", img: "/profile_image/testimonial-2.jpg" },

  ];

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  const navigate = useNavigate();
  return (
    <div>
      <SuperAdminNavbar />
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg mt-16 mb-10">
      <div className="flex flex-wrap justify-between items-center mb-6">
      <h2 className="text-3xl !font-bold">User Details</h2>
          
          <div className="relative w-full sm:w-1/3 mt-3 sm:mt-0">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full h-9 p-2 pl-10 border rounded-lg text-gray-600"
            />
            <SearchOutlined className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-gray-600">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Mobile No.</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-4 flex items-center space-x-3">
                    <img src={user.img} alt="Profile" className="h-10 w-10 rounded-full border" />
                    <span className="font-semibold">{user.name}</span>
                  </td>
                  <td className="p-4">{user.mobile}</td>
                  <td className="p-4">{user.email}</td>
                  <td className={`p-4 font-semibold ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {user.status}
                  </td>
                  <td className="p-4 text-center">
  <div className="flex justify-center gap-x-4">
    <button className="!text-blue-600 cursor-pointer hover:text-blue-800 transition"  onClick={() => navigate("/edit-user", { state: { user } })}>
      <EditOutlined style={{ fontSize: "18px" }} />
    </button>
    <button className="!text-red-600 cursor-pointer hover:text-red-800 transition">
      <DeleteOutlined style={{ fontSize: "18px" }} />
    </button>
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap justify-between items-center mt-6 text-gray-600">
          <p>
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length} users
          </p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg transition-all ${
                currentPage === 1 ? "text-gray-400 border-gray-300 cursor-not-allowed" : "text-blue-600 hover:bg-blue-100 cursor-pointer"
              }`}
            >
              Previous
            </button>
            <span className="w-1"></span>

            <span className="px-5 py-2 border rounded-lg bg-blue-500 text-white font-bold">{currentPage}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg transition-all ${
                currentPage === totalPages ? "text-gray-400 border-gray-300 cursor-not-allowed" : "text-blue-600 hover:bg-blue-100 cursor-pointer"
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

export default TotalUser;
