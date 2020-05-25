"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImportDeclaration_1 = require("./visitors/ImportDeclaration");
const OpaqueType_1 = require("./visitors/OpaqueType");
const TypeAnnotation_1 = require("./visitors/TypeAnnotation");
const TypeCastExpression_1 = require("./visitors/TypeCastExpression");
const TypeParameterDeclaration_1 = require("./visitors/TypeParameterDeclaration");
const ClassDeclaration_1 = require("./visitors/ClassDeclaration");
const DeclareClass_1 = require("./visitors/DeclareClass");
const InterfaceDeclaration_1 = require("./visitors/InterfaceDeclaration");
const DeclareFunction_1 = require("./visitors/DeclareFunction");
const Program_1 = require("./visitors/Program");
const TypeAlias_1 = require("./visitors/TypeAlias");
const FunctionDeclaration_1 = require("./visitors/FunctionDeclaration");
const CallExpression_1 = require("./visitors/CallExpression");
const DeclareVariable_1 = require("./visitors/DeclareVariable");
const DeclareTypeAlias_1 = require("./visitors/DeclareTypeAlias");
const DeclareInterface_1 = require("./visitors/DeclareInterface");
const DeclareOpaqueType_1 = require("./visitors/DeclareOpaqueType");
const DeclareModuleExports_1 = require("./visitors/DeclareModuleExports");
const DeclareModule_1 = require("./visitors/DeclareModule");
const DeclareExportDeclaration_1 = require("./visitors/DeclareExportDeclaration");
const NewExpression_1 = require("./visitors/NewExpression");
const ArrowFunctionExpression_1 = require("./visitors/ArrowFunctionExpression");
const TSModuleDeclaration_1 = require("./visitors/TSModuleDeclaration");
const ExportAllDeclaration_1 = require("./visitors/ExportAllDeclaration");
const visitor = {
    Program: Program_1.Program,
    TypeAnnotation: TypeAnnotation_1.TypeAnnotation,
    TypeAlias: TypeAlias_1.TypeAlias,
    TypeParameterDeclaration: TypeParameterDeclaration_1.TypeParameterDeclaration,
    ImportDeclaration: ImportDeclaration_1.ImportDeclaration,
    TypeCastExpression: TypeCastExpression_1.TypeCastExpression,
    OpaqueType: OpaqueType_1.OpaqueType,
    DeclareClass: DeclareClass_1.DeclareClass,
    ClassDeclaration: ClassDeclaration_1.ClassDeclaration,
    ClassExpression: ClassDeclaration_1.ClassDeclaration,
    ExportAllDeclaration: ExportAllDeclaration_1.ExportAllDeclaration,
    InterfaceDeclaration: InterfaceDeclaration_1.InterfaceDeclaration,
    DeclareFunction: DeclareFunction_1.DeclareFunction,
    FunctionDeclaration: FunctionDeclaration_1.FunctionDeclaration,
    CallExpression: CallExpression_1.CallExpression,
    DeclareVariable: DeclareVariable_1.DeclareVariable,
    DeclareTypeAlias: DeclareTypeAlias_1.DeclareTypeAlias,
    DeclareInterface: DeclareInterface_1.DeclareInterface,
    DeclareOpaqueType: DeclareOpaqueType_1.DeclareOpaqueType,
    DeclareModuleExports: DeclareModuleExports_1.DeclareModuleExports,
    DeclareModule: DeclareModule_1.DeclareModule,
    DeclareExportDeclaration: DeclareExportDeclaration_1.DeclareExportDeclaration,
    NewExpression: NewExpression_1.NewExpression,
    ArrowFunctionExpression: ArrowFunctionExpression_1.ArrowFunctionExpression,
    TSModuleDeclaration: TSModuleDeclaration_1.TSModuleDeclaration,
};
// tslint:disable-next-line:no-any
exports.default = (_babel, opts = {}) => {
    if (typeof opts.isJSX === 'undefined') {
        opts.isJSX = true;
    }
    return {
        name: 'babel-plugin-flow-to-typescript',
        visitor,
        // tslint:disable-next-line:no-any
        manipulateOptions(_babel, parserOpts) {
            parserOpts.plugins.push('flow');
            if (opts.isJSX) {
                parserOpts.plugins.push('jsx');
            }
            parserOpts.plugins.push('classProperties');
            parserOpts.plugins.push('objectRestSpread');
            parserOpts.plugins.push('optionalChaining');
            parserOpts.plugins.push('nullishCoalescingOperator');
            parserOpts.plugins.push('dynamicImport');
        },
    };
};
//# sourceMappingURL=index.js.map