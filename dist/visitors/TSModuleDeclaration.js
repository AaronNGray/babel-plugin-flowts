"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSModuleDeclaration = void 0;
exports.TSModuleDeclaration = {
    enter(_path, state) {
        state.set('isModuleDeclaration', true);
    },
    exit(_, state) {
        state.set('isModuleDeclaration', false);
    },
};
//# sourceMappingURL=TSModuleDeclaration.js.map