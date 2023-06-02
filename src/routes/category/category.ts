import { Request, Response } from "express";
import { CreateCategory, GetCategories } from "../../schemas/category_schema";

const express = require("express");
const router = express.Router();

router.get("/categories", async (req: Request, res: Response) => {
  const result = await GetCategories();
  res.send({ data: result });
});

router.post("/category", async (req: Request, res: Response) => {
  const category = req.body;
  console.log("cate : ", category);
  const result = await CreateCategory(category.category);
  res.send({ data: result });
});
export default router;
