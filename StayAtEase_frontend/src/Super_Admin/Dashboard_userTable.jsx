import React, { useEffect, useState } from "react";
import axios from "axios";

function DashboardUserTable() {
    const [tenants, setTenants] = useState([]);
    const [owners, setOwners] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const [tenantRes, ownerRes] = await Promise.all([
                axios.get("http://localhost:5000/api/users/tenants"),  // Update URL as per your route
                axios.get("http://localhost:5000/api/users/room-owners")
            ]);

            setTenants(tenantRes.data);
            setOwners(ownerRes.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const renderTable = (title, data, type) => (
        <div className="bg-white shadow-md rounded-lg p-5 w-full mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{title}</h2>
                <a href="#" className="text-blue-500 text-sm font-semibold hover:underline">View All →</a>
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
                        {data.map((user) => (
                            <tr key={user.u_id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-3 text-sm text-gray-600">{user.u_id}</td>
                                <td className="p-3 flex items-center space-x-2 text-sm text-gray-600">
                                    <img
                                        src={user.profile_pic}
                                        alt={user.fullName}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span>{user.fullName}</span>
                                </td>
                                <td className="p-3 text-sm text-gray-600">{user.email}</td>
                                <td className="p-3 text-sm text-gray-600">{user.phone}</td>
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
                {renderTable("Top Providers", tenants, "Provider")}
                {renderTable("Room Owners", owners, "Admin")}
            </div>
        </div>
    );
}

export default DashboardUserTable;
