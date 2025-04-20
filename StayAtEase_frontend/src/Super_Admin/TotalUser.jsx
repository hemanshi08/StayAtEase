import React, { useEffect, useState } from "react";
import { DeleteOutlined, SearchOutlined, EditOutlined } from "@ant-design/icons";
import SuperAdminNavbar from "./Superadmin_navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TotalUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming you're storing token in localStorage
        const response = await axios.get("http://localhost:5000/api/users/admin/tenants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                <tr key={user.u_id} className="border-b">
                  <td className="p-4 flex items-center space-x-3">
                    <img src={user.profile_pic} alt="Profile" className="h-10 w-10 rounded-full border" />
                    <span className="font-semibold">{user.fullName}</span>
                  </td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.email}</td>
                  <td className={`p-4 font-semibold ${user.status === "active" ? "text-green-600" : "text-red-600"}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-x-4">
                      <button className="!text-blue-600 hover:text-blue-800 transition" onClick={() => navigate("/edit-user", { state: { user } })}>
                        <EditOutlined style={{ fontSize: "18px" }} />
                      </button>
                      <button className="!text-red-600 hover:text-red-800 transition">
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
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
          </p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              Previous
            </button>
            <span className="px-5 py-2 border rounded-lg bg-blue-500 text-white font-bold">{currentPage}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:bg-blue-100"
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
