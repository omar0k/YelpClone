import express, { Request, Response } from "express";
import dotenv from "dotenv";
import restaurantRouter from "./routes/restaurantRoutes";
import reviewsRouter from "./routes/reviewsRoutes";
import cors from "cors"
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(restaurantRouter);
app.use(reviewsRouter);
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
