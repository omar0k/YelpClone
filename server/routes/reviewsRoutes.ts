import express from "express";
import { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  port: Number(process.env.PGPORT),
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
});
const db = {
  query: (text: string, params: any[]) => pool.query(text, params),
};
const router = express.Router();

router.get(
  "/api/v1/restaurants/:id/reviews",
  async (req: Request, res: Response) => {
    const result = await db.query(
      "SELECT * from reviews where restaurant_id=$1",
      [req.params.id]
    );
    res.status(200).json({
      message: "Success",
      data: result.rows,
    });
  }
);
router.post(
  "/api/v1/restaurants/:id/reviews",
  async (req: Request, res: Response) => {
    if (!req.body.text || !req.body.author) {
      res.status(400).json({
        Error: "Not all fields are filled",
        Message: "Please enter all fileds, text and author.",
      });
    }
    const result = await db.query(
      "INSERT INTO reviews (restaurant_id,text,author,date) VALUES($1,$2,$3,$4) returning *",
      [req.params.id, req.body.text, req.body.author, "now()"]
    );
    if (result) {
      res.status(200).json({
        Message: "Review successfully inserted.",
        Review: result.rows[0],
      });
    }
  }
);

export default router;
