import { NextFunction, Request, Response } from "express";
import * as express from "express";
const router = express.Router();

// router.get("/*", (req: Request, res: Response, next: NextFunction) => {
//   const isAuthenticated = req.isAuthenticated();
//   if (!isAuthenticated) return res.redirect("/register");
//   next();
// });

router.get("/test", async (req: Request, res: Response) => {
  res.send({ data: "testet lyckades" });
});
export default router;
