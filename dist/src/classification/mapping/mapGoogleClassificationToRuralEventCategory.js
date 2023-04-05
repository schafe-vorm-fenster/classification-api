"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapGoogleClassificationToRuralEventCategory = void 0;
const mapGoogleClassificationToRuralEventCategory_mapping_1 = require("./mapGoogleClassificationToRuralEventCategory.mapping");
const mapGoogleClassificationToRuralEventCategory = (googleClassification) => {
    const l1 = ("/" +
        googleClassification.split("/")[1]);
    const l2 = (l1 +
        "/" +
        googleClassification.split("/")[2]);
    const l3 = (l1 +
        l2 +
        "/" +
        googleClassification.split("/")[3]);
    console.debug("level 1: ", l1);
    console.debug("level 2: ", l2);
    console.debug("level 3: ", l3);
    const exactMatch = mapGoogleClassificationToRuralEventCategory_mapping_1.classificationMappings.filter((mapping) => mapping.classification === l3)[0];
    if (exactMatch)
        return exactMatch.category;
    const l2Match = mapGoogleClassificationToRuralEventCategory_mapping_1.classificationMappings.filter((mapping) => mapping.classification === l2)[0];
    if (l2Match)
        return l2Match.category;
    const l1Match = mapGoogleClassificationToRuralEventCategory_mapping_1.classificationMappings.filter((mapping) => mapping.classification === l1)[0];
    if (l1Match)
        return l1Match.category;
    return null;
};
exports.mapGoogleClassificationToRuralEventCategory = mapGoogleClassificationToRuralEventCategory;
