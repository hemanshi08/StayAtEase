import { Modal, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import SignupModal from "./SignupPage";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./forgetpassword";
import { useAuth } from "../context/AuthContext";

export default function LoginModal({ isModalOpen, handleCancel, onLoginSuccess }) {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccessMsg, setLoginSuccessMsg] = useState("");
  const navigate = useNavigate();
  const { login, error: authError } = useAuth();

  useEffect(() => {
    if (!isModalOpen) {
      setEmail("");
      setPassword("");
      setErrors({ email: "", password: "" });
      setLoginSuccessMsg("");
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

    setIsLoading(true);
    try {
      const userData = await login(email, password);
      message.success("Login successful!");
      setLoginSuccessMsg("Login successful! Redirecting...");

      // Delay navigation for better UX
      setTimeout(() => {
        handleCancel();

        if (onLoginSuccess) {
          onLoginSuccess();
        }

        if (userData.userType === "admin") {
          navigate("/Dashboard");
        } else if (userData.userType === "Property_Owner") {
          navigate("/RoomOwnerDashboard");
        } else if (userData.userType === "tenant") {
          navigate("/");
        }

        setLoginSuccessMsg("");
      }, 1500);
    } catch (error) {
      const errorMessage = error.message || "Login failed. Please try again.";
      message.error(errorMessage);
    } finally {
      setIsLoading(false);
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

        {authError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {authError}
          </div>
        )}

        {loginSuccessMsg && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center">
            {loginSuccessMsg}
          </div>
        )}

        <div className="mt-4">
          <label className="block font-semibold">Email</label>
          <Input
            size="large"
            placeholder="Enter your email address"
            prefix={<MailOutlined />}
            className="mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mt-4 mb-7">
          <label className="block font-semibold">Password</label>
          <Input.Password
            size="large"
            placeholder="Enter your password"
            prefix={<LockOutlined />}
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* <div className="mt-4 text-right">
          <Button type="link" onClick={() => setIsForgotPasswordOpen(true)} disabled={isLoading}>
            Forgot Password?
          </Button>
        </div> */}

        <Button
          type="primary"
          className="w-full mt-6 bg-blue-600"
          onClick={handleLogin}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Button type="link" onClick={() => setIsSignupOpen(true)} disabled={isLoading}>
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
