"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeParameterDeclaration = void 0;
const convertTypeParameterDeclaration_1 = require("../converters/convertTypeParameterDeclaration");
const replaceWith_1 = require("../utils/replaceWith");
function TypeParameterDeclaration(path) {
    replaceWith_1.replaceWith(path, convertTypeParameterDeclaration_1.convertTypeParameterDeclaration(path.node));
}
exports.TypeParameterDeclaration = TypeParameterDeclaration;
//# sourceMappingURL=TypeParameterDeclaration.js.map