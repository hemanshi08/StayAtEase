import React, { useEffect, useState } from "react";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import SuperAdminNavbar from "./Superadmin_navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TotalRoomOwner() {
  const [owners, setOwners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ownersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/admin/owners", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOwners(res.data);
    } catch (err) {
      console.error("Error fetching owners:", err);
    }
  };
const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this owner?")) {
    try {
      await axios.delete(`http://localhost:5000/api/users/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Refresh the list after deletion
      fetchOwners();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete the user.");
    }
  }
};

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOwners = owners.filter(
    (owner) =>
      owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastOwner = currentPage * ownersPerPage;
  const indexOfFirstOwner = indexOfLastOwner - ownersPerPage;
  const currentOwners = filteredOwners.slice(indexOfFirstOwner, indexOfLastOwner);
  const totalPages = Math.ceil(filteredOwners.length / ownersPerPage);

  return (
    <div>
      <SuperAdminNavbar />
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg mt-16 ">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Room Owners Details</h2>
          <div className="relative w-full sm:w-1/3 mt-3 sm:mt-0">
            <input
              type="text"
              placeholder="Search owners..."
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
              <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Property_Owner</th>
                <th className="p-4 text-left">Mobile No.</th>
                <th className="p-4 text-left">Email</th>
                {/* <th className="p-4 text-left">User Type</th>
                <th className="p-4 text-left">Status</th> */}
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOwners.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-600">
                    No owners found
                  </td>
                </tr>
              ) : (
                currentOwners.map((user) => (
                  <tr key={user.u_id} className="border-b">
                    <td className="p-4">{user.u_id}</td>
                    <td className="p-4 flex items-center space-x-3">
                      <img
                        src={user.profile_pic}
                        alt="Profile"
                        className="h-10 w-10 rounded-full border"
                      />
                      <span className="font-semibold">{user.fullName}</span>
                    </td>
                    <td className="p-4">{user.phone}</td>
                    <td className="p-4">{user.email}</td>
                    {/* <td className="p-4">{user.userType}</td>
                    <td
                      className={`p-4 font-semibold ${
                        user.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </td> */}
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-x-4">
                      <button
  className="!text-red-600 hover:text-red-800"
  onClick={() => handleDelete(user.u_id)}
>
  <DeleteOutlined style={{ fontSize: "18px" }} />
</button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center mt-6 text-gray-600">
          <p>
            Showing {indexOfFirstOwner + 1} to{" "}
            {Math.min(indexOfLastOwner, filteredOwners.length)} of{" "}
            {filteredOwners.length} owners
          </p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              Previous
            </button>
            <span className="px-5 py-2 border rounded-lg bg-blue-500 text-white font-bold">
              {currentPage}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100"
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

export default TotalRoomOwner;
