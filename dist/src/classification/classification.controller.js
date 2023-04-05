"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const tsoa_1 = require("tsoa");
const ruralEventCategory_1 = require("../../packages/rural-event-categories/src/types/ruralEventCategory");
const classifyByText_1 = require("./naturallanguage/classifyByText");
const classifyByTag_1 = require("./tags/classifyByTag");
// TODO: add another GET route for classifyByTag
// TODO: add another GET route for classifyByTags
let ClassificationController = class ClassificationController {
    /**
     * Returns a rural category.
     */
    getClassification(body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug(body);
            // check preconditions
            if (!body)
                throw (0, http_errors_1.default)(400, "no content");
            if ((!body.tag || body.tag.length === 0) &&
                (!body.body || body.body.trim().length < 100))
                throw (0, http_errors_1.default)(400, "invalid content, content mus contain tags or a body with at least 100 characters");
            // classify by tags
            if (body.tag && body.tag.length > 0) {
                const categoryByTag = yield (0, classifyByTag_1.classifyByTag)(body.tag);
                if (categoryByTag) {
                    console.debug(`category "${categoryByTag}" found for tag/s "${body.tag}"`);
                    return ruralEventCategory_1.ruralEventCategories.find((category) => category.id === categoryByTag); // exit early
                }
            }
            // classify by text
            if (body.body && body.body.length > 0) {
                const categoryByText = yield (0, classifyByText_1.classifyByText)(body.body);
                if (categoryByText) {
                    console.debug(`category "${categoryByText}" found for text "${body.body
                        .split(" ")
                        .slice(0, 6)
                        .join(" ")} ...}"`);
                    return ruralEventCategory_1.ruralEventCategories.find((category) => category.id === categoryByText);
                }
            }
            throw (0, http_errors_1.default)(404, "could not classify the given content");
        });
    }
};
__decorate([
    (0, tsoa_1.Post)(""),
    (0, tsoa_1.SuccessResponse)(201, "Classified"),
    (0, tsoa_1.Response)("204", "No Events"),
    (0, tsoa_1.Response)("400", "Invalid Parameters"),
    (0, tsoa_1.Response)("404", "Could not classify"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClassificationController.prototype, "getClassification", null);
ClassificationController = __decorate([
    (0, tsoa_1.Route)("classify"),
    (0, tsoa_1.Tags)("Classification")
], ClassificationController);
exports.default = ClassificationController;
