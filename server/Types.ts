interface Review {
  author: string;
  text: string;
  id: number;
  restaurant_id: string;
  date: Date;
}
interface Restaurant {
  id: number;
  restaurant_id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  stars?: number | 0;
  review_count?: number | 0;
}
interface Business {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  isRestaurant: boolean;
  stars: number;
  review_count: number;
}
