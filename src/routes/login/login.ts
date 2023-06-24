import express, { NextFunction, Request, Response } from "express";
import * as Express from "express";
import * as crypto from "crypto";
import {
  CreateUser,
  GetUserByUsername,
  IUser,
} from "../../schemas/user_schema";
import env from "dotenv";
var parser = require("body-parser");
var urlencodedParser = parser.urlencoded({ extended: false });
const cookieParser = require("cookie-parser");
env.config();

var passport = require("passport");

const router = Express.Router();
const jwtSecret = process.env.JWT_SECRET;
router.use(cookieParser());

router.post("/login", (req: Request, res: Response) => {
  passport.authenticate("local", (err: Error, user: IUser, info: any) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found" });
    }

    req.logIn(user, (err: Error) => {
      if (err) return res.status(400).json({ errors: err });
      return res
        .status(200)
        .json({ success: `logged in successfully ${user._id}` });
    });
  })(req, res);
});

import { AuthenticateCallback } from "passport";

var passport = require("passport");
var LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy(function verify(
    username: string,
    password: string,
    cb: AuthenticateCallback
  ) {
    console.log("going in here!!!! lol please!!!");
    GetUserByUsername(username).then((res: any) => {
      console.log("res: ", res);
      crypto.pbkdf2(
        password,
        res[0].salt,
        310000,
        32,
        "sha256",
        function (err: any, hashedPassword) {
          if (err) {
            console.log("err: ", err);
            return cb(err);
          }
          if (!crypto.timingSafeEqual(res[0].password, hashedPassword)) {
            console.log("incorr pass or user");
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
          return cb(null, res[0]);
        }
      );
    });
  })
);

passport.serializeUser(function (user: IUser, cb: AuthenticateCallback) {
  process.nextTick(function () {
    cb(null, { id: user._id, username: user.username });
  });
});

passport.deserializeUser(function (user: IUser, cb: AuthenticateCallback) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("rq.: ", req.body.user);
    const { user } = req.body;
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      user.password,
      salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return next(err);
        }
        const newUser: IUser = {
          ...user,
          password: hashedPassword,
          salt: salt,
        };
        const result = CreateUser(newUser);
        result.then((res) => console.log("res: ", res));
      }
    );
  }
);

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({ result: true });
  });
});

router.get("/auth", (req: Request, res: Response) => {
  console.log("helloooo");
  const isAuthenticated = req.isAuthenticated();
  const data = { result: isAuthenticated };
  return res.send(data);
});
export default router;
