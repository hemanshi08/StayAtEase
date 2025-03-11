// import React, { useState } from "react";
// import { Card, Typography, Rate } from "antd";
// import { HeartFilled, HeartOutlined, EnvironmentOutlined } from "@ant-design/icons";

// const { Title, Text } = Typography;

// const PropertyCard = ({ image, title, location, beds, baths, sqft, rating, price }) => {
//   const [liked, setLiked] = useState(false);

//   return (
//     <Card
//       hoverable
//       className="rounded-2xl shadow-lg overflow-hidden"
//       cover={<img alt={title} src={image} className="h-48 w-full object-cover" />}
//     >
//       <div className="flex justify-between items-center">
//         <Title level={4} className="m-0">{title}</Title>
//         <div onClick={() => setLiked(!liked)} className="cursor-pointer text-xl">
//           {liked ? <HeartFilled className="text-red-500" style={{ color: 'red' }}/> : <HeartOutlined />}
//         </div>
//       </div>
//       <Text type="secondary" className="flex items-center gap-1 text-gray-500">
//         <EnvironmentOutlined /> {location}
//       </Text>
//       <div className="flex gap-4 mt-2">
//         <Text><b>{beds}</b> beds</Text>
//         <Text><b>{baths}</b> baths</Text>
//         <Text><b>{sqft}</b> sqft</Text>
//       </div>
//       <Rate disabled allowHalf defaultValue={rating} className="mt-2" />
//       <Text className="block mt-2 text-lg font-bold text-blue-600">
//         ₹{price} /month
//       </Text>
//     </Card>
//   );
// };

// export default PropertyCard;

import React, { useState } from "react";
import { Card, Typography, Rate } from "antd";
import { HeartFilled, HeartOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const PropertyCard = ({ id, image, title, location, beds, baths, sqft, rating, price, showDetailsButton = false , defaultLiked = false  }) => {
  const [liked, setLiked] = useState(defaultLiked);
  const navigate = useNavigate();
  

  const handleViewDetails = () => {
    navigate(`/property/${id}`, { state: { image, title, location, beds, baths, sqft, rating, price } });
  };

  return (
    <Card
    hoverable
    className="rounded-2xl shadow-lg overflow-hidden relative"
    cover={
      <div className="relative">
        <img alt={title} src={image} className="h-48 w-full object-cover" />
        {/* Heart Icon positioned correctly on top-right without affecting the image */}
        <div 
  onClick={() => setLiked(!liked)} 
  className="absolute top-2 right-2 cursor-pointer bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-xl"
>
  {liked ? <HeartFilled className="text-red-500" style={{color:"red"}} /> : <HeartOutlined />}
</div>
      </div>
    }
  >
    <div className="flex justify-between items-center">
        <Title level={4} className="m-0">{title}</Title>
      </div>
      <Text type="secondary" className="flex items-center gap-1 text-gray-500">
        <EnvironmentOutlined /> {location}
      </Text>
      <div className="flex gap-4 mt-2">
        <Text><b>{beds}</b> beds</Text>
        <Text><b>{baths}</b> baths</Text>
        <Text><b>{sqft}</b> sqft</Text>
      </div>
      <Rate disabled allowHalf defaultValue={rating} className="mt-2" />
      <Text className="block mt-2 mb-3 text-lg font-bold text-blue-600">
        ₹{price} /month
      </Text>

      {/* Conditionally render View Details Button */}
      {showDetailsButton && (
        <span>
        <button 
          onClick={handleViewDetails} 
          className="mt-2 w-full bg-blue-600 !text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          View Details   
        </button>
        </span>
      )}
    </Card>
  );
};

export default PropertyCard;


