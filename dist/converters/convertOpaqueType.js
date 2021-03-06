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
exports.convertOpaqueType = void 0;
const t = __importStar(require("@babel/types"));
const warnOnlyOnce_1 = require("../utils/warnOnlyOnce");
const convertFlowType_1 = require("./convertFlowType");
const baseNodeProps_1 = require("../utils/baseNodeProps");
function convertOpaqueType(node) {
    if (node.supertype) {
        warnOnlyOnce_1.warnOnlyOnce('Subtyping constraints in opaque type in Flow is ignored in TypeScript');
    }
    const tsNode = t.tsTypeAliasDeclaration(node.id, null, Object.assign(Object.assign({}, convertFlowType_1.convertFlowType(node.impltype)), baseNodeProps_1.baseNodeProps(node.impltype)));
    tsNode.declare = false;
    return tsNode;
}
exports.convertOpaqueType = convertOpaqueType;
//# sourceMappingURL=convertOpaqueType.js.map