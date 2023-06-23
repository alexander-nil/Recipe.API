"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const category_1 = __importDefault(require("./routes/category/category"));
const recipe_1 = __importDefault(require("./routes/recipes/recipe"));
const image_1 = __importDefault(require("./routes/image/image"));
const shopping_1 = __importDefault(require("./routes/shopping/shopping"));
const test_1 = __importDefault(require("./routes/test/test"));
const WebSocket = __importStar(require("ws"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
const mongoose_1 = __importDefault(require("mongoose"));
const product_schema_1 = require("./schemas/product_schema");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const DBNAME = process.env.DBNAME;
mongoose_1.default.connect(`${CONNECTION_STRING}${DBNAME}`);
mongoose_1.default.connection.on("error", (err) => {
    console.log("error: ", err);
});
//Register routes
app.use(category_1.default);
app.use(recipe_1.default);
app.use(image_1.default);
app.use(shopping_1.default);
app.use(test_1.default);
const server = app.listen(5001, () => {
    console.log("Server listening on port 5001");
});
const wss = new WebSocket.Server({ server });
// WebSocket route
wss.on("connection", (ws) => {
    // Handle incoming messages from the client
    ws.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Received message: ${message}`);
        const data = yield (0, product_schema_1.GetShoppingList)();
        // Send a response back to the client
        wss.clients.forEach((c) => c.send(JSON.stringify(data)));
    }));
    // Handle WebSocket connection close
    ws.on("close", () => {
        console.log("WebSocket connection closed");
    });
});
exports.default = app;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${JSON.stringify(server)} :)`);
// });
