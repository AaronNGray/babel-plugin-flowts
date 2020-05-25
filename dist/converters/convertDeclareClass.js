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
exports.convertDeclareClass = void 0;
const t = __importStar(require("@babel/types"));
const convertFlowType_1 = require("./convertFlowType");
const baseNodeProps_1 = require("../utils/baseNodeProps");
const convertObjectTypeIndexer_1 = require("./convertObjectTypeIndexer");
const warnOnlyOnce_1 = require("../utils/warnOnlyOnce");
const convertInterfaceExtends_1 = require("./convertInterfaceExtends");
const convertTypeParameterDeclaration_1 = require("./convertTypeParameterDeclaration");
const getPropertyKey_1 = require("./getPropertyKey");
function convertDeclareClass(node) {
    const bodyElements = [];
    for (const property of node.body.properties) {
        if (t.isObjectTypeSpreadProperty(property)) {
            throw new Error('ObjectTypeSpreadProperty is unexpected in DeclareClass');
        }
        let convertedProperty = convertFlowType_1.convertFlowType(property.value);
        if (t.isTSFunctionType(convertedProperty)) {
            convertedProperty = t.tsParenthesizedType(convertedProperty);
        }
        const { key, isComputed } = getPropertyKey_1.getPropertyKey(property);
        // @ts-ignore todo: property is missing in type definition
        if (property.method) {
            if (!t.isTSParenthesizedType(convertedProperty) ||
                !t.isTSFunctionType(convertedProperty.typeAnnotation)) {
                throw new Error('incorrect method');
            }
            const converted = t.tsDeclareMethod(null, property.key, convertedProperty.typeAnnotation.typeParameters, convertedProperty.typeAnnotation.parameters, convertedProperty.typeAnnotation.typeAnnotation);
            // todo: fix bug in tsDeclareMethod builder to accept member expression
            converted.key = key;
            converted.static = !!property.static;
            // @ts-ignore
            converted.kind = property.kind;
            converted.computed = isComputed;
            bodyElements.push(converted);
        }
        else if (property.kind === 'init') {
            const converted = t.classProperty(key, null, t.tsTypeAnnotation(convertedProperty));
            converted.static = !!property.static;
            converted.readonly =
                property.variance && property.variance.kind === 'plus';
            converted.computed = isComputed;
            bodyElements.push(Object.assign(Object.assign({}, converted), baseNodeProps_1.baseNodeProps(property)));
        }
    }
    // todo:
    // if (node.body.callProperties) {
    //   bodyElements.push(...node.body.callProperties.map(convertObjectTypeCallProperty));
    // }
    if (node.body.indexers) {
        // tslint:disable-next-line:prettier
        bodyElements.push(...node.body.indexers.map(i => (Object.assign(Object.assign({}, convertObjectTypeIndexer_1.convertObjectTypeIndexer(i)), baseNodeProps_1.baseNodeProps(i)))));
    }
    // todo:
    // if (node.body.internalSlots) {
    //   bodyElements.push(...node.body.internalSlots.map(convertObjectTypeInternalSlot));
    // }
    let superClass = null;
    let superTypeParameters = null;
    if (node.extends && node.extends.length) {
        if (node.extends.length > 1) {
            warnOnlyOnce_1.warnOnlyOnce('declare-class-many-parents', 'Declare Class definitions in TS can only have one super class. Dropping extras.');
        }
        const firstExtend = convertInterfaceExtends_1.convertInterfaceExtends(node.extends[0]);
        if (t.isIdentifier(firstExtend.expression)) {
            superClass = Object.assign(Object.assign({}, firstExtend.expression), baseNodeProps_1.baseNodeProps(node.extends[0].id));
            if (firstExtend.typeParameters && node.extends[0].typeParameters) {
                superTypeParameters = Object.assign(Object.assign({}, firstExtend.typeParameters), baseNodeProps_1.baseNodeProps(node.extends[0].typeParameters));
            }
        }
        else {
            throw new Error('not implemented');
        }
    }
    let typeParameters = null;
    if (t.isTypeParameterDeclaration(node.typeParameters)) {
        typeParameters = Object.assign(Object.assign({}, convertTypeParameterDeclaration_1.convertTypeParameterDeclaration(node.typeParameters)), baseNodeProps_1.baseNodeProps(node.typeParameters));
    }
    const body = Object.assign(Object.assign({}, t.classBody(bodyElements)), baseNodeProps_1.baseNodeProps(node.body));
    let _implements = null;
    if (node.implements && node.implements.length) {
        _implements = node.implements.map(i => (Object.assign(Object.assign({}, convertInterfaceExtends_1.convertInterfaceExtends(i)), baseNodeProps_1.baseNodeProps(i))));
    }
    const decl = t.classDeclaration(node.id, superClass, body, []);
    decl.implements = _implements;
    decl.superTypeParameters = superTypeParameters;
    decl.typeParameters = typeParameters;
    return decl;
}
exports.convertDeclareClass = convertDeclareClass;
//# sourceMappingURL=convertDeclareClass.js.map