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
const mapGoogleClassificationToRuralEventCategory_1 = require("./mapGoogleClassificationToRuralEventCategory");
describe("should find a category for certain google classifications", () => {
    test("should return 'community-life'", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, mapGoogleClassificationToRuralEventCategory_1.mapGoogleClassificationToRuralEventCategory)("/People & Society")).toBe("community-life");
        expect(yield (0, mapGoogleClassificationToRuralEventCategory_1.mapGoogleClassificationToRuralEventCategory)("/Law & Government")).toBe("community-life");
    }));
    test("should return 'education-health' for jobs and care tags", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, mapGoogleClassificationToRuralEventCategory_1.mapGoogleClassificationToRuralEventCategory)("/Health")).toBe("education-health");
    }));
    test("should return 'everyday-supply' for shopping and waste tags", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, mapGoogleClassificationToRuralEventCategory_1.mapGoogleClassificationToRuralEventCategory)("/Shopping")).toBe("everyday-supply");
        expect(yield (0, mapGoogleClassificationToRuralEventCategory_1.mapGoogleClassificationToRuralEventCategory)("/Law & Government/Social Services")).toBe("everyday-supply");
    }));
    test("should return 'culture-tourism' for event tags", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, mapGoogleClassificationToRuralEventCategory_1.mapGoogleClassificationToRuralEventCategory)("/Arts & Entertainment")).toBe("culture-tourism");
    }));
});
