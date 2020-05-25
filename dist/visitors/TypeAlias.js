"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAlias = void 0;
const convertTypeAlias_1 = require("../converters/convertTypeAlias");
const replaceWith_1 = require("../utils/replaceWith");
function TypeAlias(path) {
    replaceWith_1.replaceWith(path, convertTypeAlias_1.convertTypeAlias(path.node));
}
exports.TypeAlias = TypeAlias;
//# sourceMappingURL=TypeAlias.js.map