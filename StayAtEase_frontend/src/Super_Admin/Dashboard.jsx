import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HomeOutlined, CheckCircleOutlined, MailOutlined, StarOutlined } from '@ant-design/icons';
import SuperAdminNavbar from './Superadmin_navbar';
import Footer from '../Components/Footer';
import Dashboard_userTable from './Dashboard_userTable';
import LatestMessages from './LatestMessages';
import LatestReviews from './LatestReviews';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeListings: 0,
    totalInquiries: 0,
    reviewRating: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/properties/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const properties = response.data;

      const totalProperties = properties.length;
      const activeListings = properties.filter(p => p.status === 'Available').length;

      const totalInquiries = properties.reduce((acc, property) => acc + (property.Inquiries?.length || 0), 0);

      const reviewRating = properties.reduce((max, property) => {
        const rating = property.avgRating || 0;
        return rating > max ? rating : max;
      }, 0);

      setStats({
        totalProperties,
        activeListings,
        totalInquiries,
        reviewRating,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SuperAdminNavbar />
      <div className="flex-grow bg-gray-100 px-4 py-20 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <HomeOutlined className="text-blue-500 text-3xl" />, value: stats.totalProperties, label: "Total Properties", color: "text-blue-500" },
              { icon: <CheckCircleOutlined className="text-green-500 text-3xl" />, value: stats.activeListings, label: "Active Listings", color: "text-green-500" },
              { icon: <MailOutlined className="text-yellow-500 text-3xl" />, value: stats.totalInquiries, label: "Total Inquiries", color: "text-yellow-500" },
              { icon: <StarOutlined className="text-blue-500 text-3xl" />, value: stats.reviewRating.toFixed(1), label: "Top Rating", color: "text-blue-500" },
            ].map((stat, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start h-28">
                <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                <div className="text-xl font-bold">{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <Dashboard_userTable />
          <LatestMessages />
          <LatestReviews />
        </div>
      </div>
      <Footer />
    </div>
  );
}
