import express, { NextFunction, Request, Response } from "express";
import auth from "./routes/auth/auth";
import category from "./routes/category/category";
import recipe from "./routes/recipes/recipe";
import image from "./routes/image/image";
import shopping from "./routes/shopping/shopping";
import login from "./routes/login/login";
import test from "./routes/test/test";
import * as WebSocket from "ws";
import mongoose from "mongoose";
import { GetShoppingList, IShoppingList } from "./schemas/product_schema";
import env from "dotenv";
import cors from "cors";
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

env.config();

const PORT = process.env.PORT;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DBNAME = process.env.DBNAME;

export const app = express();

mongoose.connect(`${CONNECTION_STRING}${DBNAME}`);
mongoose.connection.on("error", (err) => {
  console.log("error: ", err);
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var passport = require("passport");
var session = require("express-session");

var passport = require("passport");

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the actual client domain
    credentials: true,
  })
);
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: `${CONNECTION_STRING}${DBNAME}` }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Session duration in milliseconds (e.g., 1 day)
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

//Register routes
app.use(auth);
app.use(category);
app.use(recipe);
app.use(image);
app.use(shopping);
app.use(login);
app.use(test);

const server = app.listen(5001, () => {
  console.log("Server listening on port 5001");
});
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    const data = await GetShoppingList<IShoppingList>();
    wss.clients.forEach((c) => c.send(JSON.stringify(data)));
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});
