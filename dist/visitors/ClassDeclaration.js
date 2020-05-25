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
exports.ClassDeclaration = void 0;
const t = __importStar(require("@babel/types"));
const convertInterfaceExtends_1 = require("../converters/convertInterfaceExtends");
const convertTypeParameterInstantiation_1 = require("../converters/convertTypeParameterInstantiation");
const convertTypeParameterDeclaration_1 = require("../converters/convertTypeParameterDeclaration");
const replaceWith_1 = require("../utils/replaceWith");
const transformClassBody_1 = require("../transforms/transformClassBody");
function ClassDeclaration(path) {
    const node = path.node;
    const superTypeParameters = node.superTypeParameters;
    if (t.isTypeParameterInstantiation(superTypeParameters)) {
        replaceWith_1.replaceWith(path.get('superTypeParameters'), convertTypeParameterInstantiation_1.convertTypeParameterInstantiation(superTypeParameters));
    }
    const typeParameters = node.typeParameters;
    if (t.isTypeParameterDeclaration(typeParameters)) {
        replaceWith_1.replaceWith(path.get('typeParameters'), convertTypeParameterDeclaration_1.convertTypeParameterDeclaration(typeParameters));
    }
    const classImplements = node.implements;
    if (Array.isArray(classImplements)) {
        const classImplements = path.get('implements');
        if (classImplements !== null) {
            for (const classImplement of classImplements) {
                if (classImplement.isClassImplements()) {
                    replaceWith_1.replaceWith(classImplement, convertInterfaceExtends_1.convertInterfaceExtends(classImplement.node));
                }
            }
        }
    }
    transformClassBody_1.transformClassBody(path.get('body'));
}
exports.ClassDeclaration = ClassDeclaration;
//# sourceMappingURL=ClassDeclaration.js.map