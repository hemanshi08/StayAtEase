import React from "react";

const reviews = [
  {
    id: 1,
    name: "John Smith",
    date: "Feb 10, 2024",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    review: "Amazing property with stunning views. Highly recommended!",
  },
  {
    id: 2,
    name: "Lisa Anderson",
    date: "Feb 8, 2024",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    review: "Great location and comfortable stay. Would visit again.",
  },
  {
    id: 3,
    name: "David Wilson",
    date: "Feb 7, 2024",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
    review: "Perfect getaway spot. Everything was exactly as described.",
  },
];

const LatestReviews = () => {
  return (
    <div className="bg-gray-100 py-3">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg !font-bold">Latest Reviews</h2>
          <a href="#" className="text-blue-500 text-sm font-semibold hover:underline">
            View All →
          </a>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow-md w-full">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={review.profilePic}
                alt={review.name}
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-gray-500 text-xs">{review.date}</p>
              </div>
            </div>

            {/* Star Ratings */}
            <div className="flex text-yellow-400 mb-1">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>

            <p className="text-gray-700 text-sm">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
