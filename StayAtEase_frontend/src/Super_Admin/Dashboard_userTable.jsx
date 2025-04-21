import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function DashboardUserTable() {
  const [tenants, setTenants] = useState([]);
  const [owners, setOwners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [tenantRes, ownerRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users/admin/tenants", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:5000/api/users/admin/owners", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        // Show only top 5
        setTenants(tenantRes.data.slice(0, 5));
        setOwners(ownerRes.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const renderTable = (title, data, type) => (
    <div className="bg-white shadow-md rounded-lg p-5 w-full mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <span
        className="text-blue-500 cursor-pointer"
        onClick={() =>
          navigate(type === "Tenant" ? "/TotalUser" : "/TotalRoomOwner")
        }
      >
        View All
      </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left text-gray-700 text-sm font-semibold">ID</th>
              <th className="p-3 text-left text-gray-700 text-sm font-semibold">{type} Name</th>
              <th className="p-3 text-left text-gray-700 text-sm font-semibold">Email</th>
              <th className="p-3 text-left text-gray-700 text-sm font-semibold">Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.u_id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 text-sm text-gray-600">{item.u_id}</td>
                <td className="p-3 flex items-center space-x-2 text-sm text-gray-600">
                  <img
                    src={item.profile_pic}
                    alt={item.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{item.fullName}</span>
                </td>
                <td className="p-3 text-sm text-gray-600">{item.email}</td>
                <td className="p-3 text-sm text-gray-600">{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="pt-10 pb-4">
      <div className="flex flex-col space-y-6 lg:space-y-0 lg:space-x-6 lg:flex-row">
        {renderTable("Top Tenants", tenants, "Tenant")}
        {renderTable("Room Owners", owners, "Owner")}
      </div>
    </div>
  );
}

export default DashboardUserTable;
