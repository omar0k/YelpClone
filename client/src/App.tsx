import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Components/HomePage";
import RestaurantPage from "./Components/RestaurantPage";
import UpdateReview from "./Components/UpdateReview";
const App = () => {
  return (
    <div className="bg-neutral-900">
    <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/restaurants/:restaurantId"
            element={<RestaurantPage />}
          />
          <Route
            path="/restaurants/:restaurantId/review/:reviewId"
            element={<UpdateReview />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
