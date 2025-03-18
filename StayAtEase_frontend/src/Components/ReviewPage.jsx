import React from "react";
import { Rate, Avatar } from "antd";

const Reviews = ({ reviews = [], rating }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      <p className="font-bold flex items-center">
  <span className="text-3xl mr-1.5">{rating}</span>
  <Rate allowHalf disabled defaultValue={rating} className="ml-3 text-yellow-500 text-xl" />
  <span className="ml-3  text-gray-600">({reviews.length} reviews)</span>
</p>

      {/* Scrollable Review Container */}
      <div className="mt-4 max-h-88 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg w-full min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex flex-col justify-between"
            >
              {/* Review Header */}
              <div>
                <div className="flex gap-3 ">
                  {/* Profile Picture */}
                  <Avatar src={review.image} size={40} className="border border-gray-300 " />

                  {/* Name and Date */}
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>

                <Rate allowHalf disabled defaultValue={review.rating} className="mt-2 " />
              </div>

              {/* Full Review Text */}
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
