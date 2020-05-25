"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpaqueType = void 0;
const convertOpaqueType_1 = require("../converters/convertOpaqueType");
const replaceWith_1 = require("../utils/replaceWith");
function OpaqueType(path) {
    replaceWith_1.replaceWith(path, convertOpaqueType_1.convertOpaqueType(path.node));
}
exports.OpaqueType = OpaqueType;
//# sourceMappingURL=OpaqueType.js.map