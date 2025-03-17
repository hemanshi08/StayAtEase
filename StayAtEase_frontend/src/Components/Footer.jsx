
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          
          {/* Branding with Logo */}
          <div>
          <div className="flex items-center space-x-2.5 space-y-2">
            <img src="/logo/StayAtEase.png" alt="StayAtEase Logo" className="w-9 h-9 rounded-full bg-cover" /> 
            <h2 className="text-xl font-bold">StayAtEase</h2> 
            </div>
            <p className="text-gray-400 mt-2 leading-relaxed tracking-wide ">
              StayAtEase is your go-to rental platform, connecting tenants and property owners with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3> <hr className="w-25 h-2 p-1"/>
            <ul className="mt-2 space-y-2 leading-relaxed tracking-wide">
              <li><Link to="/home" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
              <li><Link to="/properties" className="text-gray-400 hover:text-white transition duration-300">Listings</Link></li>
              <li><Link to="/wishlist" className="text-gray-400 hover:text-white transition duration-300">Wishlist</Link></li>
            </ul>
          </div>

          {/* Support & Policies */}
          <div>
            <h3 className="text-lg font-semibold">Support & Policies</h3> <hr className="w-38 h-2 p-1"/>
            <ul className="mt-2 space-y-2 leading-relaxed tracking-wide">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <FacebookOutlined />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <TwitterOutlined />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <InstagramOutlined />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">
                <LinkedinOutlined />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
          © 2025 StayAtEase. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
