import express from "express";
import bodyParser from "body-parser";
import category from "./routes/category/category";
import recipe from "./routes/recipes/recipe";
import image from "./routes/image/image";
import shopping from "./routes/shopping/shopping";
import test from "./routes/test/test";
import * as WebSocket from "ws";
import cors from "cors";
import * as http from "http";

//@ts-ignore
import { Blob } from "blob-polyfill";
global["Blob"] = Blob;
const app = express();

app.use(cors());
("");
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

// parse application/json
app.use(bodyParser.json());
import mongoose from "mongoose";
import { GetShoppingList, IShoppingList } from "./schemas/product_schema";
import env from "dotenv";
env.config();

const PORT = process.env.PORT;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DBNAME = process.env.DBNAME;

mongoose.connect(`${CONNECTION_STRING}${DBNAME}`);

mongoose.connection.on("error", (err) => {
  console.log("error: ", err);
});

//Register routes
app.use(category);
app.use(recipe);
app.use(image);
app.use(shopping);
app.use(test);

const server = app.listen(5001, () => {
  console.log("Server listening on port 5001");
});
const wss = new WebSocket.Server({ server });

// WebSocket route
wss.on("connection", (ws) => {
  // Handle incoming messages from the client
  ws.on("message", async (message) => {
    console.log(`Received message: ${message}`);
    const data = await GetShoppingList<IShoppingList>();
    // Send a response back to the client
    wss.clients.forEach((c) => c.send(JSON.stringify(data)));
  });

  // Handle WebSocket connection close
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

export default app;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${JSON.stringify(server)} :)`);
// });
