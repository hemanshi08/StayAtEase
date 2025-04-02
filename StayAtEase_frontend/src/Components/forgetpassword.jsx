import { Modal, Input, Button, message } from "antd";
import { MobileOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function ForgotPasswordModal({ isOpen, handleClose }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (!phone.match(/^\d{10}$/)) {
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
    if (otp.length !== 6) {
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
    if (newPassword.length < 6) {
      message.error("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
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
            onChange={(e) => setPhone(e.target.value)}
            className="mb-4"
          />
          <Button 
            type="primary" 
            block 
            loading={loading} 
            onClick={handleSendOTP} 
            disabled={!phone}
          >
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
            onChange={(e) => setOtp(e.target.value)}
            className="mb-4"
          />
          <Button 
            type="primary" 
            block 
            loading={loading} 
            onClick={handleVerifyOTP} 
            disabled={!otp}
          >
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
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-4"
          />
          <Input.Password
            size="large"
            placeholder="Confirm password"
            prefix={<LockOutlined />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4"
          />
          <Button 
            type="primary" 
            block 
            loading={loading} 
            onClick={handleUpdatePassword} 
            disabled={!newPassword || !confirmPassword}
          >
            Update Password
          </Button>
        </>
      )}
    </Modal>
  );
}
