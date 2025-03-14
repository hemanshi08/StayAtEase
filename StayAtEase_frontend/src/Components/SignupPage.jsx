import { Modal, Input, Button, Checkbox, Radio } from "antd";
import { MailOutlined, LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function SignupModal({ isOpen, handleClose }) {
  const [userType, setUserType] = useState("tenant");

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      centered
      width={650}
    >
      <h2 className="text-2xl font-bold text-center">Create your account</h2>
      <p className="text-gray-500 text-center mb-4">
        Join our community of tenants and property owners
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Phone Number */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">Phone Number *</label>
          <Input size="large" placeholder="Enter your phone number" prefix={<MobileOutlined />} />
        </div>

        {/* Email Address */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">Email Address (Optional)</label>
          <Input size="large" placeholder="your@email.com" prefix={<MailOutlined />} />
        </div>

        {/* Verification Code */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Enter Verification Code</label>
          <div className="flex justify-center gap-3 sm:gap-4">
            {[...Array(6)].map((_, i) => (
              <Input key={i} maxLength={1} className="w-10 sm:w-12 text-center" />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            We've sent a code to your phone <span className="text-blue-500 cursor-pointer">Resend Code</span>
          </p>
        </div>

        {/* Full Name */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Full Name *</label>
          <Input size="large" placeholder="Enter your full name" prefix={<UserOutlined />} />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">Password *</label>
          <Input.Password size="large" placeholder="Create a password" prefix={<LockOutlined />} />
        </div>

        {/* Confirm Password */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-1">Confirm Password *</label>
          <Input.Password size="large" placeholder="Confirm your password" prefix={<LockOutlined />} />
        </div>

        {/* User Type Selection */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">I am a... *</label>
          <Radio.Group value={userType} onChange={(e) => setUserType(e.target.value)} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Radio value="tenant"> 🏠 Tenant</Radio>
            <Radio value="owner"> 🏡 Room Owner</Radio>
          </Radio.Group>
        </div>

        {/* Terms and Conditions */}
        <div className="col-span-1 md:col-span-2 flex items-start gap-2">
          <Checkbox />
          <span className="text-sm text-gray-600">
            I agree to the <span className="text-blue-600 cursor-pointer">Terms of Service</span> and <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
          </span>
        </div>
      </div>

      {/* Signup Button */}
      <Button type="primary" className="bg-blue-600 w-full mt-6">
        Create Account
      </Button>
    </Modal>
  );
}