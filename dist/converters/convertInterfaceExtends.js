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
exports.convertInterfaceExtends = void 0;
const t = __importStar(require("@babel/types"));
const convertFlowType_1 = require("./convertFlowType");
const baseNodeProps_1 = require("../utils/baseNodeProps");
const convertFlowIdentifier_1 = require("./convertFlowIdentifier");
function convertInterfaceExtends(node) {
    const typeParameters = node.typeParameters;
    const typeParameterParams = typeParameters ? typeParameters.params : [];
    const parameters = t.tsTypeParameterInstantiation(typeParameterParams.map(item => (Object.assign(Object.assign({}, convertFlowType_1.convertFlowType(item)), baseNodeProps_1.baseNodeProps(item)))));
    return t.tsExpressionWithTypeArguments(convertFlowIdentifier_1.convertFlowIdentifier(node.id), typeParameterParams.length ? parameters : null);
}
exports.convertInterfaceExtends = convertInterfaceExtends;
//# sourceMappingURL=convertInterfaceExtends.js.map