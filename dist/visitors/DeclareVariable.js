"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclareVariable = void 0;
const convertDeclareVariable_1 = require("../converters/convertDeclareVariable");
const replaceWith_1 = require("../utils/replaceWith");
function DeclareVariable(path, state) {
    const replacement = convertDeclareVariable_1.convertDeclareVariable(path.node);
    replacement.declare = !state.get('isModuleDeclaration');
    replaceWith_1.replaceWith(path, replacement);
}
exports.DeclareVariable = DeclareVariable;
//# sourceMappingURL=DeclareVariable.js.map