import { Modal, Input, Button, message } from "antd";
import { MobileOutlined, LockOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

export default function ForgotPasswordModal({ isOpen, handleClose }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ Error states (initially hidden)
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [showOtpError, setShowOtpError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);

  const phoneRegex = /^\d{10}$/;
  const otpRegex = /^\d{6}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPhone("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPhoneError(false);
      setShowOtpError(false);
      setShowPasswordError(false);
      setShowConfirmPasswordError(false);
    }
  }, [isOpen]);

  const handleSendOTP = () => {
    if (!phone.match(phoneRegex)) {
      setShowPhoneError(true); // ✅ Show error message
      message.error("Please enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      message.success("OTP sent successfully!");
      setStep(2);
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (!otp.match(otpRegex)) {
      setShowOtpError(true); // ✅ Show error message
      message.error("Please enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      message.success("OTP verified successfully!");
      setStep(3);
      setLoading(false);
    }, 1000);
  };

  const handleUpdatePassword = () => {
    let hasError = false;
    
    if (!newPassword.match(passwordRegex)) {
      setShowPasswordError(true);
      message.error("Password must have at least 6 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
      hasError = true;
    }
    if (newPassword !== confirmPassword) {
      setShowConfirmPasswordError(true);
      message.error("Passwords do not match!");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    setTimeout(() => {
      message.success("Password updated successfully!");
      setLoading(false);
      handleClose();
    }, 1000);
  };

  return (
    <Modal
      title={<div className="text-2xl font-semibold text-center">Forgot Password</div>}
      open={isOpen}
      footer={null}
      onCancel={handleClose}
      centered
      width={420}
      destroyOnClose
    >
      {step === 1 && (
        <>
          <p className="text-center text-gray-600 mb-4">Enter your phone number to receive an OTP</p>
          <Input
            size="large"
            placeholder="Enter your phone number"
            prefix={<MobileOutlined />}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setShowPhoneError(false); // ✅ Hide error on change
            }}
            className="mb-2"
          />
          {showPhoneError && <p className="text-red-500 text-sm mb-2">Invalid phone number</p>}
          <Button type="primary" block loading={loading} onClick={handleSendOTP}>
            Send OTP
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-center text-gray-600 mb-4">Enter the OTP sent to your phone</p>
          <Input
            size="large"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setShowOtpError(false); // ✅ Hide error on change
            }}
            className="mb-2"
          />
          {showOtpError && <p className="text-red-500 text-sm mb-2">Invalid OTP</p>}
          <Button type="primary" block loading={loading} onClick={handleVerifyOTP}>
            Verify OTP
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <p className="text-center text-gray-600 mb-4">Enter your new password</p>
          <Input.Password
            size="large"
            placeholder="New password"
            prefix={<LockOutlined />}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setShowPasswordError(false); // ✅ Hide error on change
            }}
            className="mb-2"
          />
          {showPasswordError && (
            <p className="text-red-500 text-sm mb-2">
              Password must have at least 6 characters, one uppercase letter, one lowercase letter, one number, and one special character.
            </p>
          )}
          <Input.Password
            size="large"
            placeholder="Confirm password"
            prefix={<LockOutlined />}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setShowConfirmPasswordError(false); // ✅ Hide error on change
            }}
            className="mb-2"
          />
          {showConfirmPasswordError && <p className="text-red-500 text-sm mb-2">Passwords do not match</p>}
          <Button type="primary" block loading={loading} onClick={handleUpdatePassword}>
            Update Password
          </Button>
        </>
      )}
    </Modal>
  );
}
