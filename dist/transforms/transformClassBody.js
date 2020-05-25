"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformClassBody = void 0;
const transformFunctionParams_1 = require("./transformFunctionParams");
function transformClassBody(path) {
    for (const elementPath of path.get('body')) {
        if (elementPath.isClassMethod()) {
            if (elementPath.node.kind === 'constructor') {
                elementPath.get('returnType').remove();
            }
            transformFunctionParams_1.transformFunctionParams(elementPath.get('params'));
        }
        if (elementPath.isClassProperty()) {
            // @ts-ignore todo: missing proppery in babel
            const variance = elementPath.node.variance;
            if (variance) {
                elementPath.node.readonly = variance && variance.kind === 'plus';
                // @ts-ignore
                elementPath.node.variance = null;
            }
        }
        // todo: commented out because it is not yet in ts
        // todo: missing method in babel
        // if (isClassPrivateMethod(elementPath.node)) {
        // }
        // todo: missing method in babel
        // if (isClassPrivateProperty(elementPath.node)) {
        //   elementPath.node.variance = null;
        // }
    }
}
exports.transformClassBody = transformClassBody;
//# sourceMappingURL=transformClassBody.js.map