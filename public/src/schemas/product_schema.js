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
exports.UpdateCheckedShoppingList = exports.AddToList = exports.GetShoppingList = exports.Product = exports.ShoppingList = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.ShoppingList = mongoose_1.default.model("shopping_lists", new mongoose_1.Schema({
    list: {
        type: Array,
    },
}));
exports.Product = mongoose_1.default.model("product", new mongoose_1.Schema({
    name: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    salesPrice: {
        type: Number,
    },
    checked: {
        type: Boolean,
        required: false,
    },
}));
const GetShoppingList = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = exports.ShoppingList.where({ _id: "648f573043044174269f71b1" });
    const result = yield query.findOne();
    console.log("result: ", result);
    return result;
});
exports.GetShoppingList = GetShoppingList;
const AddToList = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingList = yield (0, exports.GetShoppingList)();
    console.log("the id: ", shoppingList._id);
    const result = exports.ShoppingList.updateOne({
        _id: shoppingList._id,
    }, { $push: { list: product } });
    return result;
});
exports.AddToList = AddToList;
const UpdateCheckedShoppingList = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingList = yield (0, exports.GetShoppingList)();
    const result = exports.ShoppingList.updateOne({ "list.id": product.id }, {
        $set: {
            "list.$.checked": product.checked,
        },
    });
    return result;
});
exports.UpdateCheckedShoppingList = UpdateCheckedShoppingList;
