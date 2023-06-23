import { Request, Response } from "express";
import * as express from "express";
const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
  res.send({ data: "testet lyckades" });
});
export default router;
