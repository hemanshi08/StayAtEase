import React, { useState } from "react";
import { Card, Typography, Rate } from "antd";
import { HeartFilled, HeartOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const PropertyCard = ({ image, title, location, beds, baths, sqft, rating, price }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Card
      hoverable
      className="rounded-2xl shadow-lg overflow-hidden"
      cover={<img alt={title} src={image} className="h-48 w-full object-cover" />}
    >
      <div className="flex justify-between items-center">
        <Title level={4} className="m-0">{title}</Title>
        <div onClick={() => setLiked(!liked)} className="cursor-pointer text-xl">
          {liked ? <HeartFilled className="text-red-500" style={{ color: 'red' }}/> : <HeartOutlined />}
        </div>
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
      <Text className="block mt-2 text-lg font-bold text-blue-600">
        ₹{price} /month
      </Text>
    </Card>
  );
};

export default PropertyCard;
