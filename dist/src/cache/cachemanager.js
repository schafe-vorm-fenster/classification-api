"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remoteDatabaseCache = exports.localCache = void 0;
const cacheManager = require("cache-manager");
const mongoose = require("mongoose");
const mongooseStore = require("cache-manager-mongoose");
/**
 * Memory cache.
 * Use always to avoid any duplicate http or api requests.
 */
exports.localCache = cacheManager.caching({
    store: "memory",
    max: 100000,
    ttl: 3600,
    isCacheableValue: function (value) {
        return value !== undefined && value !== null;
    },
});
/**
 * MongoDB cache at cloud.mongodb.com.
 * Use for more or less static data.
 */
const myConnection = mongoose.createConnection(process.env.MONGODB_URI);
exports.remoteDatabaseCache = cacheManager.caching({
    store: mongooseStore,
    mongoose: mongoose,
    connection: myConnection,
    modelName: "CacheModel",
    modelOptions: {
        collection: "MongooseCache",
        versionKey: false, // do not create __v field
    },
    ttl: 604800,
    isCacheableValue: function (value) {
        return value !== undefined && value !== null;
    },
});
