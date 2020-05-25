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
exports.ArrowFunctionExpression = void 0;
const t = __importStar(require("@babel/types"));
const convertTypeParameterDeclaration_1 = require("../converters/convertTypeParameterDeclaration");
const transformFunctionParams_1 = require("../transforms/transformFunctionParams");
const replaceWith_1 = require("../utils/replaceWith");
function ArrowFunctionExpression(path, state) {
    transformFunctionParams_1.transformFunctionParams(path.get('params'));
    // @ts-ignore todo: add babel types
    if (path.node.predicate) {
        // @ts-ignore todo: add babel types
        delete path.node.predicate;
    }
    if (t.isTypeParameterDeclaration(path.node.typeParameters)) {
        const tsTypeParameterDeclaration = convertTypeParameterDeclaration_1.convertTypeParameterDeclaration(path.node.typeParameters);
        if (state.opts.isJSX) {
            // workaround for tsx files to differentiate type parameters from jsx
            tsTypeParameterDeclaration.params[0].constraint = t.tsAnyKeyword();
        }
        replaceWith_1.replaceWith(path.get('typeParameters'), tsTypeParameterDeclaration);
    }
}
exports.ArrowFunctionExpression = ArrowFunctionExpression;
//# sourceMappingURL=ArrowFunctionExpression.js.map