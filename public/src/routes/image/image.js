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
const image_schema_1 = require("../../schemas/image_schema");
const buffer_1 = require("buffer");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
function base64ToBlob(base64String) {
    const buffer = buffer_1.Buffer.from(base64String, "base64");
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    return blob;
}
router.get("/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, image_schema_1.GetImages)();
    result.map((i) => __awaiter(void 0, void 0, void 0, function* () {
        const resultatet = base64ToBlob(i.file);
        console.log("resultatet: ", resultatet);
        i.blob = resultatet;
        return i;
    }));
    res.send({ data: result });
}));
router.post("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("going in here!");
    const { file, name } = req.body.data;
    console.log("req: ', ", req.body.data.name);
    console.log("cate : ", file, name);
    const result = yield (0, image_schema_1.UploadImage)(name, file);
    res.send({ data: result });
}));
exports.default = router;
