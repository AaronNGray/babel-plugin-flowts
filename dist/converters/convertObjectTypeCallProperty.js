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
exports.convertObjectTypeCallProperty = void 0;
const t = __importStar(require("@babel/types"));
const convertFunctionTypeAnnotation_1 = require("./convertFunctionTypeAnnotation");
function convertObjectTypeCallProperty(callProperty) {
    if (t.isFunctionTypeAnnotation(callProperty.value)) {
        const { typeParams, parameters, returnType, } = convertFunctionTypeAnnotation_1.convertFunctionTypeAnnotation(callProperty.value);
        return t.tsCallSignatureDeclaration(typeParams, parameters, returnType);
    }
    else {
        throw new Error('ObjectCallTypeProperty case not implemented');
    }
}
exports.convertObjectTypeCallProperty = convertObjectTypeCallProperty;
//# sourceMappingURL=convertObjectTypeCallProperty.js.map