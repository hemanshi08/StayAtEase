import { Modal, Input, Button } from "antd";
import { MobileOutlined, LockOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react"; // Import useEffect
import SignupModal from "./SignupPage";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ForgotPasswordModal from "./forgetpassword";

export default function LoginModal({ isModalOpen, handleCancel }) {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phone: "", password: "" }); // Validation errors
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!isModalOpen) {
      // Reset fields when modal closes
      setPhone("");
      setPassword("");
      setErrors({ phone: "", password: "" });
    }
  }, [isModalOpen]); // Runs when modal opens/closes

  const validateForm = () => {
    let valid = true;
    let newErrors = { phone: "", password: "" };

    // Phone number validation
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
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

  const handleLogin = () => {
    if (!validateForm()) return; // Stop if validation fails

    if (phone === "9080706050" && password === "111") {
      navigate("/Dashboard"); 
    } else if (phone === "8963254174" && password === "123") {
      navigate("/RoomOwnerDashboard"); 
    } else {
      alert("Invalid phone number or password");
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
      width={420} // Decrease width
      style={{ minHeight: "100px" }} // Increase height
    >
      <p className="text-center text-gray-600">Log in to your account</p>

      <div className="mt-4">
        <label className="block font-semibold">Phone Number</label>
        <Input
          size="large"
          placeholder="Enter your phone number"
          prefix={<MobileOutlined />}
          className="mt-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>} {/* Validation Message */}
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
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>} {/* Validation Message */}
      </div>

      <Button type="primary" className="bg-blue-600 w-full " style={{marginTop:"16px"}} onClick={handleLogin}>
        Log In
      </Button>
      <div 
          className="text-center text-red-500 mt-2 cursor-pointer mb-3"
          onClick={() => setIsForgotPasswordOpen(true)}
        >
          Forgot password?
        </div>
      <p className="text-center mt-4 text-gray-600 " style={{marginTop:"16px"}}>
        New to our platform? <span className="text-blue-600 cursor-pointer" onClick={() => setIsSignupOpen(true)}>Create an account</span>
      </p>
    </Modal>
   {/* Signup Modal */}
   <SignupModal isOpen={isSignupOpen} handleClose={() => setIsSignupOpen(false)} />
   <ForgotPasswordModal 
  isOpen={isForgotPasswordOpen} 
  handleClose={() => setIsForgotPasswordOpen(false)} 
/>
   </>
 );
}