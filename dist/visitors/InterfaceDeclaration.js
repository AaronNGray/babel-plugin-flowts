"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceDeclaration = void 0;
const convertInterfaceDeclaration_1 = require("../converters/convertInterfaceDeclaration");
const replaceWith_1 = require("../utils/replaceWith");
function InterfaceDeclaration(path) {
    replaceWith_1.replaceWith(path, convertInterfaceDeclaration_1.convertInterfaceDeclaration(path.node));
}
exports.InterfaceDeclaration = InterfaceDeclaration;
//# sourceMappingURL=InterfaceDeclaration.js.map