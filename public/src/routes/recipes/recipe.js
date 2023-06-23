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
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_schema_1 = require("../../schemas/recipe_schema");
const express = __importStar(require("express"));
const router = express.Router();
const buffer_1 = require("buffer");
function base64ToBlob(base64String) {
    const buffer = buffer_1.Buffer.from(base64String, "base64");
    const blob = new buffer_1.Blob([buffer], { type: "application/octet-stream" });
    return blob;
}
router.get("/recipes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, recipe_schema_1.GetRecipes)();
    result.map((i) => (i.imageUrl.blob = base64ToBlob(i.imageUrl.file)));
    console.log(result[0].imageUrl.blob);
    res.setHeader("Cache-Control", "no-store");
    res.send(result);
}));
router.post("/recipe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body;
    console.log("cate : ", category);
    const result = yield (0, recipe_schema_1.CreateRecipe)(category);
    res.send({ data: result });
}));
exports.default = router;
