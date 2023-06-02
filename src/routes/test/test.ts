import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
  res.send({ data: "testet lyckades" });
});
export default router;
