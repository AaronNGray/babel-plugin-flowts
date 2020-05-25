"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclareFunction = void 0;
const convertDeclareFunction_1 = require("../converters/convertDeclareFunction");
const replaceWith_1 = require("../utils/replaceWith");
function DeclareFunction(path, state) {
    const replacement = convertDeclareFunction_1.convertDeclareFunction(path.node);
    replacement.declare = !state.get('isModuleDeclaration');
    replaceWith_1.replaceWith(path, replacement);
}
exports.DeclareFunction = DeclareFunction;
//# sourceMappingURL=DeclareFunction.js.map