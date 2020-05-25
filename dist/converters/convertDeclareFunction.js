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
exports.convertDeclareFunction = void 0;
const t = __importStar(require("@babel/types"));
const convertFunctionTypeAnnotation_1 = require("./convertFunctionTypeAnnotation");
const baseNodeProps_1 = require("../utils/baseNodeProps");
function convertDeclareFunction(node) {
    if (!t.isTypeAnnotation(node.id.typeAnnotation))
        throw new Error('typeAnnotation is missing');
    const typeAnnotation = node.id.typeAnnotation.typeAnnotation;
    if (!t.isFunctionTypeAnnotation(typeAnnotation)) {
        throw new Error('typeAnnotation is not FunctionTypeAnnotation');
    }
    const { typeParams, parameters, returnType } = convertFunctionTypeAnnotation_1.convertFunctionTypeAnnotation(typeAnnotation);
    const id = Object.assign(Object.assign({}, t.identifier(node.id.name)), baseNodeProps_1.baseNodeProps(node.id));
    return t.tsDeclareFunction(id, typeParams, parameters, returnType);
}
exports.convertDeclareFunction = convertDeclareFunction;
//# sourceMappingURL=convertDeclareFunction.js.map