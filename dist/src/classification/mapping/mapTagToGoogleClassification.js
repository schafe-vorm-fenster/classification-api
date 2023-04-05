"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTagToGoogleClassification = void 0;
const mapTagToGoogleClassification_mapping_1 = require("./mapTagToGoogleClassification.mapping");
const mapTagToGoogleClassification = (tag) => {
    const categoryMapping = mapTagToGoogleClassification_mapping_1.categoryMappings.filter((categoryMapping) => categoryMapping.tags.indexOf(tag) >= 0)[0];
    if (categoryMapping) {
        return categoryMapping.classification;
    }
    else {
        return null;
    }
};
exports.mapTagToGoogleClassification = mapTagToGoogleClassification;
