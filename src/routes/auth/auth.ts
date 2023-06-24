import { NextFunction, Request, Response } from "express";
import * as Express from "express";
import passport from "passport";
const router = Express.Router();

router.get("/*", (req: Request, res: Response, next: NextFunction) => {
  console.log("req : ", req.isAuthenticated());
  passport.authenticate("local", () => {});
  const isAuthenticated = req.isAuthenticated();
  if (!isAuthenticated) return res.send({ authenticated: isAuthenticated });
  next();
});

export default router;
