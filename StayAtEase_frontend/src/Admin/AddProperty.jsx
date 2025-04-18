import React, { useState } from "react";
import Footer from "../Components/Footer";
import Header from "./component/header";
//BuildOutlined
import { UploadOutlined, WifiOutlined, CarOutlined, FireOutlined, InsuranceOutlined, DesktopOutlined, HomeOutlined, RestOutlined, ApartmentOutlined ,RiseOutlined } from "@ant-design/icons";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    squareFootage: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    amenities: [],
    images: [],
    property_images: [],
    about: ""
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
      images: [...prev.images, ...files],
    }));
  };

  return (
    <div>
    <div className="bg-gray-100 min-h-screen px-10 py-25">
      <Header />
      <div className="container mx-auto pt-4 p-28 mt-5 mb-0">
        <h2 className="text-2xl !font-bold">Add New Property</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <form>
            <div className="mb-6">
              <label className="block font-medium mb-2">Property Title</label>
              <input
                type="text"
                name="title"
                className="w-full p-4 bg-gray-100 rounded-lg"
                placeholder="Enter property title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  className="w-full p-4 bg-gray-100 rounded-lg"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Square Footage</label>
                <input
                  type="text"
                  name="squareFootage"
                  className="w-full p-4 bg-gray-100 rounded-lg"
                  placeholder="Enter square footage"
                  value={formData.squareFootage}
                  onChange={handleChange}
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
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block font-medium mb-2">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  className="w-full p-4 bg-gray-100 rounded-lg"
                  placeholder="Number of bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  className="w-full p-4 bg-gray-100 rounded-lg"
                  placeholder="Number of bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Property Type</label>
                <select
                  name="propertyType"
                  className="w-full p-4 bg-gray-100 rounded-lg"
                  value={formData.propertyType}
                  onChange={handleChange}
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
                <label className="block font-medium mb-2">About Property</label>
                <textarea
                  name="about"
                  className="w-full p-4 bg-gray-100 rounded-lg"
                  placeholder="Describe your property in detail"
                  value={formData.about}
                  onChange={handleChange}
                  rows={4}
                />
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
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formData.images.map((file, index) => (
                          <div
                            key={index}
                            className="relative border rounded-lg overflow-hidden bg-gray-50"
                          >
                            <div className="aspect-w-16 aspect-h-9">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="p-2">
                              <p className="text-sm text-gray-600 truncate">{file.name}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            <div className="mt-6 text-center">
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Submit Property
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

export default PropertyForm;
