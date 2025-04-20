import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  EditOutlined, DeleteOutlined, StarFilled, CheckCircleFilled, 
  WifiOutlined, CarOutlined, DesktopOutlined, HomeOutlined, 
  EnvironmentOutlined, SafetyOutlined, ShopOutlined, AppstoreOutlined, 
  ToolOutlined, ForkOutlined, ExclamationCircleOutlined, ApartmentOutlined
} from '@ant-design/icons';
import { message } from 'antd';
import Footer from '../Components/Footer';
import Header from './component/header';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      if (!token) {
        message.error('Please login to view property details');
        navigate('/admin/login');
        return;
      }
      
      // Debug log
      console.log('Fetching property with ID:', id);
      
      // Fetch property details with improved error handling
      const propertyRes = await axios.get(`http://localhost:5000/api/properties/property/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(error => {
        if (error.response?.status === 404) {
          throw new Error('Property not found. Please check the property ID.');
        }
        throw error;
      });
      
      // Debug log
      console.log('Property response:', propertyRes.data);
      
      if (!propertyRes.data) {
        console.error('Property data is missing in response:', propertyRes.data);
        throw new Error('Property data not found in server response');
      }
      
      setProperty(propertyRes.data);
      
      // Fetch reviews using getPropertyReviews
      try {
        const reviewsRes = await axios.get(`http://localhost:5000/api/properties/${id}/reviews`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (reviewsRes.data?.success && Array.isArray(reviewsRes.data.reviews)) {
          setReviews(reviewsRes.data.reviews);
        } else {
          console.warn('Reviews data is not in expected format:', reviewsRes.data);
          setReviews([]);
        }
      } catch (reviewError) {
        console.error('Error fetching reviews:', reviewError);
        if (reviewError.response?.status === 500) {
          console.error('Server error details:', reviewError.response.data);
          message.warning('Reviews service is temporarily unavailable');
        } else {
          message.warning('Could not load reviews for this property');
        }
        setReviews([]);
      }
      
      // Fetch inquiries with improved error handling
      try {
        const inquiriesRes = await axios.get(`http://localhost:5000/api/properties/${id}/inquiries`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (inquiriesRes.data?.success && Array.isArray(inquiriesRes.data.inquiries)) {
          setInquiries(inquiriesRes.data.inquiries);
        } else {
          console.warn('Inquiries data is not in expected format:', inquiriesRes.data);
          setInquiries([]);
        }
      } catch (inquiryError) {
        console.error('Error fetching inquiries:', inquiryError);
        if (inquiryError.response?.status === 500) {
          console.error('Server error details:', inquiryError.response.data);
          message.warning('Inquiries service is temporarily unavailable');
        } else {
          message.warning('Could not load inquiries for this property');
        }
        setInquiries([]);
      }
      
    } catch (err) {
      console.error('Error fetching property data:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load property';
      setError(errorMessage);
      
      if (err.response?.status === 401) {
        message.error('Please login to view property details');
        navigate('/admin/login');
      } else if (err.response?.status === 404) {
        message.error('Property not found. Please check the property ID.');
        setTimeout(() => {
          navigate('/admin/properties');
        }, 2000);
      } else {
        message.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPropertyData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <ExclamationCircleOutlined className="text-red-500 text-4xl mb-4" />
        <div className="text-red-500 text-xl">{error}</div>
        <button 
          onClick={() => navigate('/admin/properties')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-gray-500 text-xl mb-4">Property not found</div>
        <button 
          onClick={() => navigate('/admin/properties')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className='bg-gray-50 p-7'>
        <div className="max-w-7xl mx-auto pt-4 mb-6 mt-6">
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-6 pb-4">
            <div>
              <h2 className="text-3xl !font-bold">{property.title}</h2>
              <div className={`mt-2 flex items-center gap-1 ${property.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} px-3 py-1 text-sm rounded-full font-medium w-fit`}>
                <CheckCircleFilled className={property.status === 'Available' ? 'text-green-500' : 'text-red-500'} /> 
                {property.status}
              </div>
            </div>

            <div className="flex items-center gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-black">4.8</span>
                <span className="text-yellow-500 flex">
                  {[...Array(5)].map((_, i) => <StarFilled key={i} />)}
                </span>
                <span className="text-gray-500 text-sm">({reviews.length} reviews)</span>
              </div>

              <div className="flex items-center gap-8">
                <button className="!text-red-500 hover:!text-red-700 text-sm flex items-center gap-1 cursor-pointer">
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid gap-4">
            {property.property_images?.length > 0 ? (
              <>
                <img 
                  src={property.property_images[0]} 
                  className="w-full rounded-lg" 
                  alt="Main" 
                />
                <div className="grid grid-cols-4 gap-2">
                  {property.property_images.slice(1, 5).map((img, index) => (
                    <img 
                      key={index} 
                      src={img} 
                      className="rounded-lg" 
                      alt={`Thumb ${index + 1}`} 
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-gray-200 rounded-lg w-full h-64 flex items-center justify-center">
                <span className="text-gray-500">No images available</span>
              </div>
            )}
          </div>

          {/* About Section */}
          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold" style={{ fontWeight: '700' }}>
              About Property
            </h2>
            <p className="text-gray-700 leading-relaxed m-0">
              {property.about || 'No description available.'}
            </p>
          </div>

          {/* Price Section */}
          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm text-3xl font-bold text-black-300">
            ₹{property.price?.toLocaleString() || '0'} 
            <br />
            <span className="text-lg font-normal text-gray-600">per month</span>
          </div>

          {/* Property Details */}
          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4" style={{ fontWeight: '700' }}>Property Details</h3>
            <div className="grid grid-cols-3 gap-6 text-gray-700 text-lg">
              <div className="flex items-center gap-3">
                <AppstoreOutlined className="!text-blue-600 text-2xl" /> 
                <div>
                  <span>{property.sq_ft} sq ft</span> 
                  <br />
                  <span className="text-sm text-gray-500">Square Footage</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <EnvironmentOutlined className="!text-blue-600 text-2xl" /> 
                <div>
                  <span>{property.address}</span> 
                  <br />
                  <span className="text-sm text-gray-500">Address</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HomeOutlined className="!text-blue-600 text-2xl" /> 
                <div>
                  <span>{property.property_type}</span> 
                  <br />
                  <span className="text-sm text-gray-500">Property Type</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4" style={{ fontWeight: '700' }}>Specifications</h3>
            <div className="grid grid-cols-2 gap-6 text-gray-700 text-lg">
              <div className="flex items-center gap-3">
                <HomeOutlined className="!text-blue-600 text-2xl" />
                <div>
                  <span className="font-bold">{property.no_of_beds} Bedrooms</span> 
                  <br />
                  <span className="text-sm text-gray-500">Spacious rooms</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ToolOutlined className="!text-blue-600 text-2xl" />
                <div>
                  <span className="font-bold">{property.no_of_bathrooms} Bathroom</span> 
                  <br />
                  <span className="text-sm text-gray-500">Modern fixtures</span>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4" style={{ fontWeight: '700' }}>Amenities</h3>
            <div className="grid grid-cols-4 gap-6 text-gray-700 text-lg">
              {property.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  {amenity === 'WiFi' && <WifiOutlined className="text-2xl !text-blue-600" />}
                  {amenity === 'Parking Space' && <CarOutlined className="text-2xl !text-blue-600" />}
                  {amenity === 'Fitness Center' && <ToolOutlined className="text-2xl !text-blue-600" />}
                  {amenity === 'Swimming Pool' && <ShopOutlined className="text-2xl !text-blue-600" />}
                  {amenity === 'Elevator' && <HomeOutlined className="text-2xl !text-blue-600" />}
                  {amenity === 'Smart TV' && <DesktopOutlined className="text-2xl !text-blue-600" />}
                  {amenity === 'Security' && <SafetyOutlined className="text-2xl !text-blue-600" />}
                  {amenity === 'Kitchen' && <ForkOutlined className="text-2xl !text-blue-600" />}
                  {amenity === 'Laundry' && <ApartmentOutlined className="text-2xl !text-blue-600" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

         {/* Reviews Section */}
<div className="mt-6 p-4 bg-white rounded-lg shadow shadow-gray-200">
  <h2 className="text-xl font-bold text-gray-800">
    Reviews For {property.title}
  </h2>
</div>
<div className="mt-4 bg-white rounded-lg shadow p-4">
  <div className="overflow-x-auto text-sm">
    <table className="min-w-full border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-gray-100 text-left text-gray-700">
          <th className="p-3 border-b border-gray-200">Reviewer</th>
          <th className="p-3 border-b border-gray-200">Date</th>
          <th className="p-3 border-b border-gray-200">Rating</th>
          <th className="p-3 border-b border-gray-200">Review</th>
        </tr>
      </thead>
      <tbody>
        {property.Reviews && property.Reviews.length > 0 ? (
          property.Reviews.map((review) => (
            <tr key={review.r_id} className="even:bg-gray-50 hover:bg-gray-100 transition">
              <td className="p-4 flex items-center space-x-3 border-b border-gray-100">
                <span className="font-medium text-gray-800">
                  {review.User?.fullName || 'Anonymous'}
                </span>
              </td>
              <td className="p-3 border-b border-gray-100 text-gray-700">
                {new Date(review.date).toLocaleDateString()}
              </td>
              <td className="p-3 border-b border-gray-100 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <StarFilled key={i} />
                ))}
              </td>
              <td className="p-3 border-b border-gray-100 text-gray-700">
                {review.review}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center text-gray-500 p-4">
              No reviews found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

{/* Inquiries Section */}
<div className="mt-10 p-4 bg-white rounded-lg shadow shadow-gray-200">
  <h2 className="text-xl font-bold text-gray-800">
    Inquiries For {property.title}
  </h2>
</div>
<div className="mt-4 bg-white shadow p-4 rounded-lg">
  <div className="flex justify-between items-center mb-4">
    <h4 className="text-xl font-bold text-gray-800">Latest Messages</h4>
  </div>
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 rounded-lg">
      <thead>
        <tr className="bg-gray-100 text-left text-gray-700">
          <th className="p-3 border-b border-gray-200">Guest Name</th>
          <th className="p-3 border-b border-gray-200">Email Address</th>
          <th className="p-3 border-b border-gray-200">Message</th>
        </tr>
      </thead>
      <tbody>
        {property.Inquiries && property.Inquiries.length > 0 ? (
          property.Inquiries.map((inquiry) => (
            <tr key={inquiry.i_id} className="even:bg-gray-50 hover:bg-gray-100 transition">
              <td className="p-3 flex items-center space-x-3 border-b border-gray-100">
                <span className="font-medium text-gray-800">
                  {inquiry.User?.fullName || 'Anonymous'}
                </span>
              </td>
              <td className="p-3 border-b border-gray-100 text-gray-700">
                {inquiry.User?.email || 'N/A'}
              </td>
              <td className="p-3 border-b border-gray-100 text-gray-700">
                {inquiry.message}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center text-gray-500 p-4">
              No inquiries found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}