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
      <div className="restaurants-list flex flex-wrap justify-center">
        {restaurantsList
          .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
          .map((restaurant) => {
            return (
              <div className="w-1/4 p-4 m-1 border bg-cyan border-gray-400 rounded-lg h-20 shadow-xl">
                <Link
                  className=""
                  to={`/restaurants/${restaurant.restaurant_id}`}
                  key={restaurant.id}
                  state={restaurant.name}
                >
                  <p>{restaurant.name}</p>
                </Link>
              </div>
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
