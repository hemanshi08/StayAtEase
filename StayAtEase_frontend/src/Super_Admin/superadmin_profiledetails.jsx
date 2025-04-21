import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Upload, notification } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined, EditOutlined, UploadOutlined, LogoutOutlined } from '@ant-design/icons';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ProfileDetails = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const { user: authUser, updateUser } = useAuth();
  const [profileImage, setProfileImage] = useState("./profile.png");
  const [userDetails, setUserDetails] = useState({
    Name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch profile data
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      console.log('Fetching user profile...');
      
      const response = await axiosInstance.get('/api/admin/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log('Profile fetch response:', response.data);

      if (response.data && response.data.user) {
        const userData = response.data.user;
        console.log('Setting user data:', userData);
        
        setUserDetails({
          ...userDetails,
          Name: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          location: userData.user_address,
          bio: userData.bio
        });
        
        if (userData.profile_pic) {
          setProfileImage(userData.profile_pic);
        }
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      console.error('Error response:', error.response?.data);
      
      message.error({
        content: 'Failed to fetch profile data',
        duration: 3,
        style: { position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Handle profile update
  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put('/api/admin/profile', values);
      
      message.success({
        content: 'Profile updated successfully!',
        duration: 3,
        style: { position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }
      });

      setProfileData(response.data.user);
      updateUser(response.data.user);
      setIsEditing(false);
    } catch (error) {
      message.error({
        content: error.response?.data?.error || 'Failed to update profile',
        duration: 3,
        style: { position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    try {
      setPasswordLoading(true);
      setPasswordErrors({ current: "", new: "", confirm: "" });
      
      const passwordData = {
        currentPassword: userDetails.currentPassword,
        newPassword: userDetails.newPassword
      };

      // Validate all fields are filled
      if (!userDetails.currentPassword || !userDetails.newPassword || !userDetails.confirmPassword) {
        setPasswordErrors({
          current: !userDetails.currentPassword ? 'Please enter current password' : '',
          new: !userDetails.newPassword ? 'Please enter new password' : '',
          confirm: !userDetails.confirmPassword ? 'Please confirm new password' : ''
        });
        return;
      }

      // Validate password length
      if (userDetails.newPassword.length < 6) {
        setPasswordErrors({
          ...passwordErrors,
          new: 'Password must be at least 6 characters long'
        });
        return;
      }

      // Validate passwords match
      if (userDetails.newPassword !== userDetails.confirmPassword) {
        setPasswordErrors({
          ...passwordErrors,
          confirm: 'New passwords do not match'
        });
        return;
      }

      const response = await axiosInstance.put('/users/change-password', passwordData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        // Show success notification
        notification.success({
          message: 'Success',
          description: 'Your password has been changed successfully!',
          placement: 'topRight',
          duration: 3,
          style: {
            background: '#f6ffed',
            border: '1px solid #b7eb8f',
            color: '#52c41a'
          }
        });

        // Clear password fields
        setUserDetails({
          ...userDetails,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordErrors({ current: "", new: "", confirm: "" });
      }
    } catch (error) {
      console.error('Password change error:', error);
      
      const errorMessage = error.response?.data?.error || 'Failed to change password';
      if (errorMessage.includes('current password')) {
        setPasswordErrors({
          ...passwordErrors,
          current: 'Current password is incorrect'
        });
        // Show error notification
        notification.error({
          message: 'Error',
          description: 'The current password you entered is incorrect. Please try again.',
          placement: 'topRight',
          duration: 3,
          style: {
            background: '#fff2f0',
            border: '1px solid #ffccc7',
            color: '#ff4d4f'
          }
        });
      } else {
        // Show error notification
        notification.error({
          message: 'Error',
          description: errorMessage,
          placement: 'topRight',
          duration: 3,
          style: {
            background: '#fff2f0',
            border: '1px solid #ffccc7',
            color: '#ff4d4f'
          }
        });
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('profile_pic', file);
        
        const response = await axiosInstance.put('/users/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (response.data && response.data.profile_pic) {
          setProfileImage(response.data.profile_pic);
          message.success({
            content: 'Profile picture updated successfully',
            duration: 3,
            style: { position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }
          });
        }
      } catch (error) {
        console.error('Error updating profile picture:', error);
        message.error({
          content: 'Failed to update profile picture',
          duration: 3,
          style: { position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const updateData = {
        fullName: userDetails.Name,
        phone: userDetails.phone,
        user_address: userDetails.location,
        bio: userDetails.bio
      };

      const response = await axiosInstance.put('/users/profile', updateData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data && response.data.success) {
        updateUser(response.data.user);
        
        // Show success notification
        notification.success({
          message: 'Success',
          description: 'Your profile has been updated successfully!',
          placement: 'topRight',
          duration: 3,
          style: {
            background: '#f6ffed',
            border: '1px solid #b7eb8f',
            color: '#52c41a'
          }
        });

        await fetchUserProfile();
      } else {
        throw new Error(response.data?.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Update error:', error);
      
      let errorMessage = 'Failed to update profile';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Show error notification
      notification.error({
        message: 'Error',
        description: errorMessage,
        placement: 'topRight',
        duration: 3,
        style: {
          background: '#fff2f0',
          border: '1px solid #ffccc7',
          color: '#ff4d4f'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      // Show success message
      message.success({
        content: 'Logged out successfully!',
        duration: 2,
        style: { 
          position: 'fixed', 
          top: '20px', 
          right: '20px', 
          zIndex: 1000,
          background: '#f6ffed',
          border: '1px solid #b7eb8f',
          padding: '10px 20px',
          borderRadius: '4px',
          color: '#52c41a'
        }
      });

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      message.error({
        content: 'Error during logout. Please try again.',
        duration: 3,
        style: { 
          position: 'fixed', 
          top: '20px', 
          right: '20px', 
          zIndex: 1000,
          background: '#fff2f0',
          border: '1px solid #ffccc7',
          padding: '10px 20px',
          borderRadius: '4px',
          color: '#ff4d4f'
        }
      });
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="container mx-auto p-6 max-w-3xl px-10 py-30">
        <h2 className="text-3xl font-bold text-center mb-6 text-left"><strong>Profile Details</strong></h2>
        
        <div className="flex flex-col items-center mt-4">
          <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-300 p-1 object-cover" />
          <label className="mt-2 cursor-pointer text-blue-600 font-semibold hover:underline">
            Change Picture
            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
          </label>
        </div>

        {/* Profile Form */}
        <h2 className="text-xl font-bold">Profile Details</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileInput 
              label="Name" 
              name="Name" 
              value={userDetails.Name} 
              onChange={handleInputChange} 
              disabled={loading}
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
              disabled={loading}
            />
            <ProfileInput 
              label="Location" 
              name="location" 
              value={userDetails.location} 
              onChange={handleInputChange} 
              disabled={loading}
            />
            
          </div>
          <ProfileTextArea 
            label="Bio" 
            name="bio" 
            value={userDetails.bio} 
            onChange={handleInputChange} 
            disabled={loading}
          />

          <div className="flex justify-end text-white">
            <button 
              type="submit" 
              className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-700 shadow-md"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Change Password Section */}
        <div className="mt-12">
          <h3 className="text-xl font-bold"><strong>Change Password</strong></h3>
          <div className="mt-4 space-y-4">
            <div>
              <ProfileInput 
                label="Current Password" 
                name="currentPassword" 
                type="password" 
                value={userDetails.currentPassword} 
                onChange={handleInputChange} 
                disabled={passwordLoading}
              />
              {passwordErrors.current && (
                <p className="text-red-500 text-sm mt-1">{passwordErrors.current}</p>
              )}
            </div>
            <div>
              <ProfileInput 
                label="New Password" 
                name="newPassword" 
                type="password" 
                value={userDetails.newPassword} 
                onChange={handleInputChange} 
                disabled={passwordLoading}
              />
              {passwordErrors.new && (
                <p className="text-red-500 text-sm mt-1">{passwordErrors.new}</p>
              )}
            </div>
            <div>
              <ProfileInput 
                label="Confirm Password" 
                name="confirmPassword" 
                type="password" 
                value={userDetails.confirmPassword} 
                onChange={handleInputChange} 
                disabled={passwordLoading}
              />
              {passwordErrors.confirm && (
                <p className="text-red-500 text-sm mt-1">{passwordErrors.confirm}</p>
              )}
            </div>
            <div className="flex justify-start text-white">
              <button 
                type="button" 
                className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-700 shadow-md"
                onClick={handlePasswordChange}
                disabled={passwordLoading}
              >
                {passwordLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="flex justify-between items-center mt-12 border-t pt-6">
          <p className="text-gray-600">End your current session and sign out securely</p>
          <button 
            onClick={handleLogout}
            className="!text-red-600 font-semibold !hover:text-red-700 flex items-center cursor-pointer"
          >
            <LogoutOutlined className="mr-2" /> Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Reusable Input Component
const ProfileInput = ({ label, name, value, type = "text", onChange, disabled }) => (
  <div>
    <label className="block text-gray-700 font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full p-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
    />
  </div>
);

// Reusable TextArea Component
const ProfileTextArea = ({ label, name, value, onChange, disabled }) => (
  <div>
    <label className="block text-gray-700 font-semibold mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full p-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
      rows="3"
    ></textarea>
  </div>
);

export default ProfileDetails; 
