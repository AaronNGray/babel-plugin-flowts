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
exports.convertObjectTypeInternalSlot = void 0;
const t = __importStar(require("@babel/types"));
const convertFlowType_1 = require("./convertFlowType");
const convertFunctionTypeAnnotation_1 = require("./convertFunctionTypeAnnotation");
const baseNodeProps_1 = require("../utils/baseNodeProps");
function convertObjectTypeInternalSlot(property) {
    if (property.method) {
        if (!t.isFunctionTypeAnnotation(property.value)) {
            throw new Error('FunctionTypeAnnotation expected');
        }
        const { typeParams, parameters, returnType, } = convertFunctionTypeAnnotation_1.convertFunctionTypeAnnotation(property.value);
        const methodSignature = t.tsMethodSignature(property.id, typeParams, parameters, returnType);
        methodSignature.computed = true;
        methodSignature.optional = property.optional;
        return methodSignature;
    }
    else {
        const tsPropSignature = t.tsPropertySignature(property.id, t.tsTypeAnnotation(Object.assign(Object.assign({}, convertFlowType_1.convertFlowType(property.value)), baseNodeProps_1.baseNodeProps(property.value))));
        tsPropSignature.optional = property.optional;
        tsPropSignature.computed = true;
        // todo: property.static;
        return tsPropSignature;
    }
}
exports.convertObjectTypeInternalSlot = convertObjectTypeInternalSlot;
//# sourceMappingURL=convertObjectTypeInternalSlot.js.map