import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Header from "./component/header";
import Footer from "../Components/Footer";

const ProfileDetails = () => {
  const [profileImage, setProfileImage] = useState("./profile.png");
  const [userDetails, setUserDetails] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 000-0000",
    location: "San Francisco, CA",
    timezone: "(GMT-08:00) Pacific Time",
    bio: "Property dealer",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
      <Header />
      <div className="container mx-auto p-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-left"><strong>Profile Details</strong></h2>
        
        {/* Profile Image */}
        <div className="flex flex-col items-center mt-4">
          <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-300 p-1 object-cover" />
          <label className="mt-2 cursor-pointer text-blue-600 font-semibold hover:underline">
            Change Picture
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        {/* Profile Form */}
        <h2 className="text-xl font-bold">Profile Details</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput label="First Name" name="firstName" value={userDetails.firstName} onChange={handleInputChange} />
            <ProfileInput label="Last Name" name="lastName" value={userDetails.lastName} onChange={handleInputChange} />
            <ProfileInput label="Email Address" name="email" value={userDetails.email} onChange={handleInputChange} />
            <ProfileInput label="Phone Number" name="phone" value={userDetails.phone} onChange={handleInputChange} />
            <ProfileInput label="Location" name="location" value={userDetails.location} onChange={handleInputChange} />
            <ProfileInput label="Time Zone" name="timezone" value={userDetails.timezone} onChange={handleInputChange} />
          </div>
          <ProfileTextArea label="Bio" name="bio" value={userDetails.bio} onChange={handleInputChange} />

          <div className="flex justify-end text-white">
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-700 shadow-md">Save Changes</button>
          </div>
        </form>

        {/* Change Password Section */}
        <div className="mt-12">
          <h3 className="text-xl font-bold"><strong>Change Password</strong></h3>
          <div className="mt-4 space-y-4">
            <ProfileInput label="Current Password" name="currentPassword" type="password" value={userDetails.currentPassword} onChange={handleInputChange} />
            <ProfileInput label="New Password" name="newPassword" type="password" value={userDetails.newPassword} onChange={handleInputChange} />
            <ProfileInput label="Confirm Password" name="confirmPassword" type="password" value={userDetails.confirmPassword} onChange={handleInputChange} />
            <div className="flex justify-start text-white">
              <button type="button" className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-700 shadow-md">Update Password</button>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="flex justify-between items-center mt-12 border-t pt-6">
          <p className="text-gray-600">End your current session and sign out securely</p>
          <button className="text-red-600 bg-transparent font-semibold hover:text-red-700 flex items-center">
  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-red-600" /><span className="text-red-600">Logout</span>
</button>


        </div>
      </div>
      <Footer />
    </div>
  );
};

// Reusable Input Component
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

// Reusable TextArea Component
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