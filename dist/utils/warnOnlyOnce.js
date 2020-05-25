"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warnOnlyOnce = void 0;
const onlyOnceFlagSet = new Set();
function warnOnlyOnce(key, message) {
    if (!message)
        message = String(key);
    if (onlyOnceFlagSet.has(key))
        return;
    onlyOnceFlagSet.add(key);
    console.warn(message);
}
exports.warnOnlyOnce = warnOnlyOnce;
//# sourceMappingURL=warnOnlyOnce.js.map