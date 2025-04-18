import { EditOutlined, DeleteOutlined, StarFilled, CheckCircleFilled, WifiOutlined, CarOutlined, DesktopOutlined, HomeOutlined, EnvironmentOutlined, SafetyOutlined, ShopOutlined, AppstoreOutlined, ToolOutlined, ForkOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../Components/Footer';
import Header from './component/header';
import { Headset } from 'lucide-react';
export default function PropertyDetails() {
  const [currentReviews] = useState([
    { id: 1, name: "Sarah Johnson", date: "Jan 15, 2024", rating: "⭐⭐⭐⭐⭐", review: "Absolutely love this property! The amenities are top-notch and the staff is incredibly helpful." ,  img: "../public/profile_image/team-2.jpg" },
    { id: 2, name: "Michael Chen", date: "Jan 14, 2024", rating: "⭐⭐⭐⭐", review: "Great location and well-maintained property. The only minor issue was the parking situation during peak hours.", img: "../public/profile_image/team-3.jpg"},
    { id: 3, name: "Sarah Johnson", date: "Jan 15, 2024", rating: "⭐⭐⭐⭐⭐", review: "Absolutely love this property! The amenities are top-notch and the staff is incredibly helpful.", img : "../public/profile_image/team-4.jpg" },

  ]);
  const messagesData = [
    { id: 1, name: "Sarah Johnson", propertyId: "P.307", email: "sarahjohnson@gmail.com", contact: "1236547890", message: "Are there any restrictions on lease agreements?" },
    { id: 2, name: "Michael Brown", propertyId: "P.309", email: "michaelbrown@gmail.com", contact: "9874563210", message: "Are there any restrictions on lease agreements?" },
    { id: 3, name: "Emma Davis", propertyId: "P.310", email: "emmadavis@gmail.com", contact: "7410258963", message: "What documents are required for booking?" },
  ];
  return (
    <div>
      <Header/>
    <div className='bg-gray-50 p-7'>
      
  
    <div className="max-w-7xl mx-auto pt-4  mb-6 mt-6">
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6 pb-4">
      {/* Left Section: Title & Availability */}
      <div>
      <h2 className="text-3xl !font-bold">Morden Apartment</h2>
        <div className="mt-2 flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full font-medium w-fit">
          <CheckCircleFilled className="text-green-500 text-xs" /> Available
        </div>
      </div>

      {/* Right Section: Ratings & Actions */}
      <div className="flex items-center gap-6 text-gray-700">
        {/* Ratings */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-black">4.8</span>
          <span className="text-yellow-500 flex">{[...Array(5)].map((_, i) => <StarFilled  key={i} />)}</span>
          <span className="text-gray-500 text-sm">(28 reviews)</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-8">
          {/* <button className="text-black hover:text-gray-600 text-sm flex items-center gap-1 cursor-pointer">
          <EditOutlined /> Edit
          </button> */}
          <button className="!text-red-500 hover:!text-red-700 text-sm flex items-center gap-1 cursor-pointer">
          <DeleteOutlined/>
</button>
        </div>
      </div>
    </div>

      {/* Image Gallery */}
      <div className="grid gap-4">
        <img src="../Properties_image/iflat4.jpg" className="w-full rounded-lg" alt="Main" />
        <div className="grid grid-cols-4 gap-2">
          <img src="../Properties_image/iflat4.jpg" className="rounded-lg" alt="Thumb 1" />
          <img src="../Properties_image/iflat4.jpg" className="rounded-lg" alt="Thumb 2" />
          <img src="../Properties_image/iflat4.jpg" className="rounded-lg" alt="Thumb 3" />
          <img src="../Properties_image/iflat4.jpg" className="rounded-lg" alt="Thumb 4" />
        </div>
      </div>

      {/* About Section */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
  <h2 className="text-2xl font-semibold" style={{ fontWeight: '700' }}>
    About Property
  </h2>
  <p className="text-gray-700 leading-relaxed m-0">
  Experience modern living in this stunning rental apartment, offering breathtaking city views and premium amenities. Designed for luxury and convenience, this home features 2 spacious bedrooms, a stylish bathroom with modern fixtures, and a fully equipped kitchen.
</p>

</div>


      {/* Price Section */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-sm text-3xl font-bold text-black-300">
        ₹2500 <br></br><span className="text-lg font-normal text-gray-600">per month</span>
      </div>

      {/* Property Details */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-4" style={{ fontWeight: '700' }}>Property Details</h3>
        <div className="grid grid-cols-3 gap-6 text-gray-700 text-lg">
          <div className="flex items-center gap-3"><AppstoreOutlined className="!text-blue-600 text-2xl" /> <div><span>75 mp</span> <br /><span className="text-sm text-gray-500">Square Footage</span></div></div>
          <div className="flex items-center gap-3"><EnvironmentOutlined className="!text-blue-600 text-2xl" /> <div><span>Sector 1, București</span> <br /><span className="text-sm text-gray-500">Address</span></div></div>
          <div className="flex items-center gap-3"><HomeOutlined className="!text-blue-600 text-2xl" /> <div><span>Apartment</span> <br /><span className="text-sm text-gray-500">Property Type</span></div></div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-4" style={{ fontWeight: '700' }}>Specifications</h3>
        <div className="grid grid-cols-2 gap-6 text-gray-700 text-lg">
          <div className="flex items-center gap-3"><HomeOutlined className="!text-blue-600 text-2xl" /><div><span className="font-bold">2 Bedrooms</span> <br /><span className="text-sm text-gray-500">Spacious rooms</span></div></div>
          <div className="flex items-center gap-3"> <ToolOutlined className="!text-blue-600 text-2xl" /><div><span className="font-bold">1 Bathroom</span> <br /><span className="text-sm text-gray-500">Modern fixtures</span></div></div>
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-4" style={{ fontWeight: '700' }}>Amenities</h3>
        <div className="grid grid-cols-4 gap-6 text-gray-700 text-lg">
  <div className="flex items-center gap-3 "><WifiOutlined className="text-2xl !text-blue-600" /> <span>High-speed WiFi</span></div>
  <div className="flex items-center gap-3"><CarOutlined className="text-2xl !text-blue-600" /> <span>Parking Space</span></div>
  <div className="flex items-center gap-3"><ToolOutlined className="text-2xl !text-blue-600" /> <span>Fitness Center</span></div>
  <div className="flex items-center gap-3"><DesktopOutlined className="text-2xl !text-blue-600" /> <span>Smart TV</span></div>
  <div className="flex items-center gap-3"><ShopOutlined className="text-2xl !text-blue-600" /> <span>Swimming Pool</span></div>
  <div className="flex items-center gap-3"><HomeOutlined className="text-2xl !text-blue-600" /> <span>Elevator</span></div>
  <div className="flex items-center gap-3"><SafetyOutlined className="text-2xl !text-blue-600" /> <span>Laundry</span></div>
  <div className="flex items-center gap-3"><ForkOutlined className="text-2xl !text-blue-600" /> <span>Kitchen</span></div>
</div>
      </div>

      {/* Reviews Section */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-bold" style={{ fontWeight: '700' }}>Reviews For Modern Apartment</h2>
        </div>
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4 ">
        
        <div className="overflow-x-auto text-sm">
          <table className="min-w-full ">
           
            <tbody>
              {currentReviews.length > 0 ? (
                currentReviews.map((review) => (
                  <tr key={review.id} className="even:bg-white">
                  

<td className="p-4 flex items-center space-x-3">
                    <img src={review.img} alt="Profile" className="h-10 w-10 rounded-full border" />
                    <span className="font-semibold">{review.name}</span>
                  </td>                    <td className="p-3 ">{review.date}</td>
                    <td className="p-3 ">{review.rating}</td>
                    <td className="p-3 ">{review.review}</td>
                    <td className="p-3 text-red-500">
 <button className="!text-red-600 cursor-pointer hover:text-red-800 transition">
                       {/* <DeleteOutlined style={{ fontSize: "18px" }} /> */}
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
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold" style={{ fontWeight: '700' }}>Inquiries For Modern Apartment</h2>
      


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
                                    <th className="p-3">Email Address</th>
                                    <th className="p-3">Contact No</th>
                                    <th className="p-3">Message</th>
                                    {/* <th className="p-3">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
  {messagesData.map((msg, index) => (
    <tr key={index} className="even:bg-white">
      <td className="p-3">{msg.name}</td>
      <td className="p-3">{msg.email}</td>
      <td className="p-3">{msg.contact}</td>
      <td className="p-3">{msg.message}</td>
      {/* <td className="p-3 text-red-500">
 <button className="!text-red-600 cursor-pointer hover:text-red-800 transition">
                       <DeleteOutlined style={{ fontSize: "18px" }} />
                     </button>
</td> */}
    </tr>
  ))}
</tbody>

                        </table>
                    </div>
                </div>

      {/* View Button */}
      </div>
      
    </div>
    <Footer/>
    </div>
  );
}