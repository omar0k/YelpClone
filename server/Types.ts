export interface Review {
  author: string;
  text: string;
  id: number;
  restaurant_id: string;
  date: Date;
  rating:number;
}
export interface ReviewInfo{
  author:string;
  text:string;
  restaurant_id:string;
  rating:number
}
export interface Restaurant {
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
export interface Business {
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

