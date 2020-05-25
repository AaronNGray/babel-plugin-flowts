"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclareClass = void 0;
const convertDeclareClass_1 = require("../converters/convertDeclareClass");
const replaceWith_1 = require("../utils/replaceWith");
function DeclareClass(path, state) {
    const decl = convertDeclareClass_1.convertDeclareClass(path.node);
    decl.declare = !state.get('isModuleDeclaration');
    replaceWith_1.replaceWith(path, decl);
}
exports.DeclareClass = DeclareClass;
//# sourceMappingURL=DeclareClass.js.map