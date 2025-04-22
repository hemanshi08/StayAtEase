import React, { useState, useEffect } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import SuperAdminNavbar from "./Superadmin_navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ProfileDetails = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState("");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch admin data when the component mounts
  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login if there's no token
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/admin/getdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.admin) {
          setUserDetails({
            firstName: data.admin.fullName.split(" ")[0],
            lastName: data.admin.fullName.split(" ")[1] || "",
            email: data.admin.email,
            phone: data.admin.phone,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setProfileImage(data.admin.profile_pic);
        } else {
          alert("Failed to fetch admin data");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        alert("Error fetching admin data");
      }
    };

    fetchAdminData();
  }, [navigate]);

  const { logout } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    logout();
        navigate("/login"); // Redirect to login page
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/admin/admin-update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: userDetails.firstName + " " + userDetails.lastName,
        phone: userDetails.phone,
        profile_pic: profileImage,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || "Updated"))
      .catch(() => alert("Error updating profile"));
  };

  const handleChangePassword = async () => {
    if (userDetails.newPassword !== userDetails.confirmPassword) {
      return alert("Passwords do not match");
    }

    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/api/admin/admin-change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword: userDetails.currentPassword,
        newPassword: userDetails.newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || data.error))
      .catch(() => alert("Error updating password"));
  };

  return (
    <div>
      <SuperAdminNavbar />
      <div className="container mx-auto p-8 max-w-3xl pt-27">
        <h2 className="text-3xl !font-bold text-left mb-6">Profile Details</h2>

        <div className="flex flex-col items-center mt-4">
          <img
            src={profileImage || "../public/profile_image/team-1.jpg"}
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
            <ProfileInput
              label="First Name"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleInputChange}
            />
            <ProfileInput
              label="Last Name"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleInputChange}
            />
            <ProfileInput
              label="Email Address"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              disabled
            />
            <ProfileInput
              label="Phone Number"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
            />
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
            <ProfileInput
              label="Current Password"
              name="currentPassword"
              type="password"
              value={userDetails.currentPassword}
              onChange={handleInputChange}
            />
            <ProfileInput
              label="New Password"
              name="newPassword"
              type="password"
              value={userDetails.newPassword}
              onChange={handleInputChange}
            />
            <ProfileInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={userDetails.confirmPassword}
              onChange={handleInputChange}
            />
            <div className="flex justify-start text-white">
              <button
                type="button"
                onClick={handleChangePassword}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm uppercase tracking-wide py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 border-t pt-6">
          <p className="text-gray-600">End your current session and sign out securely</p>
          <button
            className="!text-red-600 font-semibold !hover:text-red-700 flex items-center cursor-pointer"
            onClick={handleLogout}
          >
            <LogoutOutlined className="mr-2" /> Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ProfileInput = ({ label, name, value, type = "text", onChange, disabled = false }) => (
  <div>
    <label className="block text-gray-700 font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full p-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-60"
    />
  </div>
);

export default ProfileDetails;
