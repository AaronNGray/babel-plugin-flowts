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
exports.convertFunctionTypeAnnotation = void 0;
const t = __importStar(require("@babel/types"));
const generateFreeIdentifier_1 = require("../utils/generateFreeIdentifier");
const convertFlowType_1 = require("./convertFlowType");
const convertTypeParameterDeclaration_1 = require("./convertTypeParameterDeclaration");
const baseNodeProps_1 = require("../utils/baseNodeProps");
function convertFunctionTypeAnnotation(node) {
    let typeParams = undefined;
    if (node.typeParameters !== null) {
        typeParams = Object.assign(Object.assign({}, convertTypeParameterDeclaration_1.convertTypeParameterDeclaration(node.typeParameters)), baseNodeProps_1.baseNodeProps(node.typeParameters));
    }
    const parameters = [];
    let returnType = null;
    // Params
    if (node.params) {
        const paramNames = node.params
            .map(_ => _.name)
            .filter((_) => _ !== null)
            .map(_ => _.name);
        let hasRequiredAfter = false;
        for (let i = node.params.length - 1; i >= 0; i--) {
            const param = node.params[i];
            let name = param.name && param.name.name;
            // Generate param name? (Required in TS, optional in Flow)
            if (name == null) {
                name = generateFreeIdentifier_1.generateFreeIdentifier(paramNames);
                paramNames.push(name);
            }
            const id = t.identifier(name);
            id.optional = param.optional;
            if (param.typeAnnotation) {
                let typeAnnotation;
                if (t.isNullableTypeAnnotation(param.typeAnnotation)) {
                    if (!hasRequiredAfter) {
                        id.optional = true;
                    }
                    if (id.optional) {
                        let tsType = convertFlowType_1.convertFlowType(param.typeAnnotation.typeAnnotation);
                        if (t.isTSFunctionType(tsType)) {
                            tsType = t.tsParenthesizedType(tsType);
                        }
                        typeAnnotation = t.tsUnionType([tsType, t.tsNullKeyword()]);
                    }
                    else {
                        typeAnnotation = convertFlowType_1.convertFlowType(param.typeAnnotation);
                        hasRequiredAfter = true;
                    }
                }
                else {
                    typeAnnotation = convertFlowType_1.convertFlowType(param.typeAnnotation);
                    hasRequiredAfter = true;
                }
                id.typeAnnotation = Object.assign(Object.assign({}, t.tsTypeAnnotation(typeAnnotation)), baseNodeProps_1.baseNodeProps(param.typeAnnotation));
            }
            parameters.unshift(Object.assign(Object.assign({}, id), baseNodeProps_1.baseNodeProps(param)));
        }
    }
    // rest parameters
    if (node.rest) {
        if (node.rest.name) {
            const id = t.restElement(node.rest.name);
            id.typeAnnotation = t.tsTypeAnnotation(convertFlowType_1.convertFlowType(node.rest.typeAnnotation));
            parameters.push(Object.assign(Object.assign({}, id), baseNodeProps_1.baseNodeProps(node.rest)));
        }
    }
    // Return type
    if (node.returnType) {
        returnType = t.tsTypeAnnotation(Object.assign(Object.assign({}, convertFlowType_1.convertFlowType(node.returnType)), baseNodeProps_1.baseNodeProps(node.returnType)));
    }
    return { typeParams, parameters, returnType };
}
exports.convertFunctionTypeAnnotation = convertFunctionTypeAnnotation;
//# sourceMappingURL=convertFunctionTypeAnnotation.js.map