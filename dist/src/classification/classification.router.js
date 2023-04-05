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
const express_1 = __importDefault(require("express"));
const classification_controller_1 = __importDefault(require("./classification.controller"));
const router = express_1.default.Router();
router.post("", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_req.headers["read-access"])
        return res.status(401).send("Unauthorized");
    const controller = new classification_controller_1.default();
    yield controller
        .getClassification(_req.body)
        .then((response) => {
        res.set("Cache-Control", "public, max-age=300, s-maxage=300, stale-while-revalidate=60, stale-if-error=60");
        return res.status(200).json(response);
    })
        .catch((error) => {
        return res
            .status(error.status || 500)
            .json({ status: error.status || 500, error: error.message });
    });
}));
exports.default = router;
