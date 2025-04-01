import React from 'react';
import { HomeOutlined, CheckCircleOutlined, MailOutlined, StarOutlined } from '@ant-design/icons';
import SuperAdminNavbar from './Superadmin_navbar';
import Footer from '../Components/Footer';
import Dashboard_userTable from './Dashboard_userTable';
import LatestMessages from './LatestMessages';
import LatestReviews from './LatestReviews';

export default function Dashboard() {
  const stats = [
    { icon: <HomeOutlined className="text-blue-500 text-3xl" />, value: 24, label: "Total Properties", color: "text-blue-500" },
    { icon: <CheckCircleOutlined className="text-green-500 text-3xl" />, value: 18, label: "Active Listings", color: "text-green-500" },
    { icon: <MailOutlined className="text-yellow-500 text-3xl" />, value: 156, label: "Total Inquiries", color: "text-yellow-500" },
    { icon: <StarOutlined className="text-blue-500 text-3xl" />, value: 4.8, label: "Review Rating", color: "text-blue-500" }
  ];

  return (
    <div className="flex flex-col min-h-screen">

    <SuperAdminNavbar />
    <div className="flex-grow bg-gray-100 px-4 py-20 w-full">     
    <div className="max-w-6xl mx-auto"> {/* Keeps content responsive */}
    {/* <h1 className="text-2xl font-semibold mb-6">Dashboard</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start h-28">
              <div className={`mb-2 ${stat.color}`}>{stat.icon}</div>
              <div className="text-xl font-bold">{stat.value}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <Dashboard_userTable/>
        <LatestMessages/>
        <LatestReviews/>
      </div>
     
    </div>
    <Footer />
    </div>
  );
}