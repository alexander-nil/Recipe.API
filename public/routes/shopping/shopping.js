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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const product_schema_1 = require("../../schemas/product_schema");
const express = require("express");
const router = express.Router();
router.post("/products/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchString = req.body.input;
    console.log("search string: ", req.body.input);
    const result = yield axios_1.default.post("https://external.api.coop.se/personalization/search/products?api-version=v1&store=254800&groups=CUSTOMER_PRIVATE,CUSTOMER_MEDMERA&device=desktop&direct=true", {
        query: searchString,
        resultsOptions: {
            skip: 0,
            take: 15,
            sortBy: [],
            facets: [],
        },
        relatedResultsOptions: {
            skip: 0,
            take: 16,
        },
        customData: {
            searchABTest: false,
            consent: true,
        },
    }, {
        headers: {
            "Ocp-Apim-Subscription-Key": "3becf0ce306f41a1ae94077c16798187",
            "User-Id": "88908aaf-1576-4a16-adb6-df5f16782e49",
            "Content-Type": "application/json",
        },
    });
    console.log("data: ", result);
    res.json(result.data.results.items);
}));
router.post("/shoppinglist/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product } = req.body;
    console.log("product: ", product);
    const result = yield (0, product_schema_1.AddToList)(product);
    res.send(result);
}));
router.get("/shoppinglist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, product_schema_1.GetShoppingList)();
    res.send(result);
}));
router.post("/shoppinglist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("lol: ", req.body.product);
    const result = yield (0, product_schema_1.UpdateCheckedShoppingList)(req.body.product);
    res.send(result);
}));
exports.default = router;
