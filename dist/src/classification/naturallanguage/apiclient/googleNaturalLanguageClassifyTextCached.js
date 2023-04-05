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
exports.googleNaturalLanguageClassifyTextCached = void 0;
const googleNaturalLanguageClassifyText_1 = require("./googleNaturalLanguageClassifyText");
const uuid_by_string_1 = __importDefault(require("uuid-by-string"));
const cachemanager_1 = require("../../../cache/cachemanager");
/**
 * Use a two layer cache.
 * @param query: GoogleNaturalLanguageClassifyTextQuery
 * @returns GoogleNaturalLanguageClassifyTextResponse
 */
const memoryCached = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = "googlenaturallanguage_classifytext_" + (0, uuid_by_string_1.default)(query.content);
        console.debug(`[Cache] Check local cache for ${cacheKey}.`);
        return cachemanager_1.localCache.wrap(cacheKey, function () {
            try {
                console.debug(`[Cache] Check remote cache for ${cacheKey}.`);
                return cachemanager_1.remoteDatabaseCache.wrap(cacheKey, function () {
                    console.info(`[Cache] Fetch original data for ${cacheKey}.`);
                    return (0, googleNaturalLanguageClassifyText_1.googleNaturalLanguageClassifyText)(query);
                });
            }
            catch (error) {
                console.error(error.message);
                throw error;
            }
        });
    }
    catch (error) {
        console.error(error.message);
        return null;
    }
});
const googleNaturalLanguageClassifyTextCached = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.DEACTIVATE_CACHE === "true")
        return (0, googleNaturalLanguageClassifyText_1.googleNaturalLanguageClassifyText)(query);
    return memoryCached(query);
});
exports.googleNaturalLanguageClassifyTextCached = googleNaturalLanguageClassifyTextCached;
