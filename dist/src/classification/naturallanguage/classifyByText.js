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
exports.classifyByText = void 0;
const mapGoogleClassificationToRuralEventCategory_1 = require("../mapping/mapGoogleClassificationToRuralEventCategory");
const googleNaturalLanguageClassifyTextCached_1 = require("./apiclient/googleNaturalLanguageClassifyTextCached");
const classifyByText = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const classification = yield (0, googleNaturalLanguageClassifyTextCached_1.googleNaturalLanguageClassifyTextCached)({
        content: text,
    });
    console.debug(classification);
    const category = (0, mapGoogleClassificationToRuralEventCategory_1.mapGoogleClassificationToRuralEventCategory)(classification[0].name);
    console.debug(category);
    return category;
});
exports.classifyByText = classifyByText;
