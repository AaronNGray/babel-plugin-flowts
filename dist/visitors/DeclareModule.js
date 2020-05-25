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
exports.DeclareModule = void 0;
const t = __importStar(require("@babel/types"));
const baseNodeProps_1 = require("../utils/baseNodeProps");
const replaceWith_1 = require("../utils/replaceWith");
exports.DeclareModule = {
    enter(path, state) {
        state.set('isModuleDeclaration', true);
        const node = path.node;
        const moduleBlock = Object.assign(Object.assign({}, t.tsModuleBlock(node.body.body)), baseNodeProps_1.baseNodeProps(node.body));
        let id = node.id;
        if (t.isIdentifier(node.id)) {
            // it is not documented, but looking at lib/react.js in flow sources
            // it looks - "declare module react {}" should be identical to "declare module 'react' {}"
            id = t.stringLiteral(node.id.name);
        }
        const replacement = t.tsModuleDeclaration(id, moduleBlock);
        replacement.declare = true;
        replaceWith_1.replaceWith(path, replacement);
    },
    exit(_, state) {
        state.set('isModuleDeclaration', false);
    },
};
//# sourceMappingURL=DeclareModule.js.map