"use strict";
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
const express = require("express");
const router = express.Router();
const Buffer = require("buffer").Buffer;
function base64ToBlob(base64String) {
    const buffer = Buffer.from(base64String, "base64");
    const blob = new Blob([buffer], { type: "application/octet-stream" });
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
