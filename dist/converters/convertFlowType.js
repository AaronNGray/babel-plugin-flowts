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
exports.convertFlowType = void 0;
const t = __importStar(require("@babel/types"));
const warnOnlyOnce_1 = require("../utils/warnOnlyOnce");
const convertFlowIdentifier_1 = require("./convertFlowIdentifier");
const convertFunctionTypeAnnotation_1 = require("./convertFunctionTypeAnnotation");
const convertObjectTypeCallProperty_1 = require("./convertObjectTypeCallProperty");
const convertObjectTypeIndexer_1 = require("./convertObjectTypeIndexer");
const convertObjectTypeInternalSlot_1 = require("./convertObjectTypeInternalSlot");
const baseNodeProps_1 = require("../utils/baseNodeProps");
const convertObjectTypeProperty_1 = require("./convertObjectTypeProperty");
function convertFlowType(node) {
    var _a;
    if (t.isAnyTypeAnnotation(node)) {
        return t.tsAnyKeyword();
    }
    if (t.isArrayTypeAnnotation(node)) {
        const elementType = Object.assign(Object.assign({}, convertFlowType(node.elementType)), baseNodeProps_1.baseNodeProps(node.elementType));
        return t.tsArrayType(t.isTSUnionType(elementType) || t.isTSIntersectionType(elementType)
            ? t.tsParenthesizedType(elementType)
            : elementType);
    }
    if (t.isBooleanTypeAnnotation(node)) {
        return t.tsBooleanKeyword();
    }
    if (t.isBooleanLiteralTypeAnnotation(node)) {
        return t.tsLiteralType(t.booleanLiteral(node.value));
    }
    if (t.isEmptyTypeAnnotation(node)) {
        return t.tsNeverKeyword();
    }
    if (t.isExistsTypeAnnotation(node)) {
        warnOnlyOnce_1.warnOnlyOnce('Existential type (*) in Flow is converted to "any" in TypeScript, and this conversion loses some type information.');
        return t.tsAnyKeyword();
    }
    if (t.isGenericTypeAnnotation(node)) {
        const typeParameters = node.typeParameters;
        let tsTypeParameters = null;
        if (typeParameters) {
            const tsParams = typeParameters.params.map(p => (Object.assign(Object.assign({}, convertFlowType(p)), baseNodeProps_1.baseNodeProps(p))));
            tsTypeParameters = t.tsTypeParameterInstantiation(tsParams);
        }
        const id = node.id;
        if (t.isIdentifier(id) && id.name === '$Keys') {
            // $Keys -> keyof
            const ret = t.tsTypeOperator(tsTypeParameters.params[0]);
            ret.operator = 'keyof';
            return ret;
        }
        else if (t.isIdentifier(id) && id.name === '$Values') {
            // $Values<X> -> X[keyof X]
            const tsType = tsTypeParameters.params[0];
            const tsKey = t.tsTypeOperator(tsType);
            tsKey.operator = 'keyof';
            return t.tsIndexedAccessType(tsType, tsKey);
        }
        else if (t.isIdentifier(id) && id.name === '$ReadOnly') {
            // $ReadOnly<X> -> Readonly<X>
            return t.tsTypeReference(t.identifier('Readonly'), tsTypeParameters);
        }
        else if (t.isIdentifier(id) && id.name === '$ReadOnlyArray') {
            // $ReadOnlyArray<X> -> ReadonlyArray<X>
            return t.tsTypeReference(t.identifier('ReadonlyArray'), tsTypeParameters);
        }
        else if (t.isIdentifier(id) && id.name === '$Exact') {
            warnOnlyOnce_1.warnOnlyOnce("Exact object type annotation in Flow is ignored. In TypeScript, it's always regarded as exact type");
            return tsTypeParameters.params[0];
        }
        else if (t.isIdentifier(id) && id.name === '$Diff') {
            // type $Diff<X, Y> = Omit<X, keyof y>;
            const [tsX, tsY] = tsTypeParameters.params;
            let tsKeyofY = t.tsTypeOperator(tsY);
            tsKeyofY.operator = 'keyof';
            if (t.isTSTypeLiteral(tsY)) {
                const keys = [];
                let doable = true;
                tsY.members.forEach(m => {
                    if (t.isTSPropertySignature(m) || t.isTSMethodSignature(m)) {
                        if (t.isIdentifier(m.key)) {
                            keys.push(m.key.name);
                        }
                        else if (t.isStringLiteral(m.key)) {
                            keys.push(m.key.value);
                        }
                        else {
                            doable = false;
                        }
                    }
                    else if (t.isTSIndexSignature(m)) {
                        doable = false;
                    }
                });
                if (doable) {
                    tsKeyofY = t.tsUnionType(keys.map(p => t.tsLiteralType(t.stringLiteral(p))));
                }
            }
            return t.tsTypeReference(t.identifier('Omit'), t.tsTypeParameterInstantiation([tsX, tsKeyofY]));
        }
        else if (t.isIdentifier(id) && id.name === '$PropertyType') {
            // $PropertyType<T, k> -> T[k]
            // TODO: $PropertyType<T, k> -> k extends string ? T[k] : never
            const [tsT, tsK] = tsTypeParameters.params;
            if (t.isTSImportType(tsT) &&
                t.isTSLiteralType(tsK) &&
                t.isStringLiteral(tsK.literal)) {
                tsT.qualifier = t.identifier(tsK.literal.value);
                return tsT;
            }
            else
                return t.tsIndexedAccessType(tsT, tsK);
        }
        else if (t.isIdentifier(id) && id.name === '$ElementType') {
            const [tsT, tsK] = tsTypeParameters.params;
            return t.tsIndexedAccessType(tsT, tsK);
        }
        else if (t.isIdentifier(id) && id.name === '$Shape') {
            return t.tsTypeReference(t.identifier('Partial'), tsTypeParameters);
        }
        else if (t.isIdentifier(id) && id.name === '$NonMaybeType') {
            return t.tsTypeReference(t.identifier('NonNullable'), tsTypeParameters);
        }
        else if (t.isIdentifier(id) && id.name === '$ReadOnlySet') {
            return t.tsTypeReference(t.identifier('ReadonlySet'), tsTypeParameters);
        }
        else if (t.isIdentifier(id) && id.name === '$ReadOnlyMap') {
            return t.tsTypeReference(t.identifier('ReadonlyMap'), tsTypeParameters);
        }
        else if (t.isIdentifier(id) && id.name === '$Exports') {
            // $Exports<T> -> import(T)
            if (tsTypeParameters &&
                tsTypeParameters.params.length === 1 &&
                t.isTSLiteralType(tsTypeParameters.params[0]) &&
                t.isStringLiteral(tsTypeParameters.params[0].literal)) {
                return t.tsImportType(tsTypeParameters.params[0].literal, null);
            }
            else {
                return t.tsTypeReference(convertFlowIdentifier_1.convertFlowIdentifier(id), tsTypeParameters && tsTypeParameters.params.length
                    ? tsTypeParameters
                    : null);
            }
        }
        else if (t.isIdentifier(id) && id.name === 'Class') {
            // Class<T> -> { new(...args:any): T}
            return t.tsTypeLiteral([
                t.tsConstructSignatureDeclaration(null, [
                    Object.assign(Object.assign({}, t.restElement(t.identifier('args'))), { typeAnnotation: t.tsTypeAnnotation(t.tsAnyKeyword()) }),
                ], tsTypeParameters !== null
                    ? t.tsTypeAnnotation(tsTypeParameters.params[0])
                    : t.tsTypeAnnotation(t.tsAnyKeyword())),
            ]);
        }
        else if (t.isIdentifier(id) && id.name === '$FlowFixMe') {
            return t.tsTypeReference(t.identifier('any'), tsTypeParameters);
        }
        else if (t.isIdentifier(id) && id.name === 'Object') {
            // "Object" in flow is just an alias for "any"
            return t.tsAnyKeyword();
        }
        else if (t.isQualifiedTypeIdentifier(id) || t.isIdentifier(id)) {
            return t.tsTypeReference(convertFlowIdentifier_1.convertFlowIdentifier(id), tsTypeParameters && tsTypeParameters.params.length
                ? tsTypeParameters
                : null);
        }
        // for other utility types, helpers are added at top of file in Program visitor
    }
    if (t.isIntersectionTypeAnnotation(node)) {
        const flowTypes = node.types;
        return t.tsIntersectionType(flowTypes.map(v => {
            let tsType = convertFlowType(v);
            if (t.isTSFunctionType(tsType)) {
                tsType = t.tsParenthesizedType(tsType);
            }
            return Object.assign(Object.assign({}, tsType), baseNodeProps_1.baseNodeProps(v));
        }));
    }
    if (t.isMixedTypeAnnotation(node)) {
        return t.tsUnknownKeyword();
    }
    if (t.isNullableTypeAnnotation(node)) {
        let tsType = convertFlowType(node.typeAnnotation);
        if (t.isTSFunctionType(tsType)) {
            tsType = t.tsParenthesizedType(tsType);
        }
        // f(): ?T {} -> f(): T | null | undefined {}
        // var x: X<?T> -> var x: X<T | null | undefined>
        // var x:?T -> var x:T | null | undefined
        return t.tsUnionType([tsType, t.tsUndefinedKeyword(), t.tsNullKeyword()]);
    }
    if (t.isNullLiteralTypeAnnotation(node)) {
        return t.tsNullKeyword();
    }
    if (t.isNumberLiteralTypeAnnotation(node)) {
        return t.tsLiteralType(t.numericLiteral(node.value));
    }
    if (t.isNumberTypeAnnotation(node)) {
        return t.tsNumberKeyword();
    }
    if (t.isObjectTypeAnnotation(node)) {
        const members = [];
        const spreads = [];
        if ((!node.properties || node.properties.length === 0) &&
            (!node.callProperties || node.callProperties.length === 0) &&
            (!node.internalSlots || node.internalSlots.length === 0) &&
            node.indexers &&
            node.indexers.length === 1 &&
            !t.isNumberTypeAnnotation(node.indexers[0].key) &&
            !t.isStringTypeAnnotation(node.indexers[0].key)) {
            // should be converted to mapped type
            // todo: handle cases when there are few indexers which should be represented as mapped types
            return t.tsMappedType(t.tsTypeParameter(convertFlowType(node.indexers[0].key), null, ((_a = node.indexers[0].id) === null || _a === void 0 ? void 0 : _a.name) || 'k'), convertFlowType(node.indexers[0].value));
        }
        if (node.properties) {
            for (const property of node.properties) {
                if (t.isObjectTypeProperty(property)) {
                    members.push(Object.assign(Object.assign({}, convertObjectTypeProperty_1.convertObjectTypeProperty(property)), baseNodeProps_1.baseNodeProps(property)));
                }
                if (t.isObjectTypeSpreadProperty(property)) {
                    // {p1:T, ...U} -> {p1:T} & U
                    spreads.push(convertFlowType(property.argument));
                }
            }
        }
        if (node.indexers) {
            members.push(...node.indexers.map(convertObjectTypeIndexer_1.convertObjectTypeIndexer));
        }
        if (node.callProperties) {
            members.push(...node.callProperties.map(convertObjectTypeCallProperty_1.convertObjectTypeCallProperty));
        }
        if (node.internalSlots) {
            members.push(...node.internalSlots.map(convertObjectTypeInternalSlot_1.convertObjectTypeInternalSlot));
        }
        // TSCallSignatureDeclaration | TSConstructSignatureDeclaration | TSMethodSignature ;
        let ret = t.tsTypeLiteral(members);
        if (spreads.length > 0) {
            spreads.unshift(ret);
            ret = t.tsIntersectionType(spreads);
        }
        return ret;
    }
    if (t.isStringLiteralTypeAnnotation(node)) {
        return t.tsLiteralType(t.stringLiteral(node.value));
    }
    if (t.isStringTypeAnnotation(node)) {
        return t.tsStringKeyword();
    }
    if (t.isThisTypeAnnotation(node)) {
        return t.tsThisType();
    }
    if (t.isTypeofTypeAnnotation(node)) {
        const typeOp = t.tsTypeOperator(convertFlowType(node.argument));
        typeOp.operator = 'typeof';
        return typeOp;
    }
    if (t.isUnionTypeAnnotation(node)) {
        const flowTypes = node.types;
        return t.tsUnionType(flowTypes.map(v => {
            let tsType = convertFlowType(v);
            if (t.isTSFunctionType(tsType)) {
                tsType = t.tsParenthesizedType(tsType);
            }
            return Object.assign(Object.assign({}, tsType), baseNodeProps_1.baseNodeProps(v));
        }));
    }
    if (t.isVoidTypeAnnotation(node)) {
        return t.tsVoidKeyword();
    }
    if (t.isFunctionTypeAnnotation(node)) {
        const { typeParams, parameters, returnType, } = convertFunctionTypeAnnotation_1.convertFunctionTypeAnnotation(node);
        return t.tsFunctionType(typeParams, parameters, returnType);
    }
    if (t.isTupleTypeAnnotation(node)) {
        const flowTypes = node.types;
        return t.tsTupleType(flowTypes.map(convertFlowType));
    }
    if (t.isSymbolTypeAnnotation(node)) {
        return t.tsSymbolKeyword();
    }
    throw new Error(`Unsupported flow type FlowType(type=${node.type})`);
}
exports.convertFlowType = convertFlowType;
//# sourceMappingURL=convertFlowType.js.map