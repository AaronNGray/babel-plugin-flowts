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
exports.getPropertyKey = void 0;
const t = __importStar(require("@babel/types"));
const baseNodeProps_1 = require("../utils/baseNodeProps");
function getPropertyKey(property) {
    let key = property.key;
    let isComputed = false;
    if (t.isIdentifier(property.key)) {
        if (property.key.name === '@@iterator') {
            isComputed = true;
            key = Object.assign(Object.assign({}, t.memberExpression(t.identifier('Symbol'), t.identifier('iterator'))), baseNodeProps_1.baseNodeProps(property.key));
        }
        if (property.key.name === '@@asyncIterator') {
            isComputed = true;
            key = Object.assign(Object.assign({}, t.memberExpression(t.identifier('Symbol'), t.identifier('asyncIterator'))), baseNodeProps_1.baseNodeProps(property.key));
        }
    }
    return { key, isComputed };
}
exports.getPropertyKey = getPropertyKey;
//# sourceMappingURL=getPropertyKey.js.map