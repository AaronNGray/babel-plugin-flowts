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
exports.convertObjectTypeProperty = void 0;
const t = __importStar(require("@babel/types"));
const convertFlowType_1 = require("./convertFlowType");
const baseNodeProps_1 = require("../utils/baseNodeProps");
const getPropertyKey_1 = require("./getPropertyKey");
function convertObjectTypeProperty(property) {
    let tsType;
    if (!t.isNullableTypeAnnotation(property.value)) {
        tsType = convertFlowType_1.convertFlowType(property.value);
    }
    else {
        let tsValueT = convertFlowType_1.convertFlowType(property.value.typeAnnotation);
        if (t.isTSFunctionType(tsValueT)) {
            tsValueT = t.tsParenthesizedType(tsValueT);
        }
        if (property.optional) {
            // { key?: ?T } -> { key?: T | null }
            tsType = t.tsUnionType([tsValueT, t.tsNullKeyword()]);
        }
        else {
            // { key: ?T } -> { key: T | null | undefined }
            tsType = t.tsUnionType([
                tsValueT,
                t.tsUndefinedKeyword(),
                t.tsNullKeyword(),
            ]);
        }
    }
    const { key, isComputed } = getPropertyKey_1.getPropertyKey(property);
    // @ts-ignore todo: property is missing in type definition
    if (property.method) {
        if (!t.isTSFunctionType(tsType)) {
            throw new Error('incorrect method declaration');
        }
        const tsMethod = t.tsMethodSignature(key, tsType.typeParameters, tsType.parameters, tsType.typeAnnotation);
        tsMethod.optional = property.optional;
        tsMethod.computed = isComputed;
        return tsMethod;
    }
    else {
        const tsPropSignature = t.tsPropertySignature(key, t.tsTypeAnnotation(Object.assign(Object.assign({}, tsType), baseNodeProps_1.baseNodeProps(property.value))));
        tsPropSignature.optional = property.optional;
        tsPropSignature.readonly =
            property.variance && property.variance.kind === 'plus';
        tsPropSignature.computed = isComputed;
        return tsPropSignature;
    }
}
exports.convertObjectTypeProperty = convertObjectTypeProperty;
//# sourceMappingURL=convertObjectTypeProperty.js.map