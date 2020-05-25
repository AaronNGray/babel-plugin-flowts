"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclareInterface = void 0;
const convertInterfaceDeclaration_1 = require("../converters/convertInterfaceDeclaration");
const replaceWith_1 = require("../utils/replaceWith");
function DeclareInterface(path, state) {
    const node = path.node;
    const replacement = convertInterfaceDeclaration_1.convertInterfaceDeclaration(node);
    replacement.declare = !state.get('isModuleDeclaration');
    replaceWith_1.replaceWith(path, replacement);
}
exports.DeclareInterface = DeclareInterface;
//# sourceMappingURL=DeclareInterface.js.map