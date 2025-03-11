import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Branding */}
          <div>
            <h2 className="text-xl font-bold">StayAtEase</h2>
            <p className="text-gray-400 mt-2 leading-relaxed tracking-wide ">
              StayAtEase is your go-to rental platform, connecting tenants and property owners with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2 leading-relaxed tracking-wide">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Listings</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Wishlist</a></li>
            </ul>
          </div>

          {/* Support & Policies */}
          <div>
            <h3 className="text-lg font-semibold">Support & Policies</h3>
            <ul className="mt-2 space-y-2 leading-relaxed tracking-wide">
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-2 leading-relaxed tracking-wide">
            <a href="#"><FacebookOutlined className="text-gray-400 hover:text-white text-2xl" /></a>
<a href="#"><TwitterOutlined className="text-gray-400 hover:text-white text-2xl" /></a>
<a href="#"><InstagramOutlined className="text-gray-400 hover:text-white text-2xl" /></a>
<a href="#"><LinkedinOutlined className="text-gray-400 hover:text-white text-2xl" /></a>

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
