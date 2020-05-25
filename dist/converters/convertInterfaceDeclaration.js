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
exports.convertInterfaceDeclaration = void 0;
const t = __importStar(require("@babel/types"));
const convertTypeParameterDeclaration_1 = require("./convertTypeParameterDeclaration");
const convertObjectTypeProperty_1 = require("./convertObjectTypeProperty");
const baseNodeProps_1 = require("../utils/baseNodeProps");
const convertObjectTypeCallProperty_1 = require("./convertObjectTypeCallProperty");
const convertObjectTypeIndexer_1 = require("./convertObjectTypeIndexer");
const convertObjectTypeInternalSlot_1 = require("./convertObjectTypeInternalSlot");
const convertInterfaceExtends_1 = require("./convertInterfaceExtends");
function convertInterfaceDeclaration(node) {
    let typeParameters = null;
    if (node.typeParameters) {
        typeParameters = Object.assign(Object.assign({}, convertTypeParameterDeclaration_1.convertTypeParameterDeclaration(node.typeParameters)), baseNodeProps_1.baseNodeProps(node.typeParameters));
    }
    let extendsCombined = [];
    if (node.extends && node.implements) {
        if (node.extends.length &&
            node.implements.length &&
            node.extends[0].start &&
            node.implements[0].start &&
            node.extends[0].start < node.implements[0].start) {
            extendsCombined = [...node.extends, ...node.implements];
        }
        else {
            extendsCombined = [...node.implements, ...node.extends];
        }
    }
    else {
        if (node.extends) {
            extendsCombined = node.extends;
        }
        if (node.implements) {
            extendsCombined = node.implements;
        }
    }
    let _extends = undefined;
    if (extendsCombined.length > 0) {
        _extends = extendsCombined.map(v => (Object.assign(Object.assign({}, convertInterfaceExtends_1.convertInterfaceExtends(v)), baseNodeProps_1.baseNodeProps(v))));
    }
    const bodyElements = [];
    for (const property of node.body.properties) {
        if (t.isObjectTypeProperty(property)) {
            bodyElements.push(Object.assign(Object.assign({}, convertObjectTypeProperty_1.convertObjectTypeProperty(property)), baseNodeProps_1.baseNodeProps(property)));
        }
    }
    if (node.body.callProperties) {
        bodyElements.push(...node.body.callProperties.map(v => (Object.assign(Object.assign({}, convertObjectTypeCallProperty_1.convertObjectTypeCallProperty(v)), baseNodeProps_1.baseNodeProps(v)))));
    }
    if (node.body.indexers) {
        bodyElements.push(...node.body.indexers.map(v => (Object.assign(Object.assign({}, convertObjectTypeIndexer_1.convertObjectTypeIndexer(v)), baseNodeProps_1.baseNodeProps(v)))));
    }
    if (node.body.internalSlots) {
        bodyElements.push(...node.body.internalSlots.map(v => (Object.assign(Object.assign({}, convertObjectTypeInternalSlot_1.convertObjectTypeInternalSlot(v)), baseNodeProps_1.baseNodeProps(v)))));
    }
    const body = Object.assign(Object.assign({}, t.tsInterfaceBody(bodyElements)), baseNodeProps_1.baseNodeProps(node.body));
    return t.tsInterfaceDeclaration(node.id, typeParameters, _extends, body);
}
exports.convertInterfaceDeclaration = convertInterfaceDeclaration;
//# sourceMappingURL=convertInterfaceDeclaration.js.map