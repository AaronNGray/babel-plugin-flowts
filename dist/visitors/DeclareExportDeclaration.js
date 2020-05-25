"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclareExportDeclaration = void 0;
const t = __importStar(require("@babel/types"));
const convertFlowType_1 = require("../converters/convertFlowType");
const convertDeclareVariable_1 = require("../converters/convertDeclareVariable");
const convertDeclareFunction_1 = require("../converters/convertDeclareFunction");
const convertDeclareTypeAlias_1 = require("../converters/convertDeclareTypeAlias");
const convertDeclareClass_1 = require("../converters/convertDeclareClass");
const replaceWith_1 = require("../utils/replaceWith");
const convertInterfaceDeclaration_1 = require("../converters/convertInterfaceDeclaration");
function DeclareExportDeclaration(path) {
    const node = path.node;
    let replacement;
    if (node.default) {
        if (!node.declaration) {
            throw path.buildCodeFrameError('todo: declaration is missing');
        }
        if (t.isDeclareFunction(node.declaration)) {
            replacement = t.exportDefaultDeclaration(convertDeclareFunction_1.convertDeclareFunction(node.declaration));
            replaceWith_1.replaceWith(path, replacement);
        }
        else if (t.isDeclareClass(node.declaration)) {
            replacement = t.exportDefaultDeclaration(convertDeclareClass_1.convertDeclareClass(node.declaration));
            replaceWith_1.replaceWith(path, replacement);
        }
        else {
            if (!t.isFlowType(node.declaration)) {
                throw path.buildCodeFrameError('not implemented');
            }
            const declaration = convertFlowType_1.convertFlowType(node.declaration);
            const aliasId = t.identifier('__default');
            path.replaceWithMultiple([
                t.variableDeclaration('let', [
                    t.variableDeclarator(Object.assign(Object.assign({}, aliasId), { typeAnnotation: t.tsTypeAnnotation(declaration) })),
                ]),
                t.exportDefaultDeclaration(aliasId),
            ]);
        }
    }
    else {
        let declaration = null;
        if (t.isDeclareVariable(node.declaration)) {
            declaration = convertDeclareVariable_1.convertDeclareVariable(node.declaration);
        }
        else if (t.isDeclareFunction(node.declaration)) {
            declaration = convertDeclareFunction_1.convertDeclareFunction(node.declaration);
        }
        else if (t.isTypeAlias(node.declaration)) {
            declaration = convertDeclareTypeAlias_1.convertDeclareTypeAlias(node.declaration);
        }
        else if (t.isDeclareClass(node.declaration)) {
            declaration = convertDeclareClass_1.convertDeclareClass(node.declaration);
        }
        else if (t.isInterfaceDeclaration(node.declaration)) {
            declaration = convertInterfaceDeclaration_1.convertInterfaceDeclaration(node.declaration);
        }
        else {
            throw path.buildCodeFrameError(`DeclareExportDeclaration not converted`);
        }
        replacement = t.exportNamedDeclaration(declaration, node.specifiers ? node.specifiers : [], node.source);
        replaceWith_1.replaceWith(path, replacement);
    }
}
exports.DeclareExportDeclaration = DeclareExportDeclaration;
//# sourceMappingURL=DeclareExportDeclaration.js.map