import React from "react";

function DashboardUserTable() {
    const users = [
        { id: 1, name: "Robert", email: "robert@example.com", phone: "+1 347-479-8275", img: "../public/profile_image/team-3.jpg" },
        { id: 2, name: "Sharonda", email: "sharonda@example.com", phone: "+1 570-621-248", img: "../public/profile_image/testimonial-1.jpg" },
        { id: 3, name: "John Smith", email: "johnsmith@example.com", phone: "+1 646-957-2004", img: "../public/profile_image/testimonial-2.jpg" },
        { id: 4, name: "Pricilla", email: "pricilla@example.com", phone: "+1 614-915-8101", img: "../public/profile_image/testimonial-5.jpg" },
        { id: 5, name: "James", email: "james@example.com", phone: "+1 918-543-3702", img: "../public/profile_image/testimonial-4.jpg" },
    ];

    const admins = [
        { id: 1, name: "Robert", email: "robert@example.com", phone: "+1 347-479-8275", img: "../public/profile_image/testimonial-3.jpg" },
        { id: 2, name: "Sharonda", email: "sharonda@example.com", phone: "+1 570-621-248", img: "../public/profile_image/team-4.jpg" },
        { id: 3, name: "John Smith", email: "johnsmith@example.com", phone: "+1 646-957-2004", img: "../public/profile_image/team-2.jpg" },
        { id: 4, name: "Pricilla", email: "pricilla@example.com", phone: "+1 614-915-8101", img: "../public/profile_image/testimonial-5.jpg" },
        { id: 5, name: "James", email: "james@example.com", phone: "+1 918-543-3702", img: "../public/profile_image/testimonial-1.jpg" },
    ];

    const renderTable = (title, data, type) => (
        <div className="bg-white shadow-md rounded-lg p-5 w-full mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg !font-bold">{title}</h2>
                <a href="#" className="text-blue-500 text-sm font-semibold hover:underline">
                    View All →
                </a>
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
                            <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-3 text-sm text-gray-600">{item.id}</td>
                                <td className="p-3 flex items-center space-x-2 text-sm text-gray-600">
                                    <img src={item.img} alt={item.name} className="w-8 h-8 rounded-full" />
                                    <span>{item.name}</span>
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
                {renderTable("Top Providers", users, "Provider")}
                {renderTable("Room Owners", admins, "Admin")}
            </div>
        </div>
    );
}

export default DashboardUserTable;
