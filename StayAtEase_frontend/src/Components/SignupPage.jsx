import { Modal, Input, Button, Checkbox, Radio, message } from "antd";
import { MailOutlined, LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function SignupModal({ isOpen, handleClose }) {
  const [userType, setUserType] = useState("tenant");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setPhone("");
    setEmail("");
    setVerificationCode(["", "", "", "", "", ""]);
    setFullName("");
    setPassword("");
    setConfirmPassword("");
    setUserType("tenant");
    setIsChecked(false);
    setErrors({});
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!userType) {
      newErrors.userType = "Please select a user type";
      valid = false;
    }

    if (!isChecked) {
      newErrors.isChecked = "You must agree to the Terms and Conditions";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const userData = {
        fullName,
        email,
        phone,
        password,
        userType,
      };

      const resp = await axiosInstance.post("/users/register", userData);

      message.success("Account created successfully!");
      alert("Account created successfully! You can now log in.");
      handleClose();
      resetForm();
    } catch (error) {
      if (error.response?.data?.error) {
        message.error(`Signup failed: ${error.response.data.error}`);
      } else {
        message.error("Signup failed: An unexpected error occurred.");
      }
    }
  };

  return (
    <Modal open={isOpen} onCancel={handleClose} footer={null} centered width={650}>
      <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
      <p className="text-gray-500 text-center mb-6">Join our community of tenants and property owners</p>

      <div className="space-y-4">
        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
          <Input
            size="large"
            placeholder="Enter your phone number"
            prefix={<MobileOutlined />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
          <Input
            size="large"
            placeholder="your@email.com"
            prefix={<MailOutlined />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
          <Input
            size="large"
            placeholder="Enter your full name"
            prefix={<UserOutlined />}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password *</label>
            <Input.Password
              size="large"
              placeholder="Create a password"
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Confirm Password *</label>
            <Input.Password
              size="large"
              placeholder="Confirm your password"
              prefix={<LockOutlined />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* User Type Selection */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">I am a... *</label>
          <Radio.Group
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="flex flex-col sm:flex-row gap-2 sm:gap-4"
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="Property_Owner">Property Owner</Radio>
          </Radio.Group>
          {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType}</p>}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2">
          <Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
          <span className="text-sm text-gray-600 mb-4">
            I agree to the{" "}
            <span className="text-blue-600 cursor-pointer">Terms of Service</span> and{" "}
            <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
          </span>
        </div>
        {errors.isChecked && <p className="text-red-500 text-sm mt-1">{errors.isChecked}</p>}
      </div>

      <Button type="primary" className="bg-blue-600 w-full mt-6" onClick={handleSignup}>
        Create Account
      </Button>
    </Modal>
  );
}
