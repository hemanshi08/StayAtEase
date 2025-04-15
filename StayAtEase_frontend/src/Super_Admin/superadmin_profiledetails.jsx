import React, { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import SuperAdminNavbar from "./Superadmin_navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [profileImage, setProfileImage] = useState("../public/profile_image/team-1.jpg");
  const [userDetails, setUserDetails] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 000-0000",
   
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleLogout = () => {
    // Clear authentication (if needed)
    // localStorage.removeItem("token"); // Example of clearing a token
    navigate("/"); // Navigate to home page after logout
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div>
      <SuperAdminNavbar />
      <div className="container mx-auto p-8 max-w-3xl pt-27">
        <h2 className="text-3xl !font-bold text-left mb-6">Profile Details</h2>

        <div className="flex flex-col items-center mt-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 p-1 object-cover"
          />
          <label className="mt-2 cursor-pointer text-blue-600 font-normal hover:underline">
            Change Picture
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput label="First Name" name="firstName" value={userDetails.firstName} onChange={handleInputChange} />
            <ProfileInput label="Last Name" name="lastName" value={userDetails.lastName} onChange={handleInputChange} />
            <ProfileInput label="Email Address" name="email" value={userDetails.email} onChange={handleInputChange} />
            <ProfileInput label="Phone Number" name="phone" value={userDetails.phone} onChange={handleInputChange} />
           
          </div>
         
          <div className="flex justify-end text-white">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm uppercase tracking-wide py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>

        <div className="mt-12">
          <h3 className="text-xl font-bold">Change Password</h3>
          <div className="mt-4 space-y-4">
            <ProfileInput label="Current Password" name="currentPassword" type="password" value={userDetails.currentPassword} onChange={handleInputChange} />
            <ProfileInput label="New Password" name="newPassword" type="password" value={userDetails.newPassword} onChange={handleInputChange} />
            <ProfileInput label="Confirm Password" name="confirmPassword" type="password" value={userDetails.confirmPassword} onChange={handleInputChange} />
            <div className="flex justify-start text-white">
              <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm uppercase tracking-wide py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out cursor-pointer">
                Update Password
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 border-t pt-6">
          <p className="text-gray-600">End your current session and sign out securely</p>
          <button className="!text-red-600 font-semibold !hover:text-red-700 flex items-center cursor-pointer" onClick={handleLogout}>
            <LogoutOutlined className="mr-2" /> Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ProfileInput = ({ label, name, value, type = "text", onChange }) => (
  <div>
    <label className="block text-gray-700 font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
);

const ProfileTextArea = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-gray-700 font-semibold mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      rows="3"
    ></textarea>
  </div>
);

export default ProfileDetails;
