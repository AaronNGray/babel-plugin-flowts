"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAnnotation = void 0;
const convertTypeAnnotation_1 = require("../converters/convertTypeAnnotation");
const replaceWith_1 = require("../utils/replaceWith");
function TypeAnnotation(path) {
    replaceWith_1.replaceWith(path, convertTypeAnnotation_1.convertTypeAnnotation(path.node));
}
exports.TypeAnnotation = TypeAnnotation;
//# sourceMappingURL=TypeAnnotation.js.map