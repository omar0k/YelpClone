import { useEffect, useState } from "react";
import RestaurantsApi from "../api/RestaurantsApi";
import { Restaurant } from "../../../server/Types";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [restaurantsList, setRestaurantsList] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const pageSize = 50;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantsApi.get("/");
        setRestaurantsList(response.data.data.restaurants);
      } catch (error) {
        console.log("Error fetching... ", error);
      }
    };
    fetchData();
  }, []);
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  console.log(searchQuery);
  return (
    <>
      <input
        value={searchQuery}
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded-md h-7 focus:outline-none p-2 font-medium"
        placeholder="Search restaurant..."
      />
      <div className="restaurants-list">
        {restaurantsList
          .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
          .map((restaurant) => {
            return (
              <Link
                to={`/restaurants/${restaurant.restaurant_id}`}
                key={restaurant.id}
              >
                <p>{restaurant.name}</p>
              </Link>
            );
          })}
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          disabled={
            // If the next page is greater than or equal to the max number of possible pages needed, button is disabled.
            currentPage + 1 >= Math.ceil(restaurantsList.length / pageSize)
          }
        >
          Next Page
        </button>
      </div>
    </>
  );
};
export default HomePage;
