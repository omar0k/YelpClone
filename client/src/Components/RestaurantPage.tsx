import { useState } from "react";
import { useParams } from "react-router-dom";
import { ReviewInfo } from "../../../server/Types";
const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const [reviewInfo, setReviewInfo] = useState<ReviewInfo>({
    text: "",
    author: "",
    rating: 1,
    restaurant_id: "",
  });
  const { text, author, rating, restaurant_id } = reviewInfo;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(reviewInfo.text);
  };
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <form className="bg-white p-6 rounded-lg" onSubmit={onSubmitForm}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Author"
            value={author}
            type="text"
            name="author"
            onChange={onChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="rating"
          >
            Rating
          </label>
          <input
            className="shadow appearance-none border rounded w-15 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rating"
            value={rating}
            max={5}
            name="rating"
            onChange={onChange}
            min={1}
            type="number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="Review"
          >
            Review
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-1 px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
            id="Review"
            name="text"
            maxLength={249}
            value={text}
            type="text"
            onChange={onChange}
            placeholder="Enter your review"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default RestaurantPage;
