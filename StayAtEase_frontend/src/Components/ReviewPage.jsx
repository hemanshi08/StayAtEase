// import React from "react";
// import { Rate } from "antd";

// const Reviews = ({ reviews = [], rating }) => {

  
//   return (
//     <div className="mt-6">
//       <h2 className="text-2xl font-semibold">Reviews</h2>
//       <p className="text-yellow-500 text-lg font-bold flex items-center">
//         {rating} <Rate allowHalf disabled defaultValue={rating} className="ml-2" /> ({reviews.length} reviews)
//       </p>

//       {/* Scrollable Review Container */}
//       <div className="mt-4 max-h-88 overflow-y-auto pr-2">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {reviews.map((review, index) => (
//             <div
//               key={index}
//               className="bg-gray-100 p-4 rounded-lg w-full min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex flex-col justify-between"
//             >
//               {/* Review Header */}
//               <div>
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-semibold">{review.name}</h3>
//                   <p className="text-sm text-gray-500">{review.date}</p>
//                 </div>
//                 <Rate allowHalf disabled defaultValue={review.rating} className="mt-1" />
//               </div>

//               {/* Full Review Text */}
//               <p className="mt-2 text-gray-700" style={{ marginTop: "12px" }}>
//                 {review.comment}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Reviews;


import React from "react";
import { Rate } from "antd";

const Reviews = ({ reviews = [], rating }) => {
  console.log("Reviews received in Reviews component:", reviews); // Debugging
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      <p className="text-yellow-500 text-lg font-bold flex items-center">
        {rating} <Rate allowHalf disabled defaultValue={rating} className="ml-2" /> ({reviews.length} reviews)
      </p>
      <div className="mt-4 max-h-88 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-500">{review.date}</p>
              <Rate allowHalf disabled defaultValue={review.rating} className="mt-1" />
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;