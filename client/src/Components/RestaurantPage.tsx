import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Restaurant, Review } from "../../../server/Types";
import RestaurantsApi from "../api/RestaurantsApi";
import AddReviewForm from "./AddReviewForm";
const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    RestaurantsApi.get(`/${restaurantId}/reviews`).then((response) => {
      setReviews(response.data.data);
    });
    RestaurantsApi.get(`/${restaurantId}`).then((response) => {
      setSelectedRestaurant(response.data.data.restaurant);
    });
  }, []);
  console.log(reviews);
  return (
    <>
      {selectedRestaurant && (
        <>
          <div className="flex flex-wrap justify-center">
            {reviews.length > 0 ? (
              reviews.map((review, idx) => {
                return (
                  <div className="w-1/6 p-4 m-4 bg-white rounded-lg shadow-lg border border-gray-600 ">
                    <p className="font-bold text-red-500">{review.author}</p>
                    <div className="flex">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <svg viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                      ))}
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                );
              })
            ) : (
              <div className="w-1/3 p-4 m-4 bg-white rounded-lg shadow-lg">
                <p className="font-bold text-black">
                  No reviews, be the first to review!
                </p>
              </div>
            )}
          </div>
        </>
      )}
      <div>
        <button>Add Review</button>
      </div>
      <AddReviewForm />
    </>
  );
};
export default RestaurantPage;
