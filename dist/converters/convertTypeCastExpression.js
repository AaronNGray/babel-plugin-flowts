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
exports.convertTypeCastExpression = void 0;
const t = __importStar(require("@babel/types"));
const convertFlowType_1 = require("./convertFlowType");
const baseNodeProps_1 = require("../utils/baseNodeProps");
const recastProps_1 = require("../utils/recastProps");
function convertTypeCastExpression(node) {
    return Object.assign(Object.assign({}, t.tsAsExpression(node.expression, Object.assign(Object.assign({}, baseNodeProps_1.baseNodeProps(node.typeAnnotation.typeAnnotation)), convertFlowType_1.convertFlowType(node.typeAnnotation.typeAnnotation)))), recastProps_1.recastProps(node));
}
exports.convertTypeCastExpression = convertTypeCastExpression;
//# sourceMappingURL=convertTypeCastExpression.js.map