import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/header";
import Footer from "../Components/Footer";

const ProfileDetails = () => {
  const [profileImage, setProfileImage] = useState("./profile.png");

  const [userDetails, setUserDetails] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "San Francisco, CA",
    timezone: "GMT -08:00 Pacific Time",
    bio: "Property dealer",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle Profile Picture Change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <div>
        <Header/>
    
    <div className="container mt-5 px-5"> {/* Added padding on both sides */}
      {/* Profile Picture Section (Centered) */}
      <div className="d-flex flex-column align-items-center mb-4">
        <img
          src={profileImage}
          alt="Profile"
          className="rounded-circle border"
          style={{ width: "140px", height: "140px", objectFit: "cover", padding: "5px" }}
        />
        <div className="mt-2">
          <label htmlFor="profilePic" className="text-primary" style={{ cursor: "pointer" }}>
            Change Picture
          </label>
          <input type="file" id="profilePic" className="d-none" onChange={handleImageChange} />
        </div>
      </div>

      {/* Profile Heading */}
      <h4 className="text-center fw-bold">Profile Details</h4>

      {/* Personal Details */}
      <div className="card p-5 mt-4">
        <h5 className="fw-semibold">Personal Details</h5>
        <div className="row g-4 px-3"> {/* Added padding inside the form */}
          <ProfileInput label="First Name" name="firstName" value={userDetails.firstName} onChange={handleInputChange} />
          <ProfileInput label="Last Name" name="lastName" value={userDetails.lastName} onChange={handleInputChange} />
          <ProfileInput label="Email Address" name="email" value={userDetails.email} onChange={handleInputChange} />
          <ProfileInput label="Phone Number" name="phone" value={userDetails.phone} onChange={handleInputChange} />
          <ProfileInput label="Location" name="location" value={userDetails.location} onChange={handleInputChange} />
          <ProfileInput label="Time Zone" name="timezone" value={userDetails.timezone} onChange={handleInputChange} />
          <ProfileTextArea label="Bio" name="bio" value={userDetails.bio} onChange={handleInputChange} />
        </div>
        <div className="text-end mt-4">
          <button className="btn btn-primary px-4 py-2">Save Changes</button>
        </div>
      </div>

      {/* Change Password */}
      <div className="card p-5 mt-4">
        <h5 className="fw-semibold">Change Password</h5>
        <div className="row g-4 px-3"> {/* Added padding inside the form */}
          <ProfileInput label="Current Password" name="currentPassword" type="password" value={userDetails.currentPassword} onChange={handleInputChange} />
          <ProfileInput label="New Password" name="newPassword" type="password" value={userDetails.newPassword} onChange={handleInputChange} />
          <ProfileInput label="Confirm New Password" name="confirmPassword" type="password" value={userDetails.confirmPassword} onChange={handleInputChange} />
        </div>
        <div className="text-end mt-4">
          <button className="btn btn-primary px-4 py-2">Update Password</button>
        </div>
      </div>

      {/* Logout Section */}
      <div className="text-center mt-5 px-3">
  <p className="fw-medium">Log out your current session and sign out securely</p>
  <button className="btn btn-danger px-4 mt-4 mb-4">
  <i className="fas fa-sign-out-alt me-4"></i> Logout
</button>

</div>

    </div>
    <Footer/>
    </div>
  );
};

// Reusable Profile Input Component
const ProfileInput = ({ label, name, value, type = "text", onChange }) => (
  <div className="col-md-6">
    <label className="form-label fw-medium">{label}</label>
    <input type={type} className="form-control p-3" name={name} value={value} onChange={onChange} />
  </div>
);

// Reusable Profile TextArea Component
const ProfileTextArea = ({ label, name, value, onChange }) => (
  <div className="col-md-12">
    <label className="form-label fw-medium">{label}</label>
    <textarea className="form-control p-3" name={name} rows="2" value={value} onChange={onChange}></textarea>
  </div>
);

export default ProfileDetails;
