import React, { useState } from "react";
import { Modal, Button, Carousel, Rate, Input, message , Form} from "antd";
import { PhoneOutlined, SendOutlined, EditOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Reviews from "../Components/ReviewPage";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const PropertyDetails = () => {
  const location = useLocation();
  const {
    title,
    location: propertyLocation,
    price,
    beds,
    baths,
    sqft,
    rating = 0, // Default to 0 if undefined
    reviews = [], // Default to empty array to avoid undefined errors
    image
  } = location.state || {};

  const images = [
    image,
    "../Properties_image/flat5.jpg",
    "../Properties_image/villa3.jpg",
    "../Properties_image/iflat6.jpg",
    "../Properties_image/i flat7.jpg",
  ];

  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reviewModal, setReviewModal] = useState(false);
  const [thankYouModal, setThankYouModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [form] = Form.useForm(); // Form instance to reset fields
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { TextArea } = Input;

  const openSlider = (index) => {
    setSelectedIndex(index);
    setVisible(true);
  };

  const closeModal = () => {
    // setSelectedIndex(0);
    // setVisible(false);
    setVisible(false);
    setTimeout(() => setSelectedIndex(0), 100);
    
  };

  const handleReviewSubmit = () => {
    if (userRating === 0 || reviewText.trim() === "") {
      message.error("Please provide a rating and review.");
      return;
    }

     // Simulate API call (Replace with actual API logic)
  setReviewModal(false);
  setUserRating(0);  // Reset Rating
  setReviewText(""); // Clear Review Text

  setTimeout(() => {
    setThankYouModal(true);
  }, 500);
};

// Open Modal
const showModal = () => {
  setIsModalVisible(true);
};

// Close Modal and Reset Form
const handleCancel = () => {
  form.resetFields(); // Clears the form fields
  setIsModalVisible(false);
};

// Handle Form Submission
const handleSubmit = (values) => {
  console.log("Inquiry Data:", values);
  form.resetFields(); // Clear fields after submit
  setIsModalVisible(false);
};

  return (
   
 
    <div className="max-w-8xl mx-auto px-10 py-8">
      {/* IMAGE GALLERY */}
      <div className="grid grid-cols-3 gap-2">
        {/* Big Image */}
        <img
          src={images[0]}
          alt="Main"
          className="col-span-2 h-120 w-full object-cover rounded-lg cursor-pointer"
          onClick={() => openSlider(0)}
        />

        {/* Small Images */}
        <div className="grid grid-rows-2 gap-2">
          {images.slice(1, 2).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="h-58 w-full object-cover rounded-lg cursor-pointer"
              onClick={() => openSlider(index + 1)}
            />
          ))}
          
          {/* More Images Section */}
          {images.length > 2 && (
            <div
              className="relative h-59 w-full cursor-pointer rounded-lg overflow-hidden"
              onClick={() => openSlider(2)}
            >
              <img 
                src={images[2]} 
                alt="More Images"
                className="h-full w-full object-cover brightness-50" 
              />
              <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xl">
                +{images.length - 2} More
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL FOR IMAGE SLIDER */}
      <Modal
        open={visible}
        footer={null}
        onCancel={closeModal}
        width={700}
        className="custom-modal"
      >
        <Carousel
        key={visible}
          initialSlide={selectedIndex}
          dots={{ className: "custom-carousel-dots" }}
          arrows
        >
          {images.map((img, index) => (
            <div key={index} className="flex justify-center items-center">
              <img src={img} alt={`Slide ${index}`} className="w-full max-h-[600px] object-cover rounded-lg shadow-lg" />
            </div>
          ))}
        </Carousel>
      </Modal>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
      
        {/* Left Section - Property Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500 text-xl">{propertyLocation}</p>
          <p className="text-blue-600 text-2xl font-bold">₹{price} / month</p>

          <div className="mt-4 text-gray-700">
            <p>🛏️ {beds} beds &nbsp;&nbsp; 🚿 {baths} baths &nbsp;&nbsp; 📏 {sqft} sq ft</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Features & Amenities</h2>
            <div className="grid grid-cols-2 gap-3 text-gray-600 mt-5">
              <p>📶 High-speed WiFi</p>
              <p>🚗 Parking Space</p>
              <p>🏊 Swimming Pool</p>
              <p>🏋️ Fitness Center</p>
              <p>🛗 Elevator</p>
              <p>📺 Smart TV</p>
              <p>🔒 24/7 Security</p>
              <p>🍽️ Kitchen</p>
              <p>🧺 Laundry</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">About this property</h2>
            <p className="text-gray-600 tracking-wider leading-relaxed">
              This stunning apartment offers modern living at its finest. With breathtaking city views, premium amenities,
              and a prime location, it’s perfect for those seeking luxury and convenience.
            </p>
          </div>
        </div>

        {/* Right Section - Agent Info */}
        <div className="mt-20">
          <div className="p-6 bg-gray-100 rounded-lg">
            <div className="flex">
              <img
                src="../profile_image/team-3.jpg"
                alt="Agent"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div className="flex flex-col">
                <span className="font-semibold mt-1">Michael Anderson</span>
                <span className="text-gray-500 text-sm mt-1">Senior Property Consultant</span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 mt-6">
              <Button type="primary" icon={<PhoneOutlined />} className="w-full">
                Call Agent
              </Button>
              <Button icon={<SendOutlined />} className="w-full mt-2" onClick={showModal}>
                Send Inquiry
              </Button>
              <Button type="link" icon={<EditOutlined />} className="w-full mt-2" onClick={() => setReviewModal(true)}>
                Write Review
              </Button>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <h2 className="mt-6 flex text-lg font-semibold">
                <ClockCircleOutlined className="mr-2" /> Available Hours
              </h2>
              <span className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</span>
              <span className="text-gray-600">Sat: 10:00 AM - 4:00 PM</span>
            </div>
          </div>
        </div>
      </div>

{/* REVIEW MODAL */}
<Modal
        open={reviewModal}
       onCancel={() => {
    setReviewModal(false);
    setUserRating(0);  // Reset Rating
    setReviewText("");  // Clear Review Text
  }}
        footer={null}
        centered
      >
        <h2 className="text-2xl font-bold text-center mb-4">Write Your Review</h2>
        <div className="text-center mb-4 ">
          <Rate allowHalf value={userRating} onChange={setUserRating} style={{ fontSize: "32px" }}/>
        </div>
        <TextArea
          rows={4}
          placeholder="Share your experience..."
          className="mt-4" style={{marginBottom:"20px"}}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)} 
        />
        <Button type="primary" className="w-full mt-4 " onClick={handleReviewSubmit}>
          Submit Review
        </Button>
      </Modal>

      {/* THANK YOU MODAL */}
      <Modal open={thankYouModal} onCancel={() => setThankYouModal(false)} footer={null} centered>
        <h2 className="text-2xl font-bold text-center">Thank You!</h2>
        <p className="text-center text-gray-500">Your review has been submitted.</p>
      </Modal>


      {/* Modal for Inquiry Form */}
      <Modal
        title="Send us an inquiry"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Remove default footer buttons
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item
            label="Contact No"
            name="contact"
            rules={[{ required: true, message: "Please enter your contact number" }]}
          >
            <Input placeholder="Enter your contact no" />
          </Form.Item>

          <Form.Item
            label="Your Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea placeholder="Enter your message" rows={4} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send Inquiry
            </Button>
          </Form.Item>
        </Form>
      </Modal>


      {/* Reviews Section */}
      <Reviews rating={rating} reviews={reviews} />
    </div>
   

  );
};

export default PropertyDetails;


