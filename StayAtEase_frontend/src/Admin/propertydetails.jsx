import { FaEdit, FaTrash, FaStar, FaCircle, FaSwimmingPool, FaWifi, FaTv, FaDumbbell, FaEye, FaLocationArrow, FaShieldAlt, FaHome, FaBath, FaBed, FaParking, FaUtensils, FaRulerCombined } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from './component/header';
import Footer from '../Components/Footer';
export default function PropertyDetails() {
  const [currentReviews] = useState([
    { id: 1, name: "Sarah Johnson", date: "Jan 15, 2024", rating: "⭐⭐⭐⭐⭐", review: "Absolutely love this property! The amenities are top-notch and the staff is incredibly helpful." },
    { id: 2, name: "Michael Chen", date: "Jan 14, 2024", rating: "⭐⭐⭐⭐", review: "Great location and well-maintained property. The only minor issue was the parking situation during peak hours." },
    { id: 3, name: "Sarah Johnson", date: "Jan 15, 2024", rating: "⭐⭐⭐⭐⭐", review: "Absolutely love this property! The amenities are top-notch and the staff is incredibly helpful." },

  ]);
  const messagesData = [
    { id: 1, name: "Sarah Johnson", propertyId: "P.307", email: "sarahjohnson@gmail.com", contact: "1236547890", message: "Are there any restrictions on lease agreements?" },
    { id: 2, name: "Michael Brown", propertyId: "P.309", email: "michaelbrown@gmail.com", contact: "9874563210", message: "Are there any restrictions on lease agreements?" },
    { id: 3, name: "Emma Davis", propertyId: "P.310", email: "emmadavis@gmail.com", contact: "7410258963", message: "What documents are required for booking?" },
  ];
  return (
    <div className='bg-gray-50'>
      <Header/>
  
    <div className="max-w-7xl mx-auto pt-4  mb-6 mt-6 ">
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6 pb-4">
      {/* Left Section: Title & Availability */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Modern Apartment</h1>
        <div className="mt-2 flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full font-medium w-fit">
          <FaCircle className="text-green-500 text-xs" /> Available
        </div>
      </div>

      {/* Right Section: Ratings & Actions */}
      <div className="flex items-center gap-6 text-gray-700">
        {/* Ratings */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-black">4.8</span>
          <span className="text-yellow-500 flex">{[...Array(5)].map((_, i) => <FaStar key={i} />)}</span>
          <span className="text-gray-500 text-sm">(28 reviews)</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-8">
          <button className="text-black hover:text-gray-600 text-sm flex items-center gap-1">
            <FaEdit /> Edit
          </button>
          <button className="!text-red-500 hover:!text-red-700 text-sm flex items-center gap-1">
  <FaTrash /> Delete
</button>
        </div>
      </div>
    </div>

      {/* Image Gallery */}
      <div className="grid gap-4">
        <img src="../Properties_image/iflat4.jpg" className="w-full h-150 rounded-lg" alt="Main" />
        <div className="grid grid-cols-4 gap-2">
          <img src="../Properties_image/iflat4.jpg" className="rounded-lg" alt="Thumb 1" />
          <img src="../Properties_image/iflat4.jpg" className="rounded-lg" alt="Thumb 2" />
          <img src="../Properties_image/iflat4.jpg" className="rounded-lg" alt="Thumb 3" />
          <img src="../Properties_image/iflat4.jpg" className="rounded-lg" alt="Thumb 4" />
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold" style={{ fontWeight: '700' }}>About Property</h2>
        <p className="text-gray-700 leading-relaxed">This stunning apartment offers modern living at its finest. With breathtaking city views, premium amenities, and a prime location, it's designed for luxury and convenience.</p>
      </div>

      {/* Price Section */}
      <div className="mt-4 p-6 bg-white rounded-lg shadow-sm text-3xl font-bold text-black-300">
        ₹250,000 <br></br><span className="text-lg font-normal text-gray-600">per month</span>
      </div>

      {/* Property Details */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-4" style={{ fontWeight: '700' }}>Property Details</h3>
        <div className="grid grid-cols-3 gap-6 text-gray-700 text-lg">
          <div className="flex items-center gap-3"><FaRulerCombined className="text-blue-600 text-2xl" /> <div><span>75 mp</span> <br /><span className="text-sm text-gray-500">Square Footage</span></div></div>
          <div className="flex items-center gap-3"><FaLocationArrow className="text-blue-600 text-2xl" /> <div><span>Sector 1, București</span> <br /><span className="text-sm text-gray-500">Address</span></div></div>
          <div className="flex items-center gap-3"><FaHome className="text-blue-600 text-2xl" /> <div><span>Apartment</span> <br /><span className="text-sm text-gray-500">Property Type</span></div></div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-4" style={{ fontWeight: '700' }}>Specifications</h3>
        <div className="grid grid-cols-2 gap-6 text-gray-700 text-lg">
          <div className="flex items-center gap-3"><FaBed className="text-blue-600 text-2xl" /> <div><span className="font-bold">2 Bedrooms</span> <br /><span className="text-sm text-gray-500">Spacious rooms</span></div></div>
          <div className="flex items-center gap-3"><FaBath className="text-blue-600 text-2xl" /> <div><span className="font-bold">1 Bathroom</span> <br /><span className="text-sm text-gray-500">Modern fixtures</span></div></div>
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-4" style={{ fontWeight: '700' }}>Amenities</h3>
        <div className="grid grid-cols-4 gap-6 text-gray-700 text-lg">
          <div className="flex items-center gap-3 "><FaWifi className="text-2xl text-blue-600" /> <span>High-speed WiFi</span></div>
          <div className="flex items-center gap-3"><FaParking className="text-2xl text-blue-600" /> <span>Parking Space</span></div>
          <div className="flex items-center gap-3"><FaDumbbell className="text-2xl text-blue-600" /> <span>Fitness Center</span></div>
          <div className="flex items-center gap-3"><FaTv className="text-2xl text-blue-600" /> <span>Smart TV</span></div>
          <div className="flex items-center gap-3"><FaSwimmingPool className="text-2xl text-blue-600" /> <span>Swimming Pool</span></div>
          <div className="flex items-center gap-3"><FaHome className="text-2xl text-blue-600" /> <span>Elevator</span></div>
          <div className="flex items-center gap-3"><FaShieldAlt className="text-2xl text-blue-600" /> <span>Laundry</span></div>
          <div className="flex items-center gap-3"><FaUtensils className="text-2xl text-blue-600" /> <span>Kitchen</span></div>
        </div>
      </div>



      {/* Reviews Section */}
      <div className="mt-6 bg-white rounded-lg shadow-sm  p-1.5">
        <h3 className=" font-semibold" style={{ fontWeight: '700' }}>Reviews For Modern Apartment</h3>
        </div>
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4 ">
        
        <div className="overflow-x-auto text-sm">
          <table className="min-w-full ">
           
            <tbody>
              {currentReviews.length > 0 ? (
                currentReviews.map((review) => (
                  <tr key={review.id} className="even:bg-white">
                   <td className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-sm font-semibold">
  {['SJ', 'MC', 'EW', 'DT', 'LM'][review.id]}
</td>

                    <td className="p-3 ">{review.name}</td>
                    <td className="p-3 ">{review.date}</td>
                    <td className="p-3 ">{review.rating}</td>
                    <td className="p-3 ">{review.review}</td>
                    <td className="p-3 text-red-500">
  <button className=" transition duration-200 ease-in-out hover:text-red-600 hover:underline focus:outline-none focus:ring focus:ring-red-300">
    Report
  </button>
</td>


                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 p-3">No reviews found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiries Section */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-1.5 ">
      <h3 className="text-2xl font-black  tracking-wide !important" style={{ fontWeight: '700' }}>
  Inquiries For Modern Apartment
</h3>

</div>

        <div className="mt-8 bg-white shadow-lg p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-bold">Latest Messages</h4>
                        <a href="#" className="text-blue-500">View All</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="p-3">Guest Name</th>
                                    <th className="p-3">Property Id</th>
                                    <th className="p-3">Email Address</th>
                                    <th className="p-3">Contact No</th>
                                    <th className="p-3">Message</th>
                                </tr>
                            </thead>
                            <tbody>
  {messagesData.map((msg, index) => (
    <tr key={index} className="even:bg-white">
      <td className="p-3">{msg.name}</td>
      <td className="p-3">{msg.propertyId}</td>
      <td className="p-3">{msg.email}</td>
      <td className="p-3">{msg.contact}</td>
      <td className="p-3">{msg.message}</td>
    </tr>
  ))}
</tbody>

                        </table>
                    </div>
                </div>

      {/* View Button */}
      </div>
      <Footer/>
    </div>
  
  );
}