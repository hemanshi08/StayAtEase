import { Modal, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import SignupModal from "./SignupPage";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./forgetpassword";
import axiosInstance from "../api/axiosInstance";

export default function LoginModal({ isModalOpen, handleCancel }) {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isModalOpen) {
      setEmail("");
      setPassword("");
      setErrors({ email: "", password: "" });
    }
  }, [isModalOpen]);

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password
      });

      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        message.success("Login successful!");
        handleCancel();

        // Navigate based on user type
        if (response.data.user.userType === "admin") {
          navigate("/Dashboard");
        } else if (response.data.user.userType === "Property_Owner") {
          navigate("/RoomOwnerDashboard");
        } else if (response.data.user.userType === "tenant") {
          navigate("/");
        }
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.error || "Login failed");
      } else {
        message.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Modal
        title={
          <div className="text-3xl font-bold text-center">
            Welcome Back
          </div>
        }
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        centered
        width={420}
      >
        <p className="text-center text-gray-600">Log in to your account</p>

        <div className="mt-4">
          <label className="block font-semibold">Email</label>
          <Input
            size="large"
            placeholder="Enter your email address"
            prefix={<MailOutlined />}
            className="mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mt-4">
          <label className="block font-semibold">Password</label>
          <Input.Password
            size="large"
            placeholder="Enter your password"
            prefix={<LockOutlined />}
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="mt-4 text-right">
          <Button type="link" onClick={() => setIsForgotPasswordOpen(true)}>
            Forgot Password?
          </Button>
        </div>

        <Button
          type="primary"
          className="w-full mt-6 bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </Button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Button type="link" onClick={() => setIsSignupOpen(true)}>
            Sign up
          </Button>
        </div>
      </Modal>

      <SignupModal isOpen={isSignupOpen} handleClose={() => setIsSignupOpen(false)} />
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        handleClose={() => setIsForgotPasswordOpen(false)}
      />
    </>
  );
}