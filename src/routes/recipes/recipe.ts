import { Request, Response } from "express";
import { CreateRecipe, GetRecipes, IRecipe } from "../../schemas/recipe_schema";
import * as express from "express";
const router = express.Router();
interface IImages {
  name: string;
  file: string;
  blob: Blob;
}
router.get("/*", (req: Request, res: Response, next: express.NextFunction) => {
  const isAuthenticated = req.isAuthenticated();
  if (!isAuthenticated) return res.redirect("/register");
  next();
});

router.get("/recipes", async (req: Request, res: Response) => {
  const result = await GetRecipes<IRecipe[]>();
  res.setHeader("Cache-Control", "no-store");
  res.send(result);
});

router.post("/recipe", async (req: Request, res: Response) => {
  const category = req.body;
  console.log("cate : ", category);
  const result = await CreateRecipe(category);
  res.send({ data: result });
});
export default router;
