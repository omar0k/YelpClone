import express from "express";
import { Request, Response } from "express";
import db from "../db/index";
const router = express.Router();
router.get("/api/v1/restaurants", async (req: Request, res: Response) => {
  try {
    const results = await db.query("SELECT * FROM restaurants", []);
    console.log(results.rows);
    res.status(200).json({
      status: "Success",
      results: results.rowCount,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/api/v1/restaurants/:id", async (req: Request, res: Response) => {
  try {
    const result = await db.query("SELECT * FROM restaurants WHERE id=$1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "Success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/api/v1/restaurants", async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      "INSERT INTO restaurants (name,location,price_range) values ($1,$2,$3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(200).json({
      status: "Success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    res.send(error);
  }
});
router.put("/api/v1/restaurants/:id", async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      "UPDATE restaurants SET name =$1, location=$2,price_range=$3 WHERE id=$4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "Success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (error) {
    res.send(error);
  }
});
router.delete(
  "/api/v1/restaurants/:id",
  async (req: Request, res: Response) => {
    try {
      const result = await db.query("DELETE FROM restaurants where id =$1", [
        req.params.id,
      ]);
      res.status(204).json({
        status: "Successfully deleted.",
      });
    } catch (error) {
        res.send(error)
    }
  }
);

export default router;
