"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceWith = void 0;
const traverse_1 = require("@babel/traverse");
// tslint:disable-next-line:no-any
function replaceWith(path, replacement) {
    if (replacement instanceof traverse_1.NodePath) {
        replacement = replacement.node;
    }
    path.replaceWith(Object.assign(Object.assign({}, replacement), { 
        // @ts-ignore
        comments: path.node ? path.node.comments : undefined }));
}
exports.replaceWith = replaceWith;
//# sourceMappingURL=replaceWith.js.map