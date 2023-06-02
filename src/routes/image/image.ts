import { Request, Response } from "express";
import { CreateCategory, GetCategories } from "../../schemas/category_schema";
import { UploadImage, GetImages } from "../../schemas/image_schema";

import express from "express";
const router = express.Router();

const Buffer = require("buffer").Buffer;

function base64ToBlob(base64String: string) {
  const buffer = Buffer.from(base64String, "base64");
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  return blob;
}

interface Images {
  name: string;
  file: string;
  blob: Blob;
}

router.get("/images", async (req: Request, res: Response) => {
  const result = await GetImages<Images[]>();

  result.map(async (i) => {
    const resultatet = base64ToBlob(i.file);
    console.log("resultatet: ", resultatet);
    i.blob = resultatet;
    return i;
  });
  res.send({ data: result });
});

router.post("/upload", async (req: Request, res: Response) => {
  console.log("going in here!");
  const { file, name } = req.body.data;
  console.log("req: ', ", req.body.data.name);
  console.log("cate : ", file, name);
  const result = await UploadImage(name, file);
  res.send({ data: result });
});
export default router;