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
exports.classifyByTag = void 0;
const mapGoogleClassificationToRuralEventCategory_1 = require("../mapping/mapGoogleClassificationToRuralEventCategory");
const mapTagToGoogleClassification_1 = require("../mapping/mapTagToGoogleClassification");
const classifyByTag = (tag) => __awaiter(void 0, void 0, void 0, function* () {
    // map tag to google classification by mapTagToGoogleClassification
    const googleClassification = yield (0, mapTagToGoogleClassification_1.mapTagToGoogleClassification)(tag);
    if (!googleClassification)
        throw new Error("No google classification found for tag: " + tag);
    // map google classification to rural event category by mapGoogleClassificationToRuralEventCategory
    const ruralEventCategory = yield (0, mapGoogleClassificationToRuralEventCategory_1.mapGoogleClassificationToRuralEventCategory)(googleClassification);
    if (!ruralEventCategory)
        throw new Error("No rural event category found for tag: " + tag);
    return ruralEventCategory;
});
exports.classifyByTag = classifyByTag;
