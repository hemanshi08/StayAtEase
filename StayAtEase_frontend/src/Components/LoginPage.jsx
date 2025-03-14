import { Modal, Input, Button } from "antd";
import { MobileOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import SignupModal from "./SignupPage";

export default function LoginModal({ isModalOpen, handleCancel }) {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
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
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Password</label>
        <Input.Password
          size="large"
          placeholder="Enter your password"
          prefix={<LockOutlined />}
          className="mt-2"
        />
      </div>

      <div className="text-center text-red-500 mt-2 cursor-pointer mb-3 ">
        Forgot password?
      </div>

      <Button type="primary" className="bg-blue-600 w-full mt-4 ">
        Log In
      </Button>

      <p className="text-center mt-4 text-gray-600 " style={{marginTop:"16px"}}>
        New to our platform? <span className="text-blue-600 cursor-pointer" onClick={() => setIsSignupOpen(true)}>Create an account</span>
      </p>
    </Modal>
   {/* Signup Modal */}
   <SignupModal isOpen={isSignupOpen} handleClose={() => setIsSignupOpen(false)} />
   </>
 );
}
