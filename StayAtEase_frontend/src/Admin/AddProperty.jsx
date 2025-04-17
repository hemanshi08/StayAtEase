import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Upload, Button, message, Card } from 'antd';
import { UploadOutlined, WifiOutlined, CarOutlined, FireOutlined, InsuranceOutlined, DesktopOutlined, HomeOutlined, RestOutlined, ApartmentOutlined, RiseOutlined } from '@ant-design/icons';
import axiosInstance from '../api/axiosInstance';
import Footer from "../Components/Footer";
import Header from "./component/header";
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

const AddProperty = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check user authorization when component mounts
    const checkAuthorization = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!user || !token) {
        message.error('Please log in to access this page');
        navigate('/login');
        return;
      }

      if (user.userType !== 'Property_Owner') {
        message.error('Only property owners can access this page');
        navigate('/');
        return;
      }

      setIsAuthorized(true);
    };

    checkAuthorization();
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    sq_ft: "",
    address: "",
    no_of_beds: "",
    no_of_bathrooms: "",
    property_type: "",
    amenities: [],
    images: [],
    property_images: []
  });

  const amenitiesList = [
    { name: "WiFi", icon: <WifiOutlined /> },
    { name: "Parking Space", icon: <CarOutlined /> },
    { name: "Fitness Center", icon: <FireOutlined /> },
    { name: "Swimming Pool", icon: <HomeOutlined /> },
    { name: "Elevator", icon: <RiseOutlined /> },
    { name: "Smart TV", icon: <DesktopOutlined /> },
    { name: "Security", icon: <InsuranceOutlined /> },
    { name: "Kitchen", icon: <RestOutlined /> },
    { name: "Laundry", icon: <ApartmentOutlined /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };
  
  const handleImageUpload = async (e) => {
    try {
      console.log('1. Image upload process started');
      const files = Array.from(e.target.files);
      console.log('2. Files received:', {
        numberOfFiles: files.length,
        fileDetails: files.map(file => ({
          name: file.name,
          type: file.type,
          size: file.size + ' bytes'
        }))
      });

      if (files.length + formData.images.length > 8) {
        console.log('3. Error: Too many files selected');
        message.error("You can only upload up to 8 images.");
        return;
      }

      // Create FormData for image upload
      const imageFormData = new FormData();
      files.forEach((file, index) => {
        console.log(`4. Adding file ${index + 1} to FormData:`, {
          fileName: file.name,
          fileType: file.type
        });
        // Add folder parameter for Cloudinary
        imageFormData.append('folder', 'stayatease-properties');
        imageFormData.append('images', file);
      });

      // Log FormData contents
      console.log('5. FormData contents:');
      for (let pair of imageFormData.entries()) {
        console.log('   ', pair[0], ':', pair[1].name || pair[1]);
      }

      console.log('6. Sending request to upload images with folder specification...');
      const imageResponse = await axiosInstance.post('/properties/upload-images', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`7. Upload progress: ${percentCompleted}%`);
        }
      });

      console.log('8. Server response received:', {
        status: imageResponse.status,
        statusText: imageResponse.statusText,
        data: imageResponse.data
      });

      if (imageResponse.data.success) {
        console.log('9. Upload successful. URLs received:', imageResponse.data.urls);
        setFormData((prev) => {
          const newState = {
            ...prev,
            images: [...prev.images, ...files],
            property_images: [...(prev.property_images || []), ...imageResponse.data.urls]
          };
          console.log('10. Updated form state:', newState);
          return newState;
        });
        message.success('Images uploaded successfully');
      } else {
        console.error('11. Upload failed:', imageResponse.data);
        throw new Error(imageResponse.data.message || 'Failed to upload images');
      }
    } catch (error) {
      console.error('12. Error in image upload:', {
        message: error.message,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        },
        stack: error.stack
      });
      
      // Check for specific error types
      if (error.response?.status === 413) {
        message.error('Files are too large. Please try smaller images.');
      } else if (error.response?.status === 415) {
        message.error('Invalid file type. Please upload only images.');
      } else if (error.response?.status === 401) {
        message.error('Please log in again to upload images.');
      } else {
        message.error('Failed to upload images: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('1. Form submission started');
    
    try {
      setLoading(true);
      console.log('2. Current formData:', formData);

      // Get user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      console.log('3. User data from localStorage:', { userId: storedUser?.id, userType: storedUser?.userType });

      if (!storedUser || !storedUser.id) {
        throw new Error('Please log in again to add a property');
      }

      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      if (storedUser.userType !== 'Property_Owner') {
        throw new Error('Only property owners can add properties');
      }

      // Validate required fields
      const requiredFields = ['title', 'price', 'sq_ft', 'address', 'no_of_beds', 'no_of_bathrooms', 'property_type'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Additional validation for numeric fields
      if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
        throw new Error('Please enter a valid price');
      }
      if (isNaN(parseFloat(formData.sq_ft)) || parseFloat(formData.sq_ft) <= 0) {
        throw new Error('Please enter a valid square footage');
      }
      if (isNaN(parseInt(formData.no_of_beds)) || parseInt(formData.no_of_beds) <= 0) {
        throw new Error('Please enter a valid number of bedrooms');
      }
      if (isNaN(parseInt(formData.no_of_bathrooms)) || parseInt(formData.no_of_bathrooms) <= 0) {
        throw new Error('Please enter a valid number of bathrooms');
      }

      // Prepare property data
      const propertyData = {
        title: formData.title.trim(),
        price: parseFloat(formData.price),
        sq_ft: parseFloat(formData.sq_ft),
        address: formData.address.trim(),
        no_of_beds: parseInt(formData.no_of_beds),
        no_of_bathrooms: parseInt(formData.no_of_bathrooms),
        property_type: formData.property_type,
        amenities: formData.amenities || [],
        property_images: formData.property_images || [],
        status: 'Available',
        u_id: storedUser.id,
        is_deleted: false
      };

      console.log('4. Prepared property data:', propertyData);

      // Send request to create property
      const response = await axiosInstance.post('/properties/create', propertyData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('5. Server response:', response.data);

      if (response.data.success) {
        message.success('Property added successfully!');
        // Reset form
        setFormData({
          title: "",
          price: "",
          sq_ft: "",
          address: "",
          no_of_beds: "",
          no_of_bathrooms: "",
          property_type: "",
          amenities: [],
          images: [],
          property_images: []
        });
        // Navigate to properties list
        navigate('/properties');
      } else {
        throw new Error(response.data.message || 'Failed to add property');
      }
    } catch (error) {
      console.error('6. Error in property submission:', {
        message: error.message,
        response: error.response?.data
      });
      message.error(error.message || 'Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return null; // Or you could return a loading spinner
  }

  return (
    <div>
      <div className="bg-gray-100 min-h-screen px-10 py-25">
        <Header />
        <div className="container mx-auto pt-4 p-28 mt-5 mb-0">
          <h2 className="text-2xl !font-bold">Add New Property</h2>
          <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block font-medium mb-2">Property Title</label>
                <input
                  type="text"
                  name="title"
                  className="w-full p-4 bg-gray-100 rounded-lg"
                  placeholder="Enter property title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="w-full p-4 bg-gray-100 rounded-lg"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Square Footage</label>
                  <input
                    type="number"
                    name="sq_ft"
                    className="w-full p-4 bg-gray-100 rounded-lg"
                    placeholder="Enter square footage"
                    value={formData.sq_ft}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block font-medium mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  className="w-full p-4 bg-gray-100 rounded-lg"
                  placeholder="Enter complete address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium mb-2">Bedrooms</label>
                  <input
                    type="number"
                    name="no_of_beds"
                    className="w-full p-4 bg-gray-100 rounded-lg"
                    placeholder="Enter number of bedrooms"
                    value={formData.no_of_beds}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Bathrooms</label>
                  <input
                    type="number"
                    name="no_of_bathrooms"
                    className="w-full p-4 bg-gray-100 rounded-lg"
                    placeholder="Enter number of bathrooms"
                    value={formData.no_of_bathrooms}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2">Property Type</label>
                  <select
                    name="property_type"
                    className="w-full p-4 bg-gray-100 rounded-lg"
                    value={formData.property_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Property Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Condo">Condo</option>
                  </select>
                </div>
              </div>
              
              <div className="m-4 mb-6">
                <label className="block font-medium mb-2">Amenities</label>
                <div className="grid grid-cols-3 gap-4 p-2">
                  {amenitiesList.map((amenity, index) => (
                    <label key={index} className="flex items-center space-x-4 p-2">
                      <input 
                        type="checkbox"
                        checked={formData.amenities.includes(amenity.name)}
                        onChange={() => handleAmenityToggle(amenity.name)}
                      />
                      <span className="flex items-center space-x-2">{amenity.icon} <span>{amenity.name}</span></span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className="block font-medium mb-2">Property Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <UploadOutlined className="text-2xl mr-2" />
                    <span>Click to upload images (max 8)</span>
                  </label>
                  
                  {/* Display uploaded files */}
                  {formData.images.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Uploaded Files:</h4>
                      <div className="space-y-2">
                        {formData.images.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <span className="truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 text-center">
                <button 
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddProperty;
