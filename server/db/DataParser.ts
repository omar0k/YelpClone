"use strict";
import fs from "fs";
import { Pool } from "pg";
import dotenv from "dotenv"
dotenv.config();
const pool = new Pool({
  user:process.env.PGUSER,
  host:process.env.PGHOST,
  port:Number(process.env.PGPORT),
  password:process.env.PGPASSWORD,
  database:process.env.PGDATABASE
});
const db = {
  query: (text: string, params: any[]) => pool.query(text, params),
};
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
const restaurants: Business[] = [];
try {
  const data = fs.readFileSync(
    "../../yelp_dataset/yelp_restaurants_dataset.txt",
    "utf8"
  );
  const lines = data.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line) {
      const parts = line.split(`","`);
      const business: Business = {
        id: parts[0].split('":"')[1],
        name: parts[1].split('":"')[1],
        address: parts[2].split('":"')[1],
        city: parts[3].split('":"')[1],
        state: parts[4].split('":"')[1],
        postal_code: parts[5].split('":"')[1],
        isRestaurant: parts
          .slice(5, parts.length)
          .join(",")
          .includes("Restaurant")
          ? true
          : false,
        stars: Number(parts[6].split(",")[2].split(":")[1]),
        review_count: Number(parts[6].split(",")[3].split(":")[1]),
      };
      if (business.isRestaurant) {
        restaurants.push(business);
      }
    }
  }
} catch (err) {
  console.error(err);
}
//inserting data into the database
for (let i = 0; i < restaurants.length; i++) {
  const element = restaurants[i];
  db.query(
    "INSERT INTO restaurants (restaurant_id,name,address,city,state,postal_code,stars,review_count) values ($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      element.id,
      element.name,
      element.address,
      element.city,
      element.state,
      element.postal_code,
      element.stars,
      element.review_count,
    ]
  );
}
export default restaurants;
