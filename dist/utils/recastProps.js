"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recastProps = void 0;
function recastProps(node) {
    return {
        // @ts-ignore comments for recast
        comments: node.comments,
    };
}
exports.recastProps = recastProps;
//# sourceMappingURL=recastProps.js.map