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
const mapTagToGoogleClassification_1 = require("./mapTagToGoogleClassification");
describe("should map certain tags to google classification", () => {
    test("should return '/People & Society'", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((0, mapTagToGoogleClassification_1.mapTagToGoogleClassification)("Kirche")).toBe("/People & Society/Religion & Belief");
    }));
    test("should return '/Law & Government' for joba and care tags", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((0, mapTagToGoogleClassification_1.mapTagToGoogleClassification)("Gremien")).toBe("/Law & Government/Government");
        expect((0, mapTagToGoogleClassification_1.mapTagToGoogleClassification)("Gemeindevertretung")).toBe("/Law & Government/Government");
    }));
    test("should return 'everyday-supply' for shopping and waste tags", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((0, mapTagToGoogleClassification_1.mapTagToGoogleClassification)("Musik")).toBe("/Arts & Entertainment/Music & Audio");
    }));
    test("should return 'culture-tourism' for event tags", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((0, mapTagToGoogleClassification_1.mapTagToGoogleClassification)("Bäckerauto")).toBe("/Food & Drink/Beverages");
    }));
    test("should return 'culture-tourism' for event tags", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((0, mapTagToGoogleClassification_1.mapTagToGoogleClassification)("Restmüll")).toBe("/Law & Government/Social Services");
    }));
});
