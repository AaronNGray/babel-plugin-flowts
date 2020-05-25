"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclareTypeAlias = void 0;
const convertDeclareTypeAlias_1 = require("../converters/convertDeclareTypeAlias");
const replaceWith_1 = require("../utils/replaceWith");
function DeclareTypeAlias(path, state) {
    const node = path.node;
    const replacement = convertDeclareTypeAlias_1.convertDeclareTypeAlias(node);
    replacement.declare = !state.get('isModuleDeclaration');
    replaceWith_1.replaceWith(path, replacement);
}
exports.DeclareTypeAlias = DeclareTypeAlias;
//# sourceMappingURL=DeclareTypeAlias.js.map