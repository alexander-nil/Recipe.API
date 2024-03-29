import { NextFunction, Request, Response } from "express";
import { CreateCategory, GetCategories } from "../../schemas/category_schema";
import * as Express from "express";
const router = Express.Router();

router.get("/*", (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.isAuthenticated();
  if (!isAuthenticated) return res.send({ authenticated: isAuthenticated });
  next();
});
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
