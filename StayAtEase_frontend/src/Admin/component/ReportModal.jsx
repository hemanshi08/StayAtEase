import React from "react";
import { X } from "lucide-react"; 

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Blurred Background Effect */}
      <div className="absolute inset-0 backdrop-blur-md"></div>

      {/* Modal Content */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 z-50">
        {/* Close Icon (Top-Right) */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <h3 className="text-xl font-bold mb-2">Write Report</h3>
        <p className="text-gray-500">Enter your description:</p>

        {/* Textarea Input */}
        <textarea
          className="border border-gray-300 w-full mt-2 p-2 rounded-md"
          rows="4"
          placeholder="Enter here..."
        ></textarea>

        {/* Full-Width Submit Button */}
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
