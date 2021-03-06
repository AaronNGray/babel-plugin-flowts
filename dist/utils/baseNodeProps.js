"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseNodeProps = void 0;
const recastProps_1 = require("./recastProps");
function baseNodeProps(node) {
    return Object.assign({ leadingComments: node.leadingComments, innerComments: node.innerComments, trailingComments: node.trailingComments, start: null, end: null, loc: node.loc }, recastProps_1.recastProps(node));
}
exports.baseNodeProps = baseNodeProps;
//# sourceMappingURL=baseNodeProps.js.map