import { Request, Response } from "express";
import { CreateRecipe, GetRecipes, IRecipe } from "../../schemas/recipe_schema";
import * as express from "express";
const router = express.Router();
import { Buffer } from "buffer";

function base64ToBlob(base64String: string) {
  const buffer = Buffer.from(base64String, "base64");
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  return blob;
}

interface IImages {
  name: string;
  file: string;
  blob: Blob;
}

router.get("/recipes", async (req: Request, res: Response) => {
  const result = await GetRecipes<IRecipe[]>();
  result.map((i) => (i.imageUrl.blob = base64ToBlob(i.imageUrl.file)));
  console.log(result[0].imageUrl.blob);
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
