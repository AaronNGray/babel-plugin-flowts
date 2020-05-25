"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCastExpression = void 0;
const convertTypeCastExpression_1 = require("../converters/convertTypeCastExpression");
const replaceWith_1 = require("../utils/replaceWith");
function TypeCastExpression(path) {
    replaceWith_1.replaceWith(path, convertTypeCastExpression_1.convertTypeCastExpression(path.node));
}
exports.TypeCastExpression = TypeCastExpression;
//# sourceMappingURL=TypeCastExpression.js.map