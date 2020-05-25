"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionDeclaration = void 0;
const transformFunctionParams_1 = require("../transforms/transformFunctionParams");
function FunctionDeclaration(path) {
    transformFunctionParams_1.transformFunctionParams(path.get('params'));
    // @ts-ignore todo: add babel type
    path.get('predicate').remove();
}
exports.FunctionDeclaration = FunctionDeclaration;
//# sourceMappingURL=FunctionDeclaration.js.map