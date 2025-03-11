import React from "react";
import { useLocation } from "react-router-dom";
import { Card, Typography, Rate } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const PropertyDetails = () => {
  const { state } = useLocation(); // Get property data passed from PropertyCard
  if (!state) return <h2 className="text-center mt-10">Property not found!</h2>;

  const { image, title, location, beds, baths, sqft, rating, price } = state;

  return (
    <div className="container mx-auto p-6">
      <Card
        className="max-w-3xl mx-auto shadow-lg rounded-2xl"
        cover={<img alt={title} src={image} className="h-96 w-full object-cover" />}
      >
        <Title level={2}>{title}</Title>
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
    </div>
  );
};

export default PropertyDetails;
