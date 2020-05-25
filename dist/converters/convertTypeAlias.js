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
exports.convertTypeAlias = void 0;
const t = __importStar(require("@babel/types"));
const convertFlowType_1 = require("./convertFlowType");
const convertTypeParameterDeclaration_1 = require("./convertTypeParameterDeclaration");
const baseNodeProps_1 = require("../utils/baseNodeProps");
function convertTypeAlias(node) {
    const typeParameters = node.typeParameters;
    const right = node.right;
    return t.tsTypeAliasDeclaration(node.id, t.isTypeParameterDeclaration(typeParameters)
        ? Object.assign(Object.assign({}, convertTypeParameterDeclaration_1.convertTypeParameterDeclaration(typeParameters)), baseNodeProps_1.baseNodeProps(typeParameters)) : null, Object.assign(Object.assign({}, baseNodeProps_1.baseNodeProps(right)), convertFlowType_1.convertFlowType(right)));
}
exports.convertTypeAlias = convertTypeAlias;
//# sourceMappingURL=convertTypeAlias.js.map