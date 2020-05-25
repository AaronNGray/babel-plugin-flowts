"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportDeclaration = void 0;
const t = __importStar(require("@babel/types"));
function ImportDeclaration(path) {
    // "import type" in TypeScript does not allow mixing different imports (default, namespace and named)
    if (path.node.importKind === 'typeof') {
        const types = path.node.specifiers.map(specifier => t.tsTypeAliasDeclaration(specifier.local, null, t.tsTypeQuery(t.tsImportType(path.node.source, specifier.type === 'ImportDefaultSpecifier'
            ? t.identifier('default')
            : specifier.type === 'ImportSpecifier'
                ? specifier.imported
                : null))));
        path.replaceWithMultiple(types);
        return;
    }
    if (path.node.importKind === 'type') {
        const importSpecifiers = [];
        const importDefaultSpecifiers = [];
        const importNamespaceSpecifiers = [];
        for (const specifier of path.node.specifiers) {
            if (specifier.type === 'ImportSpecifier')
                importSpecifiers.push(specifier);
            if (specifier.type === 'ImportDefaultSpecifier')
                importDefaultSpecifiers.push(specifier);
            if (specifier.type === 'ImportNamespaceSpecifier')
                importNamespaceSpecifiers.push(specifier);
        }
        const groups = [
            importNamespaceSpecifiers,
            importDefaultSpecifiers,
            importSpecifiers,
        ].filter(v => v.length > 0);
        if (groups.length > 1) {
            path.node.specifiers = groups[0];
            path.insertAfter(groups.slice(1).map(group => {
                const separateImport = t.importDeclaration(group, path.node.source);
                separateImport.importKind = 'type';
                return separateImport;
            }));
        }
    }
    else {
        // import with possibly mixed named specifiers (types and values)
        const keep = [];
        const moveType = [];
        const moveTypeof = [];
        for (const specifier of path.node.specifiers) {
            if (specifier.type === 'ImportSpecifier') {
                if (specifier.importKind === 'type') {
                    moveType.push(specifier);
                }
                else if (specifier.importKind === 'typeof') {
                    moveTypeof.push(specifier);
                }
                else {
                    keep.push(specifier);
                }
            }
            else {
                keep.push(specifier);
            }
            if (specifier.type === 'ImportSpecifier') {
                delete specifier.importKind;
            }
        }
        const types = moveTypeof.map(specifier => t.tsTypeAliasDeclaration(specifier.local, null, t.tsTypeQuery(t.tsImportType(path.node.source, specifier.imported))));
        if (keep.length === 0) {
            if (moveType.length > 0) {
                // import {type A, type B} from 'mod';
                path.node.importKind = 'type';
                path.node.specifiers = moveType;
            }
            if (moveTypeof.length > 0) {
                if (moveType.length > 0) {
                    path.insertAfter(types);
                }
                else {
                    path.replaceWithMultiple(types);
                }
            }
        }
        else {
            path.node.specifiers = keep;
            if (moveType.length > 0) {
                // import {A, type B} from 'mod';
                // import C, {A, type B} from 'mod';
                path.node.specifiers = keep;
                const typesImport = t.importDeclaration(moveType, path.node.source);
                typesImport.importKind = 'type';
                path.insertAfter(typesImport);
            }
            if (moveTypeof.length > 0) {
                path.insertAfter(types);
            }
        }
    }
}
exports.ImportDeclaration = ImportDeclaration;
//# sourceMappingURL=ImportDeclaration.js.map