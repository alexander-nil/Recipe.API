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
const category_schema_1 = require("../../schemas/category_schema");
const express = require("express");
const router = express.Router();
router.get("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, category_schema_1.GetCategories)();
    res.send({ data: result });
}));
router.post("/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body;
    console.log("cate : ", category);
    const result = yield (0, category_schema_1.CreateCategory)(category.category);
    res.send({ data: result });
}));
exports.default = router;
