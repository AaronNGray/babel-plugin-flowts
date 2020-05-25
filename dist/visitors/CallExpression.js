"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallExpression = void 0;
const convertTypeParameterInstantiation_1 = require("../converters/convertTypeParameterInstantiation");
const replaceWith_1 = require("../utils/replaceWith");
function CallExpression(path) {
    if (path.node.typeArguments) {
        const typeParameters = convertTypeParameterInstantiation_1.convertTypeParameterInstantiation(path.node.typeArguments);
        path.node.typeArguments = null;
        replaceWith_1.replaceWith(path.get('typeParameters'), typeParameters);
    }
}
exports.CallExpression = CallExpression;
//# sourceMappingURL=CallExpression.js.map