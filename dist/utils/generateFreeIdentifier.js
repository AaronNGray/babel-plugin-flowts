"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFreeIdentifier = void 0;
// https://github.com/bcherny/flow-to-typescript/blob/f1dbe3d1f97b97d655ea6c5f1f5caaaa9f1e0c9f/src/utils.ts
const candidates = 'abcdefghijklmnopqrstuvwxyz'.split('');
function generateFreeIdentifier(usedIdentifiers) {
    return candidates.find(_ => usedIdentifiers.indexOf(_) < 0);
}
exports.generateFreeIdentifier = generateFreeIdentifier;
//# sourceMappingURL=generateFreeIdentifier.js.map