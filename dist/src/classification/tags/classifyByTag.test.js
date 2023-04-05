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
const classifyByTag_1 = require("./classifyByTag");
// unit tests for classifyByTags
describe("should find a category for certain tags", () => {
    test("should return 'community-life' for relegious tag", () => __awaiter(void 0, void 0, void 0, function* () {
        const tag = "Kirche";
        const category = yield (0, classifyByTag_1.classifyByTag)(tag);
        expect(category).not.toBeNull();
        expect(category).toBe("community-life");
    }));
    test("should return 'education-health' for jobs and care tags", () => __awaiter(void 0, void 0, void 0, function* () {
        const tag = "Fußpflege";
        const category = yield (0, classifyByTag_1.classifyByTag)(tag);
        expect(category).not.toBeNull();
        expect(category).toBe("education-health");
    }));
    test("should return 'everyday-supply' for shopping and waste tags", () => __awaiter(void 0, void 0, void 0, function* () {
        const tag = "Restmüll";
        const category = yield (0, classifyByTag_1.classifyByTag)(tag);
        expect(category).not.toBeNull();
        expect(category).toBe("everyday-supply");
    }));
    test("should return 'culture-tourism' for event tags", () => __awaiter(void 0, void 0, void 0, function* () {
        const tag = "Konzert";
        const category = yield (0, classifyByTag_1.classifyByTag)(tag);
        expect(category).not.toBeNull();
        expect(category).toBe("culture-tourism");
    }));
});
